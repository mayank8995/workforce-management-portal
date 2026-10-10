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
import { PROFILE_SUBHEAD, SIDE_BAR_ITEMS } from '../../utils/constants';
import type { LoginProfile, ProfileForm } from '../../types/types';
import {
  editProfileData,
  postSubmitProfileSettings,
} from '../../api/admin-portal.api';
import { validateField } from '../../services/form-validation.service';
import { TailSpin } from 'react-loader-spinner';
import { toast, type ToastContent } from 'react-toastify';
import { getApiErrorDetails } from '../../services/utils.service';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import ProfileSettingSkeleton from '../../components/Skeleton/ProfileSettingSkeleton';
import {
  avatar,
  button,
  card,
  cx,
  form,
  palette,
  section,
  shell,
  text,
} from '../../theme/theme';
import ErrorPage from '../../components/Error/ErrorPage';
import { useProfileData } from '../../api/tanstack.query';
import { Pencil } from 'lucide-react';

function ProfileSettings() {
  const { user, can } = useAuth();
  const {
    data: profileData,
    isLoading: isFormDataLoading,
    isError,
    refetch,
  } = useProfileData(user as LoginProfile);
  const isUpdateAllowed = can('settings', 'update');
  const isCreateAllowed = can('settings', 'create');
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
        <div className="w-full">
          {!isError ? (
            <div className="p-3 xl:p-4">
              <div className="mb-5">
                <h1 className={shell.pageTitle}>{SIDE_BAR_ITEMS.SETTINGS}</h1>
                <h2 className={shell.pageSubtitle}>{PROFILE_SUBHEAD}</h2>
              </div>
              <form
                onSubmit={handleSubmit}
                onReset={formReset}
                className={cx(card.base, 'rounded-2xl flex flex-col')}
                noValidate
              >
                <fieldset disabled={!isUpdateAllowed}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 p-4 gap-4 xl:gap-6">
                    <div className={cx(card.muted, 'p-6 h-full')}>
                      <div className={section.heading}>
                        <div className={section.accent} />
                        <h2 className={section.title}>Avatar</h2>
                      </div>

                      <div className="flex flex-col items-center justify-center gap-4">
                        <div className="relative">
                          <div
                            className={cx(
                              avatar.frame,
                              'w-28 h-28 xl:w-32 xl:h-32 ring-4 ring-surface'
                            )}
                          >
                            <img
                              loading="eager"
                              src={
                                formValues?.image ||
                                '/assets/avatar_fallback.svg'
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
                            disabled={!isUpdateAllowed}
                            className={cx(
                              !isUpdateAllowed
                                ? 'disabled:bg-skeleton disabled:text-ink-subtle disabled:cursor-not-allowed'
                                : 'cursor-pointer hover:bg-brand-700',
                              'absolute bottom-0 right-0 w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center ring-2 ring-surface transition-colors duration-150'
                            )}
                          >
                            <Pencil size={14} />
                          </button>
                        </div>
                        {formValues?.name && (
                          <div className="text-center min-w-0 max-w-full">
                            <p
                              className={cx(
                                text.primary,
                                'font-medium text-sm xl:text-base truncate'
                              )}
                            >
                              {formValues?.name}
                            </p>
                            <p className={cx(text.muted, 'text-xs truncate')}>
                              {formValues?.designation}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className={section.heading}>
                        <div className={section.accent} />
                        <h2 className={section.title}>Personal Information</h2>
                      </div>
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col">
                          <label htmlFor="name" className={form.label}>
                            Name
                          </label>
                          <FormField
                            errors={errors}
                            value={formValues?.name}
                            name={'name'}
                            type={'text'}
                            placeholder={'Enter your name'}
                            onChange={onInputChange}
                            className={form.input}
                            id={'name'}
                            disabled={!isUpdateAllowed}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="phone" className={form.label}>
                            Phone Number
                          </label>
                          <FormField
                            errors={errors}
                            value={formValues?.phone}
                            name={'phone'}
                            type={'text'}
                            placeholder={'Enter your phone number'}
                            onChange={onInputChange}
                            className={form.input}
                            id={'phone'}
                            disabled={!isUpdateAllowed}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="email" className={form.label}>
                            Email
                          </label>
                          <FormField
                            errors={errors}
                            value={formValues?.email}
                            name={'email'}
                            type={'email'}
                            placeholder={'Enter your email'}
                            onChange={onInputChange}
                            className={form.input}
                            id={'email'}
                            disabled={true}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="department" className={form.label}>
                            Department
                          </label>
                          <FormField
                            errors={errors}
                            value={formValues?.department}
                            name={'department'}
                            type={'text'}
                            placeholder={'Enter your department'}
                            onChange={onInputChange}
                            className={form.input}
                            id={'department'}
                            disabled={true}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="designation" className={form.label}>
                            Designation
                          </label>
                          <FormField
                            errors={errors}
                            value={formValues?.designation}
                            name={'designation'}
                            type={'text'}
                            placeholder={'Enter your designation'}
                            onChange={onInputChange}
                            className={form.input}
                            id={'designation'}
                            disabled={true}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr className={section.divider} />

                  <div className="p-4">
                    <div className={section.heading}>
                      <div className={section.accent} />
                      <h2 className={section.title}>Account Information</h2>
                    </div>
                    <div className={form.grid}>
                      <div className="flex flex-col">
                        <label htmlFor="empId" className={form.label}>
                          Employee ID
                        </label>
                        <FormField
                          errors={errors}
                          value={formValues?.empId}
                          name={'empId'}
                          type={'text'}
                          placeholder={'Enter your ID'}
                          onChange={onInputChange}
                          className={form.input}
                          id={'empId'}
                          disabled={true}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="joiningDate" className={form.label}>
                          Joining Date
                        </label>
                        <FormField
                          errors={errors}
                          value={formValues?.joiningDate}
                          name={'joiningDate'}
                          type={'date'}
                          placeholder={'Enter your joining date'}
                          onChange={onInputChange}
                          className={form.input}
                          id={'joiningDate'}
                          disabled={true}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="workMode" className={form.label}>
                          Work Mode
                        </label>
                        <FormField
                          errors={errors}
                          value={formValues?.workMode}
                          name={'workMode'}
                          type={'text'}
                          placeholder={'Hybrid/Remote/Onsite'}
                          onChange={onInputChange}
                          className={form.input}
                          id={'workMode'}
                          disabled={true}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="location" className={form.label}>
                          Location
                        </label>
                        <FormField
                          errors={errors}
                          value={formValues?.location}
                          name={'location'}
                          type={'text'}
                          placeholder={'Enter your location'}
                          onChange={onInputChange}
                          className={form.input}
                          id={'location'}
                          disabled={true}
                        />
                      </div>
                    </div>
                  </div>

                  <hr className={section.divider} />

                  {!isEditing && (
                    <div className="flex justify-between items-center gap-3 p-4">
                      <button
                        type="submit"
                        className={`${button.primary} min-w-36`}
                        disabled={!isCreateAllowed}
                      >
                        {isLoading ? (
                          <TailSpin
                            visible={true}
                            height={20}
                            color={palette.white}
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
                        className={button.secondary}
                        disabled={!isCreateAllowed}
                      >
                        Reset
                      </button>
                    </div>
                  )}
                  {isEditing && (
                    <div className="flex justify-between items-center p-4">
                      <button
                        type="submit"
                        id="edit"
                        className={`${button.primary} min-w-36`}
                        disabled={!isUpdateAllowed}
                      >
                        {isLoading ? (
                          <TailSpin
                            visible={true}
                            height={20}
                            color={palette.white}
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
                </fieldset>
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
