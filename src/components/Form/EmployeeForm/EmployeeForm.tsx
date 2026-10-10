/* eslint-disable @typescript-eslint/no-misused-promises */

import React, { useEffect, useState, type SubmitEvent } from 'react';

import { TailSpin } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { validateField } from '../../../services/form-validation.service';
import { getApiErrorDetails } from '../../../services/utils.service';
import {
  className,
  iconActive,
  labelclassName,
  VIEW_EMPLOYEE_SUB_TTILE,
  VIEW_EMPLOYEE_TTILE,
} from '../../../utils/constants';
import FormField from '../FormField';
import type {
  EmployeeFormType,
  Project,
  ProjectStatus,
  RiskStatus,
  TableQueryParams,
} from '../../../types/types';
import { createEmployee, editEmployee } from '../../../api/admin-portal.api';
import EmployeeFormSkeleton from './EmployeeFormSkeleton';
import ErrorPage from '../../Error/ErrorPage';
import { useQueryClient } from '@tanstack/react-query';
import { useEmployeeDetail } from '../../../api/tanstack.query';
import { useAuth } from '../../../context/AuthContext';
import { Upload, X } from 'lucide-react';
import FileUpload from '../../FileUpload/FileUpload';
import { useModal } from '../../../context/ModalContext';

