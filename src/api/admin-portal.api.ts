import { toast } from 'react-toastify';
import apiClient from '../services/http-common.service';
import { getApiErrorDetails } from '../services/utils.service';
import type {
  ChunkUploadOptions,
  CreateUploadRequest,
  CreateUploadResponse,
  EmployeeFormType,
  FilterList,
  LoginForm,
  LoginProfile,
  ProfileForm,
  SignUpForm,
  TableQueryParams,
  UploadStatusResponse,
} from '../types/types';
import { router } from '../router/router';
import { getEnv } from '../config/env';
import axios from 'axios';
// import axios from 'axios';
// import { getEnv } from '../config/env';

export default async function getEmployees() {
  try {
    const response = await apiClient.get('/employeeList');
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function getTableEmployees(
  params: TableQueryParams,
  setIsLoading?: (loading: boolean) => void,
  signal?: AbortSignal
) {
  try {
    setIsLoading?.(true);
    const response = await apiClient.get('/employees', {
      params,
      signal,
    });
    setIsLoading?.(false);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  } finally {
    setIsLoading?.(false);
  }
}

export async function getAnalyticsEmployeesTable(
  params: TableQueryParams,
  setIsLoading?: (loading: boolean) => void,
  signal?: AbortSignal
) {
  try {
    setIsLoading?.(true);
    const response = await apiClient.get(
      `/analytics/${params?.tableType}/employees`,
      {
        params,
        signal,
      }
    );
    setIsLoading?.(false);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  } finally {
    setIsLoading?.(false);
  }
}
export async function getFilterList(params: FilterList) {
  try {
    const response = await apiClient.get('/filterList', {
      params,
    });
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function getAnalytics() {
  try {
    const response = await apiClient.get('/dashboard/analytics');
    return response?.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function getTopPerformers() {
  try {
    const response = await apiClient.get('/analytics/topPerformers/employees');
    // console.log("response>>>>",response)
    return response?.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
export async function getMeetingKPIs() {
  try {
    const response = await apiClient.get('/analytics/meetingKPIs/employees');
    // console.log("response>>>>",response)
    return response?.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
export async function getPromotedThisYear() {
  try {
    const response = await apiClient.get(
      '/analytics/promotedThisYear/employees'
    );
    // console.log("response>>>>",response)
    return response?.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
export async function getRequiringReview() {
  try {
    const response = await apiClient.get(
      '/analytics/requiringReview/employees'
    );
    // console.log("response>>>>",response)
    return response?.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export const postSubmitProfileSettings = async (form: ProfileForm | null) => {
  // console.log("form>>>", form);
  try {
    const res = await apiClient.post('/profile', form);
    // console.log("Created:", res);
    return res;
  } catch (err: unknown) {
    const { message, status, url } = getApiErrorDetails(err);
    console.error('API Error:', message);
    console.error('Status:', status);
    console.error('URL:', url);
    throw err;
  }
};

export const getProfileData = async (params: LoginProfile) => {
  try {
    const res = await apiClient.get('/employee/profile', { params });
    // console.log("got:", res.data);
    return res;
  } catch (err: unknown) {
    const { message, status, url } = getApiErrorDetails(err);
    console.error('API Error:', message);
    console.error('Status:', status);
    console.error('URL:', url);
    throw err;
  }
};

export const editProfileData = async (payload: ProfileForm | null) => {
  try {
    const res = await apiClient.patch('/employee/edit/profile', payload);
    // console.log("Edited:", res.data);
    return res;
  } catch (err: unknown) {
    const { message, status, url } = getApiErrorDetails(err);
    console.error('API Error:', message);
    console.error('Status:', status);
    console.error('URL:', url);
    throw err;
  }
};

export const doLogin = async (form: LoginForm) => {
  // console.log("form>>>", form);
  try {
    const res = await apiClient.post('/login', JSON.stringify(form));
    // console.log("Created:", res);
    return res;
  } catch (err: unknown) {
    console.error('err>>>', err);
    const { message, status, url } = getApiErrorDetails(err);
    console.error('API Error:', message);
    console.error('Status:', status);
    console.error('URL:', url);
    throw err;
  }
};

export const doLogout = async () => {
  try {
    const response = await apiClient.post('/logout');
    const { success } = response?.data;
    if (success) {
      router.navigate('/');
    }
  } catch (err: unknown) {
    router.navigate('/');
    console.error('err>>>', err);
    const { message, status, url } = getApiErrorDetails(err);
    console.error('API Error:', message);
    console.error('Status:', status);
    console.error('URL:', url);
    throw err;
  } finally {
    toast.info('Logged out!');
  }
};
export const refreshToken = async () => {
  try {
    await apiClient.get('/refreshToken');
  } catch (err: unknown) {
    console.error('err>>>', err);
    const { message, status, url } = getApiErrorDetails(err);
    console.error('API Error:', message);
    console.error('Status:', status);
    console.error('URL:', url);
    throw err;
  }
};

export const doSignup = async (form: SignUpForm) => {
  // console.log("form>>>", form);
  try {
    const res = await apiClient.post('/signup', JSON.stringify(form));
    // console.log("Created:", res);
    return res;
  } catch (err: unknown) {
    const { message, status, url } = getApiErrorDetails(err);
    console.error('API Error:', message);
    console.error('Status:', status);
    console.error('URL:', url);
    throw err;
  }
};

export const fetchEmployeeDetails = async (params: { _id: string }) => {
  try {
    const res = await apiClient.get('/employee/details', { params });
    // console.log("Created:", res);
    return res;
  } catch (err: unknown) {
    const { message, status, url } = getApiErrorDetails(err);
    console.error('API Error:', message);
    console.error('Status:', status);
    console.error('URL:', url);
    throw err;
  }
};

export const createEmployee = async (form: EmployeeFormType) => {
  try {
    const res = await apiClient.post('/employee/create', JSON.stringify(form));
    return res;
  } catch (err: unknown) {
    const { message, status, url } = getApiErrorDetails(err);
    console.error('API Error:', message);
    console.error('Status:', status);
    console.error('URL:', url);
    throw err;
  }
};
export const editEmployee = async (
  form: EmployeeFormType,
  params: { _id: string; type: string }
) => {
  try {
    const res = await apiClient.patch('/employee/edit', JSON.stringify(form), {
      params,
    });
    return res;
  } catch (err: unknown) {
    const { message, status, url } = getApiErrorDetails(err);
    console.error('API Error:', message);
    console.error('Status:', status);
    console.error('URL:', url);
    throw err;
  }
};

export const guestLogin = async () => {
  try {
    const res = await apiClient.post('/guest');
    return res;
  } catch (err: unknown) {
    console.error('err>>>', err);
    const { message, status, url } = getApiErrorDetails(err);
    toast.error(message);
    console.error('API Error:', message);
    console.error('Status:', status);
    console.error('URL:', url);
  }
};

export const aiChat = async (data: string) => {
  try {
    const { apiUrl } = getEnv();
    const res = await axios.post('/ai/query', data, {
      baseURL: apiUrl || 'http://localhost:3500/',
      timeout: 90000,
      withCredentials: true,
      headers: {
        'Content-type': 'application/json',
      },
    });
    return res;
  } catch (err: unknown) {
    const { message, status, url } = getApiErrorDetails(err);
    console.error('API Error:', message);
    console.error('Status:', status);
    console.error('URL:', url);
    throw err;
  }
};

export const createUpload = async (
  payload: CreateUploadRequest
): Promise<CreateUploadResponse> => {
  const { data } = await apiClient.post<CreateUploadResponse>(
    '/uploads',
    payload
  );

  return data;
};

export const getUploadStatus = async (
  uploadId: string
): Promise<UploadStatusResponse> => {
  const { data } = await apiClient.get<UploadStatusResponse>(
    `/uploads/${uploadId}`
  );

  return data;
};

export const uploadChunk = ({
  file,
  uploadId,
  chunkIndex,
  chunkSize,
  onProgress,
  signal,
}: ChunkUploadOptions & {
  signal?: AbortSignal;
}): Promise<void> => {
  const start = chunkIndex * chunkSize;
  const end = Math.min(start + chunkSize, file.size);

  const chunk = file.slice(start, end);

  return apiClient.put(`/uploads/${uploadId}/chunks/${chunkIndex}`, chunk, {
    headers: {
      'Content-Type': 'application/octet-stream',
    },

    onUploadProgress: (event) => {
      if (!event.total) return;

      onProgress?.(event.loaded);
    },

    signal,
  });
};

export const pauseUpload = async (uploadId: string): Promise<void> => {
  await apiClient.patch(`/uploads/${uploadId}/pause`);
};

export const resumeUpload = async (uploadId: string): Promise<void> => {
  await apiClient.patch(`/uploads/${uploadId}/resume`);
};

export const completeUpload = async (uploadId: string): Promise<void> => {
  await apiClient.post(`/uploads/${uploadId}/complete`);
};
