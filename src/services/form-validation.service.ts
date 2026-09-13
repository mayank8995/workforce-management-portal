import type { Errors, FormData } from '../types/types';
import { FORM_FIELD_ERROR_LABELS } from '../utils/constants';

export function validateField(name: string, value: any) {
  let errorMsg = '';
  if (!/^[a-zA-Z0-9\s-._@\/]*$/.test(value) && name !== 'phone')
    errorMsg = 'Special characters not allowed';

  if (name === 'name' && value.length < 3) {
    errorMsg = 'Username must be at least 3 characters';
  }
  if (
    name === 'phone' &&
    !/^\+?(?:1[-.]?)?555[-.]?\d{6}$|^(?:\+91)?[6-9]\d{9}$/.test(value)
  ) {
    errorMsg = 'Phone number is invalid';
  }
  if (
    name === 'email' &&
    !/^(?!\s*$)([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(value)
  ) {
    errorMsg = 'Invalid email address';
  }
  if (name === 'password' && value.length < 6) {
    errorMsg = 'Password must be at least 6 characters';
  }
  if (name === 'confirmPassword' && value.length < 6) {
    errorMsg = 'Password must be at least 6 characters';
  }
  if (
    (name === 'name' ||
      name === 'department' ||
      name === 'designation' ||
      name === 'empId' ||
      name === 'joiningDate') &&
    !value.trim()
  ) {
    errorMsg = `${FORM_FIELD_ERROR_LABELS[name] ?? name} is required!`;
  }
  // console.log(name, value)
  return errorMsg;
}

export const validateFormOne = (data: FormData['formOne']): Errors => {
  const errors: Errors = {};
  const specialCharRegex = /^[a-zA-Z0-9\s-._@\/]*$/;
  Object.keys(data).forEach((key) => {
    const field = key as keyof typeof data;
    // console.log("wqeqwqeqweq",field, data[field])
    if (!specialCharRegex.test(data[field])) {
      errors[field] = 'Special characters not allowed';
    }
    if (field === 'name' && data[field].length < 3) {
      errors[field] = 'Username must be at least 3 characters';
    }
    if (field === 'confirmPassword' && data[field].length < 6) {
      errors[field] = 'Confirm Password must be at least 6 characters';
    }
    if (field === 'password' && data[field].length < 6) {
      errors[field] = 'Password must be at least 6 characters';
    }

    if (
      field === 'email' &&
      !/^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(data[field])
    )
      errors[field] = 'Invalid email address';
    if (!data[field].trim()) {
      errors[field] = `${FORM_FIELD_ERROR_LABELS[field] ?? field} is required`;
    }
  });
  if (data.confirmPassword !== data.password) {
    errors['confirmPassword'] = 'Please make sure your passwords match';
  }
  // console.log("errorserrors",errors)

  return errors;
};

export const validateFormTwo = (data: FormData['formTwo']): Errors => {
  const errors: Errors = {};
  const specialCharRegex = /^[a-zA-Z0-9\s-._@\/]*$/;
  Object.keys(data).forEach((key) => {
    const field = key as keyof typeof data;
    if (!specialCharRegex.test(data[field].trim())) {
      errors[field] = 'Special characters not allowed';
    }
    if (!data[field].trim()) {
      errors[field] = `${FORM_FIELD_ERROR_LABELS[field] ?? field} is required`;
    }
  });
  return errors;
};