function EmployeeForm({
  onClose,
  _id,
  title,
  subtitle,
  tableQueryParams,
}: {
  onClose: () => void;
  _id: string;
  title: string;
  subtitle: string;
  tableQueryParams: TableQueryParams;
}) {
  const {
    data: details,
    isError,
    isLoading: isDataLoading,
    refetch: refetchDetails,
  } = useEmployeeDetail({ _id });
  const queryClient = useQueryClient();
  const row = details?.['data']?.data?.result ?? [];

  const { can } = useAuth();
  const { openModal } = useModal();

  const isUpdateAllowed = can('employee', 'update');

  const [formValues, setFormValues] = useState<EmployeeFormType>({
    name: '',
    empId: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    manager: '',
    joiningDate: '',
    yearsOfExperience: 0,
    salary: 0,
    location: '',
    workMode: '',
    rating: 1,
    attendancePercentage: 0,
    employeeSatisfaction: '',
    onNoticePeriod: false,
    level: '',
    skills: [],
    projects: [],
  });

  const [projectForm, setProjectForm] = useState({
    projectName: '',
    status: '',
    riskStatus: '',
    priorityRanking: '',
  });

  const [projectErrors, setProjectErrors] = useState<Record<string, string>>(
    {}
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formDisabled, setFormDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (row && Object.keys(row)?.length > 0) {
      setFormValues(row as EmployeeFormType);
      setIsEditing(true);
    }
  }, [row]);

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e?.target;

    const fieldValue = type === 'checkbox' ? checked : value;
    setFormValues((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));

    if (type !== 'checkbox') {
      const msg = validateField(name, value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: msg,
      }));
    }
  }

  function onSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = e?.target;

    setFormValues((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const msg = validateField(name, value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: msg,
    }));
  }

  function checkFormValidity() {
    let valid = true;

    const requiredFields = [
      'name',
      'email',
      'phone',
      'department',
      'designation',
      'manager',
      'joiningDate',
      'yearsOfExperience',
      'salary',
      'location',
      'workMode',
      'rating',
      'attendancePercentage',
      'employeeSatisfaction',
      'level',
    ];

    for (const key of requiredFields) {
      const value = formValues?.[key as keyof EmployeeFormType];

      const msg = validateField(key, value);

      if (msg) {
        valid = false;
      }

      setErrors((prevErrors) => ({
        ...prevErrors,
        [key]: msg,
      }));
    }

    return valid;
  }

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e?.preventDefault();

    try {
      if (!checkFormValidity()) {
        return;
      }

      setIsLoading(true);
      setFormDisabled(true);

      if (!isEditing) {
        const res = await createEmployee({
          ...formValues,
          yearsOfExperience: Number(formValues?.yearsOfExperience),
          salary: Number(formValues?.salary),
          rating: Number(formValues?.rating),
          attendancePercentage: Number(formValues?.attendancePercentage),
        });
        if (res?.status === 200) {
          toast.success('Employee created successfully');
          // formReset();
          onClose?.();
        } else {
          toast.error(res?.data?.message);
        }
        setIsLoading(false);
      } else {
        const res = await editEmployee(
          {
            ...formValues,
            yearsOfExperience: Number(formValues?.yearsOfExperience),
            salary: Number(formValues?.salary),
            rating: Number(formValues?.rating),
            attendancePercentage: Number(formValues?.attendancePercentage),
          },
          {
            _id: _id ?? '',
            type: tableQueryParams?.tableType ?? 'employees',
          }
        );
        if (res?.status === 200) {
          queryClient.invalidateQueries({
            queryKey: ['employees'],
          });
          toast.success('Employee edited successfully');
          // formReset();
          onClose?.();
        } else {
          toast.error(res?.data?.message);
        }
        setIsLoading(false);
      }
    } catch (err) {
      const { message } = getApiErrorDetails(err);

      toast.error(message);
      console.error('CREATE EMPLOYEE FAILED', err);
    } finally {
      setIsLoading(false);
      setFormDisabled(false);
    }
  }

  function formReset() {
    if (
      window?.confirm(
        'Are you sure you want to reset? All entered data will be lost.'
      )
    ) {
      setFormValues({
        name: '',
        email: '',
        phone: '',
        department: '',
        designation: '',
        manager: '',
        joiningDate: '',
        yearsOfExperience: 0,
        salary: 0,
        location: '',
        workMode: '',
        rating: 1,
        attendancePercentage: 0,
        employeeSatisfaction: '',
        onNoticePeriod: false,
        level: '',
        skills: [],
        projects: [],
      });

      setSkillInput('');
      setErrors({});
    }
  }

  function addSkill() {
    const skill = skillInput?.trim();

    if (!skill) return;

    if (formValues?.skills?.includes(skill)) {
      toast.error('Skill already added');
      return;
    }

    setFormValues((prevData) => ({
      ...prevData,
      skills: [...prevData?.skills, skill],
    }));

    setSkillInput('');
  }

  function removeSkill(skillToRemove: string) {
    setFormValues((prevData) => ({
      ...prevData,
      skills: prevData?.skills?.filter((skill) => skill !== skillToRemove),
    }));
  }
  function onProjectInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e?.target;

    setProjectForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setProjectErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  }
  function addProject() {
    const newErrors: Record<string, string> = {};

    if (!projectForm?.projectName?.trim()) {
      newErrors.projectName = 'Project name is required';
    }

    if (!projectForm?.status) {
      newErrors.status = 'Project status is required';
    }

    if (!projectForm?.riskStatus) {
      newErrors.riskStatus = 'Risk status is required';
    }

    if (
      projectForm?.priorityRanking === '' ||
      Number(projectForm?.priorityRanking) < 0
    ) {
      newErrors.priorityRanking = 'Priority ranking must be a valid number';
    }

    if (Object.keys(newErrors)?.length > 0) {
      setProjectErrors(newErrors);
      return;
    }

    setFormValues((prevData: EmployeeFormType & { projects: Project[] }) => ({
      ...prevData,
      projects: [
        ...prevData?.projects,
        {
          projectName: projectForm?.projectName?.trim(),
          status: projectForm?.status as ProjectStatus,
          riskStatus: projectForm?.riskStatus as RiskStatus,
          priorityRanking: Number(projectForm?.priorityRanking),
        },
      ],
    }));

    // clear project form after adding
    setProjectForm({
      projectName: '',
      status: '',
      riskStatus: '',
      priorityRanking: '',
    });

    setProjectErrors({});
  }
  function removeProject(index: number) {
    setFormValues((prevData) => ({
      ...prevData,
      projects: prevData?.projects?.filter(
        (_, projectIndex) => projectIndex !== index
      ),
    }));
  }

  return (
    <>
      {!isDataLoading ? (
        <div
          className="p-4 sm:p-5
            w-full sm:w-115 md:w-125 lg:w-135
            h-full
            overflow-y-auto
            bg-white dark:bg-slate-900
            text-slate-900 dark:text-slate-100
            shadow-2xl border-l border-slate-200 dark:border-slate-800
            fixed z-300 right-0 top-0"
        >
          {!isError ? (
            <div>
              <div className="mb-5 flex justify-between items-start gap-3">
                <div className="min-w-0">
                  <h1 className="text-base xl:text-xl font-semibold text-slate-800 dark:text-slate-100 truncate">
                    {!isUpdateAllowed ? VIEW_EMPLOYEE_TTILE : title}
                  </h1>
                  <h2 className="text-xs xl:text-sm text-slate-500 mt-0.5 dark:text-slate-400">
                    {!isUpdateAllowed ? VIEW_EMPLOYEE_SUB_TTILE : subtitle}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg cursor-pointer transition-colors text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                >
                  <X width={18} height={18} />
                </button>
              </div>
              <button
                type="button"
                className="cursor-pointer flex items-center justify-end"
                onClick={() => {
                  openModal(FileUpload);
                }}
              >
                <span>Upload documents</span>
                <Upload size={24} className={iconActive} />
              </button>

              <form
                onSubmit={handleSubmit}
                onReset={formReset}
                className="rounded-2xl border border-slate-200 bg-white flex flex-col dark:border-slate-800 dark:bg-slate-900/60"
                noValidate
              >
                <fieldset disabled={!isUpdateAllowed}>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-4 bg-indigo-500 rounded-full shrink-0" />
                      <h2 className="text-sm xl:text-base font-semibold text-slate-800 dark:text-slate-100">
                        Personal Information
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label htmlFor="name" className={labelclassName}>
                          Name
                        </label>
                        <FormField
                          errors={errors}
                          value={formValues?.name}
                          name="name"
                          type="text"
                          placeholder="Enter employee name"
                          onChange={onInputChange}
                          className={className}
                          id="name"
                          disabled={!isUpdateAllowed}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="email" className={labelclassName}>
                          Email
                        </label>
                        <FormField
                          errors={errors}
                          value={formValues?.email}
                          name="email"
                          type="email"
                          placeholder="Enter employee email"
                          onChange={onInputChange}
                          className={className}
                          id="email"
                          disabled={isEditing || !isUpdateAllowed}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="empId" className={labelclassName}>
                          Employee ID
                        </label>
                        <FormField
                          errors={errors}
                          value={formValues?.empId}
                          name="empId"
                          type="text"
                          placeholder="Auto generated"
                          onChange={onInputChange}
                          className={className}
                          id="empId"
                          disabled={true}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="phone" className={labelclassName}>
                          Phone Number
                        </label>
                        <FormField
                          errors={errors}
                          value={formValues?.phone}
                          name="phone"
                          type="text"
                          placeholder="Enter phone number"
                          onChange={onInputChange}
                          className={className}
                          id="phone"
                          maxlength={15}
                          disabled={!isUpdateAllowed}
                        />
                      </div>
                    </div>
                  </div>

                  <hr className="border-t border-slate-200 dark:border-slate-800" />

                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-4 bg-indigo-500 rounded-full shrink-0" />
                      <h2 className="text-sm xl:text-base font-semibold text-slate-800 dark:text-slate-100">
                        Employment Information
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label htmlFor="department" className={labelclassName}>
                          Department
                        </label>
                        <FormField
                          errors={errors}
                          value={formValues?.department}
                          name="department"
                          type="text"
                          placeholder="Enter department"
                          onChange={onInputChange}
                          className={className}
                          id="department"
                          disabled={!isUpdateAllowed}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="designation" className={labelclassName}>
                          Designation
                        </label>
                        <FormField
                          errors={errors}
                          value={formValues?.designation}
                          name="designation"
                          type="text"
                          placeholder="Enter designation"
                          onChange={onInputChange}
                          className={className}
                          id="designation"
                          disabled={!isUpdateAllowed}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="manager" className={labelclassName}>
                          Manager
                        </label>
                        <FormField
                          errors={errors}
                          value={formValues?.manager}
                          name="manager"
                          type="text"
                          placeholder="Enter manager name"
                          onChange={onInputChange}
                          className={className}
                          id="manager"
                          disabled={!isUpdateAllowed}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="joiningDate" className={labelclassName}>
                          Joining Date
                        </label>
                        <FormField
                          errors={errors}
                          value={formValues?.joiningDate}
                          name="joiningDate"
                          type="date"
                          placeholder="Select joining date"
                          onChange={onInputChange}
                          className={className}
                          id="joiningDate"
                          disabled={isEditing || !isUpdateAllowed}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="yearsOfExperience"
                          className={labelclassName}
                        >
                          Years of Experience
                        </label>
                        <FormField
                          errors={errors}
                          value={formValues?.yearsOfExperience}
                          name="yearsOfExperience"
                          type="number"
                          placeholder="Enter years of experience"
                          onChange={onInputChange}
                          className={className}
                          id="yearsOfExperience"
                          disabled={!isUpdateAllowed}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="location" className={labelclassName}>
                          Location
                        </label>
                        <FormField
                          errors={errors}
                          value={formValues?.location}
                          name="location"
                          type="text"
                          placeholder="Enter location"
                          onChange={onInputChange}
                          className={className}
                          id="location"
                          disabled={!isUpdateAllowed}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="workMode" className={labelclassName}>
                          Work Mode
                        </label>
                        <select
                          id="workMode"
                          name="workMode"
                          value={formValues?.workMode}
                          onChange={onSelectChange}
                          className={className}
                          disabled={!isUpdateAllowed}
                        >
                          <option value="">Select work mode</option>
                          <option value="Remote">Remote</option>
                          <option value="Hybrid">Hybrid</option>
                          <option value="Onsite">Onsite</option>
                        </select>
                        {errors?.workMode && (
                          <p className="text-xs text-red-600 mt-1 dark:text-red-400">
                            {errors.workMode}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="level" className={labelclassName}>
                          Level
                        </label>
                        <select
                          id="level"
                          name="level"
                          value={formValues?.level}
                          onChange={onSelectChange}
                          className={className}
                          disabled={!isUpdateAllowed}
                        >
                          <option value="">Select level</option>
                          <option value="junior">Junior</option>
                          <option value="senior">Senior</option>
                          <option value="lead">Lead</option>
                          <option value="executive">Executive</option>
                        </select>
                        {errors?.level && (
                          <p className="text-xs text-red-600 mt-1 dark:text-red-400">
                            {errors.level}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <hr className="border-t border-slate-200 dark:border-slate-800" />

                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-4 bg-indigo-500 rounded-full shrink-0" />
                      <h2 className="text-sm xl:text-base font-semibold text-slate-800 dark:text-slate-100">
                        Projects
                      </h2>
                    </div>

                    {isUpdateAllowed && (
                      <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col">
                            <label
                              htmlFor="projectName"
                              className={labelclassName}
                            >
                              Project Name
                            </label>
                            <FormField
                              errors={projectErrors}
                              value={projectForm.projectName}
                              name="projectName"
                              type="text"
                              placeholder="Enter project name"
                              onChange={onProjectInputChange}
                              className={className}
                              id="projectName"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label htmlFor="status" className={labelclassName}>
                              Status
                            </label>
                            <select
                              id="status"
                              name="status"
                              value={projectForm.status}
                              onChange={onProjectInputChange}
                              className={className}
                            >
                              <option value="">Select status</option>
                              <option value="Active">Active</option>
                              <option value="Completed">Completed</option>
                              <option value="On Hold">On Hold</option>
                              <option value="Cancelled">Cancelled</option>
                              <option value="Support">Support</option>
                            </select>
                            {projectErrors?.status && (
                              <p className="text-xs text-red-600 mt-1 dark:text-red-400">
                                {projectErrors.status}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <label
                              htmlFor="riskStatus"
                              className={labelclassName}
                            >
                              Risk Status
                            </label>
                            <select
                              id="riskStatus"
                              name="riskStatus"
                              value={projectForm.riskStatus}
                              onChange={onProjectInputChange}
                              className={className}
                            >
                              <option value="">Select risk status</option>
                              <option value="On Track">On Track</option>
                              <option value="At Risk">At Risk</option>
                              <option value="Critical">Critical</option>
                            </select>
                            {projectErrors?.riskStatus && (
                              <p className="text-xs text-red-600 mt-1 dark:text-red-400">
                                {projectErrors.riskStatus}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <label
                              htmlFor="priorityRanking"
                              className={labelclassName}
                            >
                              Priority Ranking
                            </label>
                            <FormField
                              errors={projectErrors}
                              value={projectForm.priorityRanking}
                              name="priorityRanking"
                              type="number"
                              placeholder="Enter priority ranking"
                              onChange={onProjectInputChange}
                              className={className}
                              id="priorityRanking"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end mt-4">
                          <button
                            type="button"
                            onClick={addProject}
                            className="px-4 py-2 bg-indigo-600 text-white font-medium text-xs xl:text-sm rounded-lg transition-colors duration-150 cursor-pointer hover:bg-indigo-700"
                          >
                            + Add Project
                          </button>
                        </div>
                      </>
                    )}

                    {formValues?.projects?.length > 0 && (
                      <div className="mt-4 flex flex-col gap-3">
                        {formValues?.projects.map((project, index) => (
                          <div
                            key={`${project?.projectName}-${index}`}
                            className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:bg-slate-800/40 dark:border-slate-800"
                          >
                            <div className="flex justify-between items-start gap-4">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-3 flex-wrap">
                                  <span className="text-sm font-medium text-slate-800 dark:text-slate-100">
                                    {project.projectName}
                                  </span>
                                  <span className="px-2 py-0.5 text-xs rounded-full bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-300 dark:ring-indigo-900">
                                    Priority #{project.priorityRanking}
                                  </span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                  <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                      Status
                                    </p>
                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                      {project.status}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                      Risk Status
                                    </p>
                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                      {project.riskStatus}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                      Priority
                                    </p>
                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                      {project.priorityRanking}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {isUpdateAllowed && (
                                <button
                                  type="button"
                                  onClick={() => removeProject(index)}
                                  className="shrink-0 text-xs font-medium text-red-600 transition-colors hover:text-red-700 cursor-pointer dark:text-red-400 dark:hover:text-red-300"
                                >
                                  Delete
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <hr className="border-t border-slate-200 dark:border-slate-800" />

                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-4 bg-indigo-500 rounded-full shrink-0" />
                      <h2 className="text-sm xl:text-base font-semibold text-slate-800 dark:text-slate-100">
                        Compensation & Performance
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label htmlFor="salary" className={labelclassName}>
                          Salary
                        </label>
                        <FormField
                          errors={errors}
                          value={formValues?.salary}
                          name="salary"
                          type="number"
                          placeholder="Enter salary"
                          onChange={onInputChange}
                          className={className}
                          id="salary"
                          disabled={!isUpdateAllowed}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="rating" className={labelclassName}>
                          Rating
                        </label>
                        <FormField
                          errors={errors}
                          value={formValues?.rating}
                          name="rating"
                          type="number"
                          placeholder="0 - 5"
                          onChange={onInputChange}
                          className={className}
                          id="rating"
                          disabled={!isUpdateAllowed}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="attendancePercentage"
                          className={labelclassName}
                        >
                          Attendance Percentage
                        </label>
                        <FormField
                          errors={errors}
                          value={formValues?.attendancePercentage}
                          name="attendancePercentage"
                          type="number"
                          placeholder="0 - 100"
                          onChange={onInputChange}
                          className={className}
                          id="attendancePercentage"
                          disabled={!isUpdateAllowed}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="employeeSatisfaction"
                          className={labelclassName}
                        >
                          Employee Satisfaction
                        </label>
                        <select
                          id="employeeSatisfaction"
                          name="employeeSatisfaction"
                          value={formValues?.employeeSatisfaction}
                          onChange={onSelectChange}
                          className={className}
                          disabled={!isUpdateAllowed}
                        >
                          <option value="">Select satisfaction</option>
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                        {errors?.employeeSatisfaction && (
                          <p className="text-xs text-red-600 mt-1 dark:text-red-400">
                            {errors?.employeeSatisfaction}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <hr className="border-t border-slate-200 dark:border-slate-800" />

                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-4 bg-indigo-500 rounded-full shrink-0" />
                      <h2 className="text-sm xl:text-base font-semibold text-slate-800 dark:text-slate-100">
                        Skills
                      </h2>
                    </div>

                    {isUpdateAllowed && (
                      <div className="flex gap-3">
                        <FormField
                          errors={errors}
                          value={skillInput}
                          name="skillInput"
                          type="text"
                          placeholder="Enter a skill"
                          onChange={(e) => setSkillInput(e?.target?.value)}
                          className={className}
                          id="skillInput"
                          disabled={!isUpdateAllowed}
                        />
                        <button
                          type="button"
                          onClick={addSkill}
                          className="shrink-0 px-4 py-2 bg-indigo-600 text-white font-medium text-xs xl:text-sm rounded-lg transition-colors duration-150 cursor-pointer hover:bg-indigo-700"
                        >
                          Add
                        </button>
                      </div>
                    )}

                    {formValues?.skills?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {formValues?.skills?.map((skill) => (
                          <div
                            key={skill}
                            className="flex items-center gap-1.5 pl-3 pr-2 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium ring-1 ring-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-300 dark:ring-indigo-900"
                          >
                            <span>{skill}</span>
                            <button
                              type="button"
                              onClick={() => removeSkill(skill)}
                              className="cursor-pointer text-indigo-400 transition-colors hover:text-red-500 disabled:cursor-not-allowed"
                              disabled={!isUpdateAllowed}
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <hr className="border-t border-slate-200 dark:border-slate-800" />

                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-4 bg-indigo-500 rounded-full shrink-0" />
                      <h2 className="text-sm xl:text-base font-semibold text-slate-800 dark:text-slate-100">
                        Employee Status
                      </h2>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        id="onNoticePeriod"
                        name="onNoticePeriod"
                        type="checkbox"
                        checked={formValues?.onNoticePeriod}
                        onChange={onInputChange}
                        className="w-4 h-4 accent-indigo-600 cursor-pointer"
                        disabled={!isUpdateAllowed}
                      />
                      <label
                        htmlFor="onNoticePeriod"
                        className="text-sm text-slate-700 dark:text-slate-300 cursor-pointer"
                      >
                        Employee is on notice period
                      </label>
                    </div>
                  </div>

                  <hr className="border-t border-slate-200 dark:border-slate-800" />

                  {isUpdateAllowed && (
                    <>
                      {!isEditing ? (
                        <div className="flex justify-between items-center gap-3 p-4">
                          <button
                            type="submit"
                            disabled={formDisabled}
                            className="px-5 py-2.5 bg-indigo-600 text-white font-medium text-xs xl:text-sm rounded-lg transition-colors duration-150 cursor-pointer hover:enabled:bg-indigo-700 disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed dark:disabled:bg-slate-800 dark:disabled:text-slate-600"
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
                              <>Create Employee</>
                            )}
                          </button>

                          <button
                            type="reset"
                            id="reset"
                            disabled={formDisabled}
                            className="px-5 py-2.5 border border-slate-300 text-slate-700 font-medium text-xs xl:text-sm rounded-lg transition-colors duration-150 cursor-pointer hover:enabled:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-700 dark:text-slate-300 dark:hover:enabled:bg-slate-800"
                          >
                            Reset
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center p-4">
                          <button
                            type="submit"
                            id="edit"
                            className="px-5 py-2.5 bg-indigo-600 text-white font-medium text-xs xl:text-sm rounded-lg transition-colors duration-150 cursor-pointer hover:enabled:bg-indigo-700 disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed dark:disabled:bg-slate-800 dark:disabled:text-slate-600"
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
                              <>Edit Employee</>
                            )}
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </fieldset>
              </form>
            </div>
          ) : (
            <ErrorPage refetchAll={refetchDetails} />
          )}
        </div>
      ) : (
        <EmployeeFormSkeleton />
      )}
    </>
  );
}

export default React.memo(EmployeeForm);
