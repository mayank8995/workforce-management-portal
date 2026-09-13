/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { ChangeEvent } from 'react';
import type { InputFieldType } from '../../types/types';
import { className as defaultClass } from '../../utils/constants';

function FormField({
  type,
  placeholder,
  name,
  onChange,
  className,
  value,
  errors,
  maxlength,
  style,
  checked,
  onClick,
  id,
  ref,
  disabled,
}: InputFieldType) {
  function handleOnchange(e: ChangeEvent<HTMLInputElement>) {
    onChange?.(e);
  }
  return (
    <>
      <input
        style={style}
        maxLength={maxlength}
        value={value}
        type={type || 'text'}
        name={name || 'text'}
        onChange={handleOnchange}
        className={
          `${className} ${disabled ? 'disabled:cursor-not-allowed disabled:opacity-60disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-200 dark:disabled:bg-slate-800/50 dark:disabled:text-slate-500 dark:disabled:border-slate-700' : ''}` ||
          `${defaultClass} ${disabled ? 'disabled:cursor-not-allowed disabled:opacity-60disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-200 dark:disabled:bg-slate-800/50 dark:disabled:text-slate-500 dark:disabled:border-slate-700' : ''}`
        }
        placeholder={placeholder}
        checked={checked}
        onClick={onClick}
        id={id}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        aria-describedby={`${name}-error-message`}
        ref={ref}
        disabled={disabled}
      />
      {name && errors && errors[name] && (
        <span
          id={`${name}-error-message`}
          aria-live="assertive"
          className="text-red-400 px-2"
          style={{ fontSize: '12px' }}
        >
          {errors[name]}
        </span>
      )}
    </>
  );
}

export default FormField;
