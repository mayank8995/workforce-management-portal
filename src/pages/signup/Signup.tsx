import { useState } from 'react';
import { initialFormData, type Errors, type FormData } from '../../types/types';
import {
  loginClassName,
  loginLabelclassNAme,
  stepConfig,
} from '../../utils/constants';
import FormField from '../../components/Form/FormField';
import { TailSpin } from 'react-loader-spinner';
import { validateField } from '../../services/form-validation.service';
import { doSignup } from '../../api/admin-portal.api';
import { toast, type ToastContent } from 'react-toastify';
import { ChevronLeft, StepBack, StepForward } from 'lucide-react';
import { getApiErrorDetails } from '../../services/utils.service';

export default function Signup({
  onCustomEvent,
}: {
  onCustomEvent: () => void;
}) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);

  const updateStep = <K extends keyof FormData>(
    key: K,
    data: FormData[K],
    activeKey: string
  ) => {
    setFormData((prev) => ({ ...prev, [key]: data }));
    const field = activeKey as keyof typeof data;
    const msg = validateField(activeKey, data && data[field]);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: msg,
    }));
  };

  const handleNext = () => {
    const { key, validate } = stepConfig[step];
    const stepErrors = validate(formData[key] as any);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length === 0) {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    setErrors({});
    setStep((s) => s - 1);
  };

  const handleFinalSubmit = async () => {
    //    console.log("final formData>>>",formData, {...formData})
    // re-validate everything, not just the last step
    const allErrors = stepConfig.reduce<Errors>((acc, { key, validate }) => {
      return { ...acc, ...validate(formData[key] as any) };
    }, {});

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      // jump back to the first step that has an error
      const firstBadStep = stepConfig.findIndex(
        ({ key, validate }) =>
          Object.keys(validate(formData[key] as any)).length > 0
      );
      setStep(firstBadStep);
      return;
    }
    try {
      setIsLoading(true);

      const res: {
        status?: number;
        data?: { message?: ToastContent<unknown> };
      } | null = await doSignup({
        ...formData['formOne'],
        ...formData['formTwo'],
      });
      if (res.status === 201) {
        toast.success(res?.data?.message, {});
        onCustomEvent();
      } else {
        toast.error(res?.data?.message, {});
        //   console.log("in else POST SUCCESS", res);
      }
      setIsLoading(false);
    } catch (err) {
      const { message } = getApiErrorDetails(err);
      toast.error(message, {});
      console.error('POST FAILED', err);
    } finally {
      setIsLoading(false);
    }
  };
  const steps = [
    <StepOneForm
      key={'formOne'}
      onCustomEvent={onCustomEvent}
      data={formData.formOne}
      errors={errors}
      handleOnChange={(d, k) => updateStep('formOne', d, k)}
    />,
    <StepTwoForm
      key={'formTwo'}
      handleBack={handleBack}
      data={formData.formTwo}
      errors={errors}
      handleOnChange={(d, k) => updateStep('formTwo', d, k)}
    />,
  ];

  const isLastStep = step === stepConfig.length - 1;

  return (
    <div className="overflow-y-auto h-100 md:max-h-150 md:h-127.5 bg-violet-50 border-violet-200 dark:bg-[#211a3d] border dark:border-[#7c3aed]/20 rounded-2xl shadow-2xl shadow-[#2d1b4e]/60 p-4 md:p-8 w-full max-w-md">
      <form noValidate>
        {steps[step]}
        <div>
          {isLastStep ? (
            <div className="mt-4 sm:mt-0 flex flex-row justify-between items-end">
              <button
                type="button"
                className="mb-2 md:hidden flex flex-row font-medium tracking-wide cursor-pointer"
                onClick={handleBack}
              >
                <ChevronLeft className="text-slate-900 dark:text-white text-xs font-medium tracking-wide" />{' '}
                <span className="pl-1 text-slate-900 dark:text-white">
                  Back
                </span>
              </button>
              <button
                type="button"
                onClick={handleFinalSubmit}
                className={`w-fit md:w-full bg-[#534ab7] text-white font-semibold py-3 rounded-lg mt-0 md:mt-4  px-6 
                         text-sm
                        shadow-lg shadow-indigo-500/30
                        hover:enabled:shadow-xl hover:enabled:shadow-indigo-500/40   
                        hover:enabled:bg-[#8e89f2]                     
                        cursor-pointer disabled:text-gray-400 disabled:cursor-not-allowed
                         ${[isLoading ? 'disabled:bg-[#8e89f2] cursor-not-allowed' : undefined].filter(Boolean).join(' ')}`}
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
                  <>Submit</>
                )}
              </button>
            </div>
          ) : (
            <div className="mt-4 sm:mt-0 flex flex-row justify-between items-end">
              <button
                type="button"
                className="md:hidden mb-2 flex flex-row font-medium cursor-pointer"
                onClick={onCustomEvent}
              >
                <StepBack className="text-slate-900 dark:text-white text-xs font-medium tracking-wide" />{' '}
                <span className="pl-2 text-slate-900 dark:text-white">
                  Back to Login
                </span>
              </button>
              <button
                type="button"
                className="md:hidden mb-2 flex flex-row-reverse text-slate-900 dark:text-white font-medium cursor-pointer"
                onClick={handleNext}
              >
                <StepForward className="text-slate-900 dark:text-white text-xs font-medium tracking-wide" />{' '}
                <span className="pr-2">Next</span>
              </button>
              <button
                type="button"
                className={`hidden md:flex justify-center w-full bg-[#534ab7] text-white font-semibold py-3 rounded-lg mt-0 md:mt-4  px-6 
                         text-sm
                        shadow-lg shadow-indigo-500/30
                        hover:enabled:shadow-xl hover:enabled:shadow-indigo-500/40   
                        hover:enabled:bg-[#8e89f2]                     
                        cursor-pointer disabled:text-gray-400 disabled:cursor-not-allowed
                         ${[isLoading ? 'disabled:bg-[#8e89f2] cursor-not-allowed' : undefined].filter(Boolean).join(' ')}`}
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export function StepOneForm({
  data,
  errors,
  handleOnChange,
  onCustomEvent,
}: {
  data: FormData['formOne'];
  errors: Errors;
  handleOnChange: (data: FormData['formOne'], activeKey: string) => void;
  onCustomEvent?: () => void;
}) {
  return (
    <>
      <button
        type="button"
        className="hidden md:flex mb-2 flex-row font-medium cursor-pointer"
        onClick={onCustomEvent}
      >
        <StepBack className="text-slate-900 dark:text-white text-xs font-medium tracking-wide" />{' '}
        <span className="pl-2 text-slate-900 dark:text-white">
          Back to Login
        </span>
      </button>
      <div className="mb-2 flex flex-col">
        <label htmlFor="name" className={loginLabelclassNAme}>
          Name
        </label>
        <FormField
          errors={errors}
          value={data?.name}
          name={'name'}
          type={'text'}
          placeholder={'Enter your name'}
          onChange={(event) =>
            handleOnChange({ ...data, name: event.target.value }, 'name')
          }
          className={loginClassName}
          id={'name'}
        />
      </div>
      <div className="mb-2 flex flex-col">
        <label htmlFor="email" className={loginLabelclassNAme}>
          Email
        </label>
        <FormField
          errors={errors}
          value={data?.email}
          name={'email'}
          type={'email'}
          placeholder={'you@example.com'}
          onChange={(event) =>
            handleOnChange({ ...data, email: event.target.value }, 'email')
          }
          className={loginClassName}
          id={'email'}
        />
      </div>
      <div className="mb-2 flex flex-col">
        <label htmlFor="password" className={loginLabelclassNAme}>
          Password
        </label>
        <FormField
          errors={errors}
          value={data?.password}
          name={'password'}
          type={'password'}
          placeholder={'••••••••'}
          onChange={(event) =>
            handleOnChange(
              { ...data, password: event.target.value },
              'password'
            )
          }
          className={loginClassName}
          id={'password'}
        />
      </div>
      <div className="mb-2 flex flex-col">
        <label htmlFor="confirmPassword" className={loginLabelclassNAme}>
          Confirm Password
        </label>
        <FormField
          errors={errors}
          value={data?.confirmPassword}
          name={'confirmPassword'}
          type={'password'}
          placeholder={'••••••••'}
          onChange={(event) =>
            handleOnChange(
              { ...data, confirmPassword: event.target.value },
              'confirmPassword'
            )
          }
          className={loginClassName}
          id={'confirmPassword'}
        />
      </div>
    </>
  );
}

export function StepTwoForm({
  data,
  errors,
  handleOnChange,
  handleBack,
}: {
  data: FormData['formTwo'];
  errors: Errors;
  handleOnChange: (data: FormData['formTwo'], activeKey: string) => void;
  handleBack: () => void;
}) {
  return (
    <>
      <button
        type="button"
        className="mb-2 hidden md:flex flex-row font-medium tracking-wide cursor-pointer"
        onClick={handleBack}
      >
        <ChevronLeft className="text-slate-900 dark:text-white text-xs font-medium tracking-wide" />{' '}
        <span className="pl-1 text-slate-900 dark:text-white">Back</span>
      </button>
      <div className="mb-2 flex flex-col">
        <label htmlFor="department" className={loginLabelclassNAme}>
          Department
        </label>
        <FormField
          errors={errors}
          value={data?.department}
          name={'department'}
          type={'text'}
          placeholder={'Enter your department'}
          onChange={(event) =>
            handleOnChange(
              { ...data, department: event.target.value },
              'department'
            )
          }
          className={loginClassName}
          id={'department'}
        />
      </div>
      <div className="mb-2 flex flex-col">
        <label htmlFor="designation" className={loginLabelclassNAme}>
          Designation
        </label>
        <FormField
          errors={errors}
          value={data?.designation}
          name={'designation'}
          type={'text'}
          placeholder={'Enter your designation'}
          onChange={(event) =>
            handleOnChange(
              { ...data, designation: event.target.value },
              'designation'
            )
          }
          className={loginClassName}
          id={'designation'}
        />
      </div>
      {/* <div className="mb-2 flex flex-col">
        <label htmlFor="empId" className={loginLabelclassNAme}>
          Employee Id
        </label>
        <FormField
          errors={errors}
          value={data?.empId}
          name={'empId'}
          type={'text'}
          placeholder={'B/XXXX..'}
          onChange={(event) =>
            handleOnChange({ ...data, empId: event.target.value }, 'empId')
          }
          className={loginClassName}
          id={'empId'}
        />
      </div> */}
      {/* <button  type="button" className=" w-full bg-gray-900   hover:bg-gray-700  mb-2  px-6 py-2.5
                        text-white font-semibold text-sm 
                        rounded-xl
                        shadow-lg shadow-indigo-500/30
                        hover:enabled:shadow-xl hover:enabled:shadow-indigo-500/40
                        hover:enabled:from-slate-800 hover:enabled:to-gray-900
                        transition-all duration-200
                        cursor-pointer disabled:text-gray-400 disabled:cursor-not-allowed"
                        onClick={previous}
                        >
                            Previous
                    </button>
                    <button  type="submit" className=" w-full bg-gray-900   hover:bg-gray-700  mb-2  px-6 py-2.5
                                    text-white font-semibold text-sm
                                    rounded-xl
                                    shadow-lg shadow-indigo-500/30
                                    hover:enabled:shadow-xl hover:enabled:shadow-indigo-500/40
                                    hover:enabled:from-slate-800 hover:enabled:to-gray-900
                                    transition-all duration-200
                                    cursor-pointer disabled:text-gray-400 disabled:cursor-not-allowed"
                                    >
                                        Submit
                    </button> */}
    </>
  );
}
