import React, { useState, type SubmitEvent } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { TrendingUp, X } from 'lucide-react';
import { promoteEmployee } from '../../../api/admin-portal.api';
import { getApiErrorDetails } from '../../../services/utils.service';
import { button, card, form, modal, palette, text } from '../../../theme/theme';
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
    if (!isValid) {
      return;
    }
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
    <div className={`${modal.drawer} lg:w-125!`}>
      <div className={modal.stickyHeader}>
        <div className="min-w-0">
          <h1 className={`${modal.title} xl:text-lg`}>Promote {name}</h1>
          <h2 className={modal.subtitle}>
            Updates the employee, their login profile and promotion history
            together.
          </h2>
        </div>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className={button.icon}
        >
          <X width={18} height={18} />
        </button>
      </div>

      <div className="px-4 sm:px-5 pt-5">
        <div className={`${card.muted} p-3! text-sm`}>
          <p className={`text-xs ${text.muted}`}>Current</p>
          <p className={`font-medium ${text.primary}`}>
            {designation}
            {level && (
              <span
                className={`ml-2 text-xs font-normal capitalize ${text.muted}`}
              >
                {level}
              </span>
            )}
          </p>
        </div>
      </div>

      <form
        onSubmit={(e) => void handleSubmit(e)}
        className="px-4 sm:px-5 py-5 flex flex-col gap-4"
        noValidate
      >
        <div className="flex flex-col">
          <label htmlFor="newDesignation" className={form.label}>
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
            className={form.input}
            disabled={isSaving}
          />
        </div>

        <div className={form.grid}>
          <div className="flex flex-col">
            <label htmlFor="newLevel" className={form.label}>
              New level
            </label>
            <select
              id="newLevel"
              name="newLevel"
              value={newLevel}
              onChange={(e) => setNewLevel(e.target.value)}
              className={form.input}
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
            <label htmlFor="newSalary" className={form.label}>
              New salary (optional)
            </label>
            <input
              id="newSalary"
              name="newSalary"
              type="number"
              min={0}
              value={newSalary}
              onChange={(e) => setNewSalary(e.target.value)}
              className={form.input}
              disabled={isSaving}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="effectiveDate" className={form.label}>
            Effective date
          </label>
          <input
            id="effectiveDate"
            name="effectiveDate"
            type="date"
            max={today()}
            value={effectiveDate}
            onChange={(e) => setEffectiveDate(e.target.value)}
            className={form.input}
            disabled={isSaving}
          />
        </div>

        {isUnchanged && trimmedDesignation && (
          <p className={form.warning}>Designation or level must change.</p>
        )}
        {error && (
          <div role="alert" className={form.alert}>
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
          className={button.primary}
        >
          {isSaving ? (
            <TailSpin
              visible={true}
              height={20}
              color={palette.white}
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
