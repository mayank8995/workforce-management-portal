/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @eslint-react/set-state-in-effect */
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type SubmitEvent,
} from 'react';
import FormField from '../../components/Form/FormField';
import {
  className,
  labelclassName,
  PROFILE_SUBHEAD,
  SIDE_BAR_ITEMS,
} from '../../utils/constants';
import type { LoginProfile, ProfileForm } from '../../types/types';
import {
  editProfileData,
  postSubmitProfileSettings,
} from '../../api/admin-portal.api';
import { validateField } from '../../services/form-validation.service';
import { TailSpin } from 'react-loader-spinner';
import { toast, type ToastContent } from 'react-toastify';
import {
  getApiErrorDetails,
  useProfileData,
} from '../../services/utils.service';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import ProfileSettingSkeleton from '../../components/Skeleton/ProfileSettingSkeleton';
import ErrorPage from '../../components/Error/ErrorPage';

function ProfileSettings() {
  const { user } = useAuth();
  const {
    data: profileData,
    isLoading: isFormDataLoading,
    isError,
    refetch,
  } = useProfileData(user as LoginProfile);
  const { can } = useAuth();
  const isUpdateAllowed = can('settings', 'update');
  const [formValues, setFormValues] = useState<ProfileForm | null>({
    name: '',
    phone: '',
    email: '',
    department: '',
    designation: '',
    empId: '',
    joiningDate: '',
    workMode: '',
    location: '',
    image: null,
  });
  const uploadRef = useRef<HTMLInputElement>(null); // separate ref for image upload
  const [errors, setErrors] = useState({});
  const [formDisabled, setFormDisabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (
      profileData?.data?.data &&
      Object.keys(profileData?.data?.data)?.length > 0
    ) {
      setIsEditing(true);
      setFormValues(profileData?.data?.data as ProfileForm);
    }
  }, [profileData]);

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormValues((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    const msg = validateField(name, value);
    // console.log("msg>>>",msg)
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: msg,
    }));
  }

  function checkFormValidity() {
    let valid: boolean = true;
    for (const key in formValues) {
      // console.log("VZXVXZVXXZ",key)
      if (
        key === 'name' ||
        key === 'department' ||
        key === 'designation' ||
        key === 'empId' ||
        key === 'joiningDate'
      ) {
        // console.log("VZXVXZVXXZ",formValues[key])
        const msg = validateField(key, formValues[key]);
        if (msg) {
          valid = false;
        }
        // console.log("msg>>>",msg)
        setErrors((prevErrors) => ({
          ...prevErrors,
          [key]: msg,
        }));
      }
    }
    return valid;
  }

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (checkFormValidity()) {
        setIsLoading(true);
        // console.log("inside herer")
        setFormDisabled(false);
        let res: {
          status?: number;
          data?: { message?: ToastContent<unknown> };
        } | null = null;
        if (!isEditing) {
          res = await postSubmitProfileSettings({
            ...formValues,
            _id: user?._id,
          } as ProfileForm);
          if (res.status === 201) {
            toast.success(res?.data?.message);
            setIsEditing(true);
          } else {
            toast.error(res?.data?.message);
          }
          setIsLoading(false);
        } else {
          res = await editProfileData({
            ...formValues,
            id: user?._id,
          } as ProfileForm);
          if (res.status === 201) {
            toast.success(res?.data?.message);
            setIsEditing(true);
            queryClient.removeQueries({
              queryKey: ['profileData'],
              exact: true,
            });
          } else {
            toast.error(res?.data?.message);
          }
          setIsLoading(false);
        }
        // console.log("POST SUCCESS", res);
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

  function formReset() {
    if (
      window.confirm(
        'Are you sure you want to cancel? All unsaved changes will be lost.'
      )
    ) {
      setFormValues({
        name: '',
        phone: '',
        email: '',
        department: '',
        designation: '',
        empId: '',
        joiningDate: '',
        workMode: '',
        location: '',
        image: undefined,
      }); // reset the initial data to clear form fields
    }
  }

  function handleUpload() {
    try {
      if (uploadRef?.current) {
        uploadRef?.current?.click();
      }
    } catch (e) {
      const { message } = getApiErrorDetails(e);
      toast.error(message, {});
      console.error('Upload error:', e);
    }
  }
  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e?.target?.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // (e.g. max 50KB)
    if (file.size > 50 * 1024) {
      alert('File too large, max 50KB');
      return;
    }

    const reader = new FileReader();
    // Fires once the file is fully read as a Base64 Data URL string
    reader.onload = () => {
      const base64String = reader.result;
      if (typeof base64String !== 'string') {
        alert('Failed to read image file.');
        return;
      }
      try {
        setFormValues((prevData) => ({
          ...prevData,
          image: base64String,
        }));
      } catch (error) {
        console.error('Storage limit exceeded or failed:', error, file.size);
        alert('The image is too large to store in local storage.');
      }
    };

    // Convert the file blob into a reusable string
    reader.readAsDataURL(file);
  }
  return (
    <>
      {!isFormDataLoading ? (
        <div className="w-full  dark:bg-gray-800">
          {!isError ? (
            <div className="p-2 xl:p-4 dark:bg-gray-800">
              <div className="mb-6">
                <h1 className="text-base xl:text-2xl font-bold text-slate-800 dark:text-slate-100">
                  {SIDE_BAR_ITEMS.SETTINGS}
                </h1>
                <h2 className="text-xs xl:text-sm text-slate-500 mt-1 dark:text-slate-300">
                  {PROFILE_SUBHEAD}
                </h2>
              </div>
              <form
                onSubmit={handleSubmit}
                onReset={formReset}
                className="bg-linear-to-br from-white to-indigo-50/40 rounded-2xl  shadow-sm border border-slate-100 p-2 flex flex-col gap-3 hover:shadow-xl  dark:bg-linear-to-br dark:from-slate-900 dark:to-purple-950/20 dark:border-none"
                noValidate
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 p-4 gap-4">
                  <div className="bg-linear-to-br from-indigo-50 to-violet-50 rounded-2xl p-8 h-full dark:bg-linear-to-br dark:from-slate-900 dark:to-green-950/20">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-5 bg-indigo-500 rounded-full" />
                      <h2 className="text-sm xl:text-base font-bold text-slate-800 dark:text-slate-100">
                        Avatar
                      </h2>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-4 ">
                      <div className="relative">
                        <div className="w-32 h-32 rounded-full ring-4 ring-white shadow-xl overflow-hidden">
                          <img
                            loading="eager"
                            src={
                              formValues?.image || '/assets/avatar_fallback.svg'
                            }
                            className="aspect-square w-full h-full object-cover"
                            alt="User Profile"
                          />
                        </div>
                        <input
                          ref={uploadRef}
                          onChange={handleFileChange}
                          type="file"
                          style={{ display: 'none' }}
                        />
                        <button
                          onClick={handleUpload}
                          type="button"
                          className="cursor-pointer absolute bottom-1 right-1 w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg hover:bg-indigo-700 transition"
                        >
                          ✎
                        </button>
                      </div>
                      {formValues?.name && (
                        <div className="text-center">
                          <p className="font-bold text-slate-800 dark:text-slate-100 text-sm xl:text-base">
                            {formValues?.name}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-300">
                            {formValues?.designation}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-5 bg-indigo-500 rounded-full" />
                      <h2 className="text-sm xl:text-base font-bold text-slate-800 dark:text-slate-100">
                        Personal Information
                      </h2>
                    </div>
                    <div className="mb-4 flex flex-col">
                      <label htmlFor="name" className={labelclassName}>
                        Name
                      </label>
                      <FormField
                        errors={errors}
                        value={formValues?.name}
                        name={'name'}
                        type={'text'}
                        placeholder={'Enter your name'}
                        onChange={onInputChange}
                        className={className}
                        id={'name'}
                      />
                    </div>
                    <div className="mb-4 flex flex-col">
                      <label htmlFor="phone" className={labelclassName}>
                        Phone Number
                      </label>
                      <FormField
                        errors={errors}
                        value={formValues?.phone}
                        name={'phone'}
                        type={'text'}
                        placeholder={'Enter your phone number'}
                        onChange={onInputChange}
                        className={className}
                        id={'phone'}
                      />
                    </div>
                    <div className="mb-4 flex flex-col">
                      <label htmlFor="email" className={labelclassName}>
                        Email
                      </label>
                      <FormField
                        errors={errors}
                        value={formValues?.email}
                        name={'email'}
                        type={'email'}
                        placeholder={'Enter your email'}
                        onChange={onInputChange}
                        className={className}
                        id={'email'}
                        disabled={true}
                      />
                    </div>
                    <div className="mb-4 flex flex-col">
                      <label htmlFor="department" className={labelclassName}>
                        Department
                      </label>
                      <FormField
                        errors={errors}
                        value={formValues?.department}
                        name={'department'}
                        type={'text'}
                        placeholder={'Enter your department'}
                        onChange={onInputChange}
                        className={className}
                        id={'department'}
                        disabled={true}
                      />
                    </div>
                    <div className="mb-4 flex flex-col">
                      <label htmlFor="designation" className={labelclassName}>
                        Designation
                      </label>
                      <FormField
                        errors={errors}
                        value={formValues?.designation}
                        name={'designation'}
                        type={'text'}
                        placeholder={'Enter your designation'}
                        onChange={onInputChange}
                        className={className}
                        id={'designation'}
                        disabled={true}
                      />
                    </div>
                  </div>
                </div>
                <hr className="border-t-2  border-gray-300 border-dotted dark:border-gray-600"></hr>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-5 bg-indigo-500 rounded-full" />
                    <h2 className="text-sm xl:text-base font-bold text-slate-800 dark:text-slate-100">
                      Account Information
                    </h2>
                  </div>
                  <div className="mb-4 flex flex-col">
                    <label htmlFor="empId" className={labelclassName}>
                      Employee ID
                    </label>
                    <FormField
                      errors={errors}
                      value={formValues?.empId}
                      name={'empId'}
                      type={'text'}
                      placeholder={'Enter your ID'}
                      onChange={onInputChange}
                      className={className}
                      id={'empId'}
                      disabled={true}
                    />
                  </div>
                  <div className="mb-4 flex flex-col">
                    <label htmlFor="joiningDate" className={labelclassName}>
                      Joining Date
                    </label>
                    <FormField
                      errors={errors}
                      value={formValues?.joiningDate}
                      name={'joiningDate'}
                      type={'date'}
                      placeholder={'Enter your joining date'}
                      onChange={onInputChange}
                      className={className}
                      id={'joiningDate'}
                      disabled={true}
                    />
                  </div>
                  <div className="mb-4 flex flex-col">
                    <label htmlFor="workMode" className={labelclassName}>
                      Work Mode
                    </label>
                    <FormField
                      errors={errors}
                      value={formValues?.workMode}
                      name={'workMode'}
                      type={'text'}
                      placeholder={'Hybrid/Remote/Onsite'}
                      onChange={onInputChange}
                      className={className}
                      id={'workMode'}
                      disabled={true}
                    />
                  </div>
                  <div className="mb-4 flex flex-col">
                    <label htmlFor="location" className={labelclassName}>
                      Location
                    </label>
                    <FormField
                      errors={errors}
                      value={formValues?.location}
                      name={'location'}
                      type={'text'}
                      placeholder={'Enter your location'}
                      onChange={onInputChange}
                      className={className}
                      id={'location'}
                      disabled={true}
                    />
                  </div>
                </div>
                <hr className="border-t-2  border-gray-300 border-dotted dark:border-gray-600"></hr>
                {!isEditing && isUpdateAllowed && (
                  <div className="flex justify-between items-center p-4">
                    <button
                      type="submit"
                      className="
                        px-6 py-2.5
                        bg-linear-to-r from-indigo-600 to-violet-600
                        text-white font-semibold text-xs xl:text-base
                        rounded-xl
                        shadow-lg shadow-indigo-500/30
                        hover:enabled:shadow-xl hover:enabled:shadow-indigo-500/40
                        hover:enabled:from-indigo-700 hover:enabled:to-violet-700
                        transition-all duration-200
                        cursor-pointer disabled:text-gray-400 disabled:cursor-not-allowed
                    "
                      disabled={formDisabled}
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
                        <>Save Profile</>
                      )}
                    </button>

                    <button
                      type="reset"
                      id="reset"
                      className="
                    px-6 py-2.5
                bg-linear-to-r from-slate-600 to-violet-200
                text-white font-semibold text-xs xl:text-base
                rounded-xl
                shadow-lg shadow-indigo-500/30
                hover:shadow-xl hover:shadow-indigo-500/40
                hover:from-slate-300 hover:to-violet-200
                transition-all duration-200
                cursor-pointer
                "
                    >
                      Reset
                    </button>
                  </div>
                )}
                {isEditing && isUpdateAllowed && (
                  <div className="flex justify-between items-center p-4">
                    <button
                      type="submit"
                      id="edit"
                      className="
                          px-6 py-2.5
                        bg-linear-to-r from-indigo-600 to-violet-600
                        text-white font-semibold text-xs xl:text-base
                        rounded-xl
                        shadow-lg shadow-indigo-500/30
                        hover:shadow-xl hover:shadow-indigo-500/40
                        hover:from-indigo-700 hover:to-violet-700
                        transition-all duration-200
                        cursor-pointer
                        
                    "
                      disabled={formDisabled}
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
                        <>Edit Profile</>
                      )}
                    </button>
                  </div>
                )}
              </form>
            </div>
          ) : (
            <ErrorPage refetchAll={() => refetch?.()} />
          )}
        </div>
      ) : (
        <ProfileSettingSkeleton />
      )}
    </>
  );
}

export default ProfileSettings;
