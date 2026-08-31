/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type SubmitEvent,
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GUEST_LOGIN,
  loginClassName,
  loginLabelclassNAme,
  NAV_ITEMS,
} from '../../utils/constants';
import FormField from '../../components/Form/FormField';
import { validateField } from '../../services/form-validation.service';
import type { LoginData, LoginForm } from '../../types/types';
import { checkHealth, doLogin } from '../../api/admin-portal.api';
import { TailSpin } from 'react-loader-spinner';
import { toast, type ToastContent } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { getApiErrorDetails } from '../../services/utils.service';
import { loadDashboardPage } from '../../router/router';

type ServerHealth = {
  status: boolean;
  message: string;
};

// LoginCard.jsx
function Login({
  onCustomEvent,
  isGuest,
}: {
  onCustomEvent: (flag: boolean) => void;
  isGuest?: boolean;
}) {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const guestLoginStarted = useRef(false);
  const [serverWakingUp, setServerWakingUp] = useState<ServerHealth>({
    status: false,
    message: '⚡Waking up free demo server...',
  });

  useEffect(() => {
    if (!isGuest || guestLoginStarted.current) return;
    guestLoginStarted.current = true;
    if (isGuest) {
      const guestForm = GUEST_LOGIN;
      setForm((prev) => ({
        ...prev,
        ...guestForm,
      }));
      handleLogin(guestForm);
    }
  }, [isGuest]);

  function checkFormValidity(form: LoginForm) {
    let valid: boolean = true;
    for (const key of Object.keys(form) as Array<keyof LoginForm>) {
      const msg = validateField(key, form[key]);
      if (msg) {
        valid = false;
      }
      // console.log("msg>>>",msg)
      setErrors((prevErrors) => ({
        ...prevErrors,
        [key]: msg,
      }));
    }
    return valid;
  }
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleLogin(form);
  };

  const handleLogin = async (form: LoginForm) => {
    try {
      if (checkFormValidity(form)) {
        // console.log("inside herer")
        setIsLoading(true);
        // first check render server(free) health check
        await wakeUpServer();
        const res: {
          status?: number;
          data?: { data?: LoginData; message?: ToastContent<unknown> };
        } | null = await doLogin(form);
        if (res?.status === 200) {
          const { _id, name } = res?.data?.data as LoginData;
          login({ _id, name });
          toast.success(res?.data?.message, {});
          navigate(NAV_ITEMS.DASHBOARD);
        } else {
          toast.error(res?.data?.message, {});
        }
      } else {
        // console.log("ELSE SUBMIT");
        setIsLoading(false);
      }
    } catch (err) {
      const { message } = getApiErrorDetails(err);
      toast.error(message, {});
      console.error('POST FAILED', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value }: { name: string; value: string } = e.target;
    // console.log("onchange data",name, value);
    try {
      setForm((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      const msg = validateField(name, value);
      // console.log("msg>>>",msg)
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: msg,
      }));
    } catch (err) {
      console.error(err);
    }
  };
  const wakeUpServer = async () => {
    const timer = setTimeout(() => {
      setServerWakingUp((prev) => ({ ...prev, status: true }));
    }, 1000);
    try {
      const response = await checkHealth();
      console.log('response health', response);
      setServerWakingUp((prev) => ({
        ...prev,
        message:
          response?.data?.status === 'ok'
            ? '✓ Demo server is ready!'
            : prev.message,
      }));
    } catch (error) {
      toast.error('Request timed out.Please try again!');
    } finally {
      clearTimeout(timer);
      setServerWakingUp((prev) => ({ ...prev, status: false }));
    }
  };
  return (
    <div className="h-100 md:max-h-150 md:h-127.5 bg-violet-50 border-violet-200 dark:bg-[#211a3d] border dark:border-[#7c3aed]/20  rounded-2xl shadow-2xl shadow-[#2d1b4e]/60 p-4 md:p-8 w-full max-w-md">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-slate-900 dark:text-white font-bold text-lg md:text-xl">
          Welcome back
        </h2>
        <p className="text-slate-900 dark:text-white text-sm font-medium">
          Sign in to your account
        </p>
      </div>

      {/* Email */}
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="email" className={loginLabelclassNAme}>
              Username/Admin ID
            </label>
            <FormField
              errors={errors}
              value={form?.email}
              name={'email'}
              type={'email'}
              placeholder={'you@example.com'}
              className={loginClassName}
              id={'email'}
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="password" className={loginLabelclassNAme}>
              Password
            </label>
            <FormField
              errors={errors}
              value={form?.password}
              name={'password'}
              type={'password'}
              placeholder={'••••••••'}
              className={loginClassName}
              id={'password'}
              onChange={handleOnChange}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          onMouseEnter={() => {
            loadDashboardPage();
          }}
          onPointerDown={() => {
            loadDashboardPage();
          }}
          className={` w-full bg-[#534ab7] text-white font-semibold py-3 rounded-lg mt-4  mb-4 px-6 
                         text-sm
                        shadow-lg shadow-indigo-500/30
                        hover:enabled:shadow-xl hover:enabled:shadow-indigo-500/40   
                        hover:enabled:bg-[#8e89f2]                     
                        cursor-pointer disabled:text-gray-400 disabled:cursor-not-allowed
                         ${[isLoading ? 'disabled:bg-[#8e89f2] cursor-not-allowed' : undefined].filter(Boolean).join(' ')}
                        `}
        >
          {isLoading ? (
            <TailSpin
              visible={true}
              height={20}
              color="#fff"
              radius="4"
              ariaLabel="tail-spin-loading"
              wrapperStyle={{}}
              wrapperClass="flex items-center justify-center"
            />
          ) : (
            <>Sign in</>
          )}
        </button>
      </form>
      {serverWakingUp?.status && (
        <p className="mb-2 text-xs text-center font-medium text-amber-600 dark:text-amber-400">
          {serverWakingUp?.message}
        </p>
      )}
      <p className="text-center text-slate-600 dark:text-slate-400 text-sm">
        Don't have an account?{' '}
        <button
          onClick={() => onCustomEvent(false)}
          className="text-[#9d8df1] cursor-pointer"
        >
          Create one
        </button>
      </p>
    </div>
  );
}
export default Login;
