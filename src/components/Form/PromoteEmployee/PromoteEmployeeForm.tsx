import React, { useState, type SubmitEvent } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { TrendingUp, X } from 'lucide-react';
import { promoteEmployee } from '../../../api/admin-portal.api';
import { getApiErrorDetails } from '../../../services/utils.service';
import { className, labelclassName } from '../../../utils/constants';
import type { EmployeeLevel } from '../../../types/types';

const LEVEL_OPTIONS: { value: EmployeeLevel; label: string }[] = [
  { value: 'junior', label: 'Junior' },
  { value: 'senior', label: 'Senior' },
  { value: 'lead', label: 'Lead' },
  { value: 'executive', label: 'Executive' },
];

const today = () => new Date().toISOString().split('T')[0];

interface PromoteEmployeeFormProps {
  onClose: () => void;
  _id: string;
  name: string;
  designation: string;
  level?: string;
  salary?: number;
}

function PromoteEmployeeForm({
  onClose,
  _id,
  name,
  designation,
  level,
  salary,
}: PromoteEmployeeFormProps) {
  const queryClient = useQueryClient();
  const [newDesignation, setNewDesignation] = useState('');
  const [newLevel, setNewLevel] = useState<string>(level ?? '');
  const [newSalary, setNewSalary] = useState<string>(
    salary !== undefined ? String(salary) : ''
  );
  const [effectiveDate, setEffectiveDate] = useState(today);
  const [error, setError] = useState<string | null>(null);
  const [conflict, setConflict] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const trimmedDesignation = newDesignation.trim();
  const isUnchanged = trimmedDesignation === designation && newLevel === level;
  const isValid =
    trimmedDesignation.length >= 2 &&
    trimmedDesignation.length <= 35 &&
    !!newLevel &&
    !isUnchanged;

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValid) {return;}
    setIsSaving(true);
    setError(null);
    setConflict(false);
    try {
      await promoteEmployee(_id, {
        newDesignation: trimmedDesignation,
        newLevel: newLevel as EmployeeLevel,
        ...(newSalary !== '' && { newSalary: Number(newSalary) }),
        effectiveDate,
        expectedDesignation: designation,
      });
      toast.success(`${name} promoted to ${trimmedDesignation}`);
      void queryClient.invalidateQueries({ queryKey: ['employees'] });
      void queryClient.invalidateQueries({ queryKey: ['employeeDetail'] });
      void queryClient.invalidateQueries({ queryKey: ['promotionHistory'] });
      void queryClient.invalidateQueries({ queryKey: ['promotedThisYear'] });
      onClose();
    } catch (err) {
      const { message, status } = getApiErrorDetails(err);
      // 409: someone else changed this employee since the form was opened.
      setConflict(status === 409);
      setError(message ?? 'Promotion failed');
      if (status === 409) {
        void queryClient.invalidateQueries({ queryKey: ['employeeDetail'] });
        void queryClient.invalidateQueries({ queryKey: ['employees'] });
      }
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div
      className="p-4 sm:p-5
        w-full sm:w-115 md:w-125
        h-full
        overflow-y-auto
        bg-white dark:bg-slate-900
        text-slate-900 dark:text-slate-100
        shadow-2xl border-l border-slate-200 dark:border-slate-800
        fixed z-300 right-0 top-0"
    >
      <div className="mb-5 flex justify-between items-start gap-3">
        <div className="min-w-0">
          <h1 className="text-base xl:text-xl font-semibold text-slate-800 dark:text-slate-100 truncate">
            Promote {name}
          </h1>
          <h2 className="text-xs xl:text-sm text-slate-500 mt-0.5 dark:text-slate-400">
            Updates the employee, their login profile and promotion history
            together.
          </h2>
        </div>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg cursor-pointer transition-colors text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-300"
        >
          <X width={18} height={18} />
        </button>
      </div>

      <div className="mb-4 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-800 dark:bg-slate-800/40">
        <p className="text-xs text-slate-500 dark:text-slate-400">Current</p>
        <p className="font-medium text-slate-800 dark:text-slate-100">
          {designation}
          {level && (
            <span className="ml-2 text-xs font-normal capitalize text-slate-500 dark:text-slate-400">
              {level}
            </span>
          )}
        </p>
      </div>

      <form
        onSubmit={(e) => void handleSubmit(e)}
        className="rounded-2xl border border-slate-200 bg-white p-4 flex flex-col gap-4 dark:border-slate-800 dark:bg-slate-900/60"
        noValidate
      >
        <div className="flex flex-col">
          <label htmlFor="newDesignation" className={labelclassName}>
            New designation
          </label>
          <input
            id="newDesignation"
            name="newDesignation"
            type="text"
            placeholder="e.g. Senior Software Engineer"
            value={newDesignation}
            maxLength={35}
            onChange={(e) => setNewDesignation(e.target.value)}
            className={className}
            disabled={isSaving}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="newLevel" className={labelclassName}>
              New level
            </label>
            <select
              id="newLevel"
              name="newLevel"
              value={newLevel}
              onChange={(e) => setNewLevel(e.target.value)}
              className={className}
              disabled={isSaving}
            >
              <option value="">Select level</option>
              {LEVEL_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="newSalary" className={labelclassName}>
              New salary (optional)
            </label>
            <input
              id="newSalary"
              name="newSalary"
              type="number"
              min={0}
              value={newSalary}
              onChange={(e) => setNewSalary(e.target.value)}
              className={className}
              disabled={isSaving}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="effectiveDate" className={labelclassName}>
            Effective date
          </label>
          <input
            id="effectiveDate"
            name="effectiveDate"
            type="date"
            max={today()}
            value={effectiveDate}
            onChange={(e) => setEffectiveDate(e.target.value)}
            className={className}
            disabled={isSaving}
          />
        </div>

        {isUnchanged && trimmedDesignation && (
          <p className="text-xs text-amber-600 dark:text-amber-400">
            Designation or level must change.
          </p>
        )}
        {error && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
          >
            <p>{error}</p>
            {conflict && (
              <button
                type="button"
                onClick={onClose}
                className="mt-2 underline cursor-pointer"
              >
                Close and reopen to see the latest data
              </button>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={!isValid || isSaving}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-medium text-xs xl:text-sm rounded-lg transition-colors duration-150 cursor-pointer hover:enabled:bg-indigo-700 disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed dark:disabled:bg-slate-800 dark:disabled:text-slate-600"
        >
          {isSaving ? (
            <TailSpin
              visible={true}
              height={20}
              color="#fff"
              radius="4"
              ariaLabel="tail-spin-loading"
              wrapperClass="flex items-center justify-center"
            />
          ) : (
            <>
              <TrendingUp size={16} /> Promote
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default React.memo(PromoteEmployeeForm);
