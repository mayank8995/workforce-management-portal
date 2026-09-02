import { toast } from 'react-toastify';
import apiClient from '../services/http-common.service';
import { getApiErrorDetails } from '../services/utils.service';
import type {
  EmployeeFormType,
  FilterList,
  LoginForm,
  LoginProfile,
  ProfileForm,
  SignUpForm,
  TableQueryParams,
} from '../types/types';
import { router } from '../router/router';
import axios from 'axios';
import { getEnv } from '../config/env';

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
      router.navigate('/portal');
    }
  } catch (err: unknown) {
    router.navigate('/portal');
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

export const guestLogin = async (form: LoginForm) => {
  try {
    const res = await doLogin(form);
    return res;
  } catch (err: unknown) {
    const { message, status, url } = getApiErrorDetails(err);
    console.error('API Error:', message);
    console.error('Status:', status);
    console.error('URL:', url);
  }
};

// for this api different timeout
export const checkHealth = async () => {
  try {
    const { apiUrl } = getEnv();
    const response = await axios.get('/health', {
      baseURL: apiUrl || 'http://localhost:3000/',
      timeout: 90000,
      withCredentials: true,
      headers: {
        'Content-type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
