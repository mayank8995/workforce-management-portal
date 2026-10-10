import { useRef, useState } from 'react';
import axios from 'axios';
import {
  button,
  cx,
  form,
  modal,
  skeleton,
  text,
  tone,
} from '../../theme/theme';

import {
  completeUpload,
  createUpload,
  getUploadStatus,
  pauseUpload,
  resumeUpload,
  uploadChunk,
} from '../../api/admin-portal.api';

import type { UploadStatus } from '../../types/types';

const CHUNK_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_RETRIES = 3;

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);

  const [uploadId, setUploadId] = useState<string | null>(null);

  const [uploadedChunks, setUploadedChunks] = useState<number[]>([]);

  const [totalChunks, setTotalChunks] = useState(0);

  const [progress, setProgress] = useState(0);

  const [currentChunk, setCurrentChunk] = useState<number | null>(null);

  const [status, setStatus] = useState<UploadStatus>('idle');

  const [error, setError] = useState('');

  const abortControllerRef = useRef<AbortController | null>(null);

  const pausedRef = useRef(false);

  // Keep uploaded chunks outside React state
  // so we always have the latest value.
  const uploadedChunksRef = useRef<Set<number>>(new Set());

  // Total bytes already uploaded on server
  const uploadedBytesRef = useRef(0);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';

    const units = ['Bytes', 'KB', 'MB', 'GB'];

    const index = Math.floor(Math.log(bytes) / Math.log(1024));

    return `${(bytes / Math.pow(1024, index)).toFixed(1)} ${units[index]}`;
  };

  const getChunkSize = (chunkIndex: number) => {
    if (!file) return 0;

    const start = chunkIndex * CHUNK_SIZE;

    const end = Math.min(start + CHUNK_SIZE, file.size);

    return end - start;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    setFile(selectedFile);

    setUploadId(null);
    setUploadedChunks([]);

    const chunks = Math.ceil(selectedFile.size / CHUNK_SIZE);

    setTotalChunks(chunks);

    setProgress(0);
    setCurrentChunk(null);
    setStatus('idle');
    setError('');

    uploadedChunksRef.current = new Set();
    uploadedBytesRef.current = 0;

    pausedRef.current = false;

    abortControllerRef.current = null;
  };

  // ----------------------------------
  // Upload one chunk with retry
  // ----------------------------------

  const uploadChunkWithRetry = async (
    id: string,
    chunkIndex: number
  ): Promise<boolean> => {
    let attempt = 0;

    while (attempt < MAX_RETRIES) {
      const controller = new AbortController();

      abortControllerRef.current = controller;

      try {
        await uploadChunk({
          file: file!,
          uploadId: id,
          chunkIndex,
          chunkSize: CHUNK_SIZE,

          signal: controller.signal,

          onProgress: (currentChunkBytes) => {
            if (!file) return;

            const totalUploaded = uploadedBytesRef.current + currentChunkBytes;

            const percentage = (totalUploaded / file.size) * 100;

            setProgress(Math.min(percentage, 100));
          },
        });

        abortControllerRef.current = null;

        return true;
      } catch (error) {
        abortControllerRef.current = null;

        // User paused the upload
        if (axios.isCancel(error)) {
          return false;
        }

        attempt++;

        console.error(
          `Chunk ${chunkIndex} failed. Attempt ${attempt}/${MAX_RETRIES}`,
          error
        );

        // No more retries
        if (attempt >= MAX_RETRIES) {
          throw error;
        }

        // Wait before retrying
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    return false;
  };

  const processUpload = async (id: string) => {
    if (!file) return;

    try {
      setStatus('uploading');
      setError('');

      pausedRef.current = false;

      // Get latest server state.
      // This makes resume possible.
      const { data: serverState } = await getUploadStatus(id);

      const serverChunks = new Set(serverState.uploadedChunks);

      uploadedChunksRef.current = serverChunks;

      // Calculate already uploaded bytes
      uploadedBytesRef.current = 0;

      for (const chunkIndex of serverChunks) {
        uploadedBytesRef.current += getChunkSize(chunkIndex);
      }

      setUploadedChunks([...serverChunks].sort((a, b) => a - b));

      setTotalChunks(serverState.totalChunks);

      setProgress((uploadedBytesRef.current / file.size) * 100);

      // Upload missing chunks
      for (
        let chunkIndex = 0;
        chunkIndex < serverState.totalChunks;
        chunkIndex++
      ) {
        // User pressed pause
        if (pausedRef.current) {
          setStatus('paused');
          setCurrentChunk(null);
          return;
        }

        // Skip already uploaded chunks
        if (uploadedChunksRef.current.has(chunkIndex)) {
          continue;
        }

        setCurrentChunk(chunkIndex);

        const success = await uploadChunkWithRetry(id, chunkIndex);

        // User paused while chunk
        // was being uploaded
        if (!success && pausedRef.current) {
          setStatus('paused');
          setCurrentChunk(null);
          return;
        }

        if (!success) {
          throw new Error(`Failed to upload chunk ${chunkIndex + 1}`);
        }

        // Mark chunk as uploaded
        uploadedChunksRef.current.add(chunkIndex);

        uploadedBytesRef.current += getChunkSize(chunkIndex);

        setUploadedChunks([...uploadedChunksRef.current].sort((a, b) => a - b));

        setProgress((uploadedBytesRef.current / file.size) * 100);
      }

      // Verify all chunks

      if (uploadedChunksRef.current.size !== serverState.totalChunks) {
        throw new Error('Some chunks are still missing');
      }

      // Complete upload

      await completeUpload(id);

      setProgress(100);
      setCurrentChunk(null);
      setStatus('completed');
    } catch (error) {
      console.error('Upload process failed:', error);

      // Don't show error when user paused
      if (pausedRef.current) {
        setStatus('paused');
        return;
      }

      setStatus('failed');

      setError(error instanceof Error ? error.message : 'Upload failed');
    }
  };

  // Start upload

  const handleUpload = async () => {
    if (!file) return;

    try {
      setError('');
      setStatus('uploading');

      let id = uploadId;

      // Create upload session only once
      if (!id) {
        const { data: response } = await createUpload({
          fileName: file.name,
          fileSize: file.size,
          chunkSize: CHUNK_SIZE,
        });

        id = response?.uploadId;

        setUploadId(id);
        setTotalChunks(response.totalChunks);
      }

      await processUpload(id);
    } catch (error) {
      console.error(error);

      setStatus('failed');

      setError(
        error instanceof Error ? error.message : 'Failed to start upload'
      );
    }
  };

  // Pause

  const handlePause = async () => {
    if (!uploadId) return;

    pausedRef.current = true;

    // Cancel current Axios request
    abortControllerRef.current?.abort();

    abortControllerRef.current = null;

    setStatus('paused');
    setCurrentChunk(null);

    try {
      await pauseUpload(uploadId);
    } catch (error) {
      console.error('Failed to pause upload:', error);
    }
  };

  // Resume

  const handleResume = async () => {
    if (!uploadId) return;

    try {
      setError('');

      await resumeUpload(uploadId);

      await processUpload(uploadId);
    } catch (error) {
      console.error(error);

      setStatus('failed');

      setError(
        error instanceof Error ? error.message : 'Failed to resume upload'
      );
    }
  };

  // Manual retry

  const handleRetry = async () => {
    if (!uploadId) return;

    setError('');

    await processUpload(uploadId);
  };

  // UI

  return (
    <div className={cx(modal.dialog, 'p-4 sm:p-5 overflow-y-auto')}>
      {/* Header */}

      <div className="mb-5">
        <h2 className={cx(text.primary, 'text-lg font-semibold')}>
          Upload File
        </h2>

        <p className={cx(text.muted, 'mt-1 text-sm')}>
          Upload files with pause, resume and retry.
        </p>
      </div>

      {/* File picker */}

      <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-line-strong p-8 transition hover:bg-surface-hover">
        <svg
          className={cx(text.subtle, 'mb-3 h-8 w-8')}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v9"
          />
        </svg>

        <span className={cx(text.secondary, 'text-sm font-medium')}>
          Choose a file
        </span>

        <span className={cx(text.muted, 'mt-1 text-xs')}>
          PDF, DOCX, images, videos, etc.
        </span>

        <input type="file" className="hidden" onChange={handleFileChange} />
      </label>

      {/* File details */}

      {file && (
        <div className="mt-5">
          {/* File name + progress */}

          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className={cx(text.primary, 'truncate text-sm font-medium')}>
                {file.name}
              </p>

              <p className={cx(text.muted, 'mt-1 text-xs')}>
                {formatBytes(file.size)} · {totalChunks}{' '}
                {totalChunks === 1 ? 'chunk' : 'chunks'}
              </p>
            </div>

            <span
              className={cx(text.secondary, 'shrink-0 text-sm font-semibold')}
            >
              {Math.round(progress)}%
            </span>
          </div>

          {/* Progress bar */}

          <div
            className={cx(
              skeleton.fill,
              'mt-4 h-2 w-full overflow-hidden rounded-full'
            )}
          >
            <div
              className="h-full rounded-full bg-brand-600 transition-all duration-200"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          {/* Chunk info */}

          <div className={cx(text.muted, 'mt-2 flex justify-between text-xs')}>
            <span>
              {currentChunk !== null
                ? `Uploading chunk ${currentChunk + 1} of ${totalChunks}`
                : `${uploadedChunks.length} of ${totalChunks} chunks uploaded`}
            </span>

            <span className="capitalize">{status}</span>
          </div>

          {/* Error */}

          {error && (
            <div className={cx(form.alert, 'mt-4 text-sm')}>{error}</div>
          )}

          {/* Actions */}

          <div className="mt-5 flex gap-2">
            {/* Start */}

            {status === 'idle' && (
              <button
                type="button"
                onClick={handleUpload}
                className={button.primary}
              >
                Upload
              </button>
            )}

            {/* Pause */}

            {status === 'uploading' && (
              <button
                type="button"
                onClick={handlePause}
                className={button.secondary}
              >
                Pause
              </button>
            )}

            {/* Resume */}

            {status === 'paused' && (
              <button
                type="button"
                onClick={handleResume}
                className={button.primary}
              >
                Resume
              </button>
            )}

            {/* Retry */}

            {status === 'failed' && (
              <button
                type="button"
                onClick={handleRetry}
                className={button.primary}
              >
                Retry
              </button>
            )}

            {/* Completed */}

            {status === 'completed' && (
              <div
                className={cx(
                  tone.success,
                  'rounded-md px-4 py-2 text-sm font-medium'
                )}
              >
                ✓ Upload completed
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
