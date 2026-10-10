/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { ChangeEvent } from 'react';
import type { InputFieldType } from '../../types/types';
import { cx, form } from '../../theme/theme';

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
        className={cx(className, disabled && form.disabled)}
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
          className={cx(form.error, 'px-2')}
        >
          {errors[name]}
        </span>
      )}
    </>
  );
}

export default FormField;
