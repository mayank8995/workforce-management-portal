/* eslint-disable @typescript-eslint/no-misused-promises */

import { useState, type SubmitEvent } from 'react';

import { TailSpin } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { validateField } from '../../../services/form-validation.service';
import { getApiErrorDetails } from '../../../services/utils.service';
import { className, labelclassName } from '../../../utils/constants';
import FormField from '../FormField';
import type { EmployeeFormType } from '../../../types/types';
import { createEmployee } from '../../../api/admin-portal.api';

function EmployeeForm({ onClose }: { onClose: () => void }) {
  const [formValues, setFormValues] = useState<EmployeeFormType>({
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

  const [projectForm, setProjectForm] = useState({
    projectName: '',
    status: '',
    riskStatus: '',
    priorityRanking: '',
  });

  const [projectErrors, setProjectErrors] = useState({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formDisabled, setFormDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [skillInput, setSkillInput] = useState('');

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;

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
    const { name, value } = e.target;

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
      const value = formValues?.[key];

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
    e.preventDefault();

    try {
      if (!checkFormValidity()) {
        return;
      }

      setIsLoading(true);
      setFormDisabled(true);

      const res = await createEmployee({
        ...formValues,
        yearsOfExperience: Number(formValues.yearsOfExperience),
        salary: Number(formValues.salary),
        rating: Number(formValues.rating),
        attendancePercentage: Number(formValues.attendancePercentage),
      });

      if (res.status === 200) {
        toast.success('Employee created successfully');
        // formReset();
        onClose?.();
      } else {
        toast.error(res?.data?.message);
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
      window.confirm(
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
    const skill = skillInput.trim();

    if (!skill) return;

    if (formValues.skills.includes(skill)) {
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
    const { name, value } = e.target;

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

    if (!projectForm.projectName.trim()) {
      newErrors.projectName = 'Project name is required';
    }

    if (!projectForm.status) {
      newErrors.status = 'Project status is required';
    }

    if (!projectForm.riskStatus) {
      newErrors.riskStatus = 'Risk status is required';
    }

    if (
      projectForm.priorityRanking === '' ||
      Number(projectForm.priorityRanking) < 0
    ) {
      newErrors.priorityRanking = 'Priority ranking must be a valid number';
    }

    if (Object.keys(newErrors).length > 0) {
      setProjectErrors(newErrors);
      return;
    }

    setFormValues((prevData) => ({
      ...prevData,
      projects: [
        ...prevData?.projects,
        {
          projectName: projectForm?.projectName?.trim(),
          status: projectForm?.status,
          riskStatus: projectForm?.riskStatus,
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
    <div
      className="p-3 sm:p-4
            w-full sm:w-115 md:w-125 lg:w-135
            h-full
            overflow-y-auto
            bg-white dark:bg-slate-900
            text-slate-900 dark:text-slate-100
            shadow-2xl
            fixed z-300 right-0 top-0"
    >
      <div className="p-2 xl:p-4 dark:bg-gray-800">
        <div className="mb-6">
          <h1 className="text-base xl:text-2xl font-bold text-slate-800 dark:text-slate-100">
            Create Employee
          </h1>

          <h2 className="text-xs xl:text-sm text-slate-500 mt-1 dark:text-slate-300">
            Add a new employee to the organization
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          onReset={formReset}
          className="bg-linear-to-br from-white to-indigo-50/40 rounded-2xl shadow-sm border border-slate-100 p-2 flex flex-col gap-3 hover:shadow-xl dark:bg-linear-to-br dark:from-slate-900 dark:to-purple-950/20 dark:border-none"
          noValidate
        >
          <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-indigo-500 rounded-full" />

              <h2 className="text-sm xl:text-base font-bold text-slate-800 dark:text-slate-100">
                Personal Information
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="mb-4 flex flex-col">
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
                />
              </div>
              <div className="mb-4 flex flex-col">
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
                />
              </div>

              <div className="mb-4 flex flex-col">
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

              <div className="mb-4 flex flex-col">
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
                />
              </div>
            </div>
          </div>

          <hr className="border-t-2 border-gray-300 border-dotted dark:border-gray-600" />

          <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-indigo-500 rounded-full" />

              <h2 className="text-sm xl:text-base font-bold text-slate-800 dark:text-slate-100">
                Employment Information
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="mb-4 flex flex-col">
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
                />
              </div>

              <div className="mb-4 flex flex-col">
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
                />
              </div>

              <div className="mb-4 flex flex-col">
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
                />
              </div>

              <div className="mb-4 flex flex-col">
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
                />
              </div>

              <div className="mb-4 flex flex-col">
                <label htmlFor="yearsOfExperience" className={labelclassName}>
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
                />
              </div>

              <div className="mb-4 flex flex-col">
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
                />
              </div>

              <div className="mb-4 flex flex-col">
                <label htmlFor="workMode" className={labelclassName}>
                  Work Mode
                </label>

                <select
                  id="workMode"
                  name="workMode"
                  value={formValues?.workMode}
                  onChange={onSelectChange}
                  className={className}
                >
                  <option value="">Select work mode</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Onsite">Onsite</option>
                </select>

                {errors?.workMode && (
                  <p className="text-xs text-red-500 mt-1">{errors.workMode}</p>
                )}
              </div>

              <div className="mb-4 flex flex-col">
                <label htmlFor="level" className={labelclassName}>
                  Level
                </label>

                <select
                  id="level"
                  name="level"
                  value={formValues?.level}
                  onChange={onSelectChange}
                  className={className}
                >
                  <option value="">Select level</option>
                  <option value="junior">Junior</option>
                  <option value="senior">Senior</option>
                  <option value="lead">Lead</option>
                  <option value="executive">Executive</option>
                </select>

                {errors?.level && (
                  <p className="text-xs text-red-500 mt-1">{errors.level}</p>
                )}
              </div>
            </div>
          </div>

          <hr className="border-t-2 border-gray-300 border-dotted dark:border-gray-600" />

          <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-indigo-500 rounded-full" />

              <h2 className="text-sm xl:text-base font-bold text-slate-800 dark:text-slate-100">
                Projects
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="mb-4 flex flex-col">
                <label htmlFor="projectName" className={labelclassName}>
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

              <div className="mb-4 flex flex-col">
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
                  <p className="text-xs text-red-500 mt-1">
                    {projectErrors.status}
                  </p>
                )}
              </div>

              <div className="mb-4 flex flex-col">
                <label htmlFor="riskStatus" className={labelclassName}>
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
                  <p className="text-xs text-red-500 mt-1">
                    {projectErrors.riskStatus}
                  </p>
                )}
              </div>

              <div className="mb-4 flex flex-col">
                <label htmlFor="priorityRanking" className={labelclassName}>
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

            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={addProject}
                className="
        px-5 py-2.5
        bg-linear-to-r from-indigo-600 to-violet-600
        text-white
        font-semibold
        text-xs xl:text-sm
        rounded-xl
        shadow-lg shadow-indigo-500/30
        hover:from-indigo-700
        hover:to-violet-700
        transition-all duration-200
        cursor-pointer
      "
              >
                + Add Project
              </button>
            </div>

            {formValues?.projects?.length > 0 && (
              <div className="mt-6 flex flex-col gap-3">
                {formValues?.projects.map((project, index) => (
                  <div
                    key={`${project?.projectName}-${index}`}
                    className="
            rounded-xl
            border
            border-slate-200
            bg-white
            p-4
            dark:bg-slate-900
            dark:border-slate-700
          "
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <span
                            className="
                  text-sm
                  font-bold
                  text-slate-800
                  dark:text-slate-100
                "
                          >
                            {project.projectName}
                          </span>

                          <span
                            className="
                  px-2 py-1
                  text-xs
                  rounded-full
                  bg-indigo-100
                  text-indigo-700
                  dark:bg-indigo-950
                  dark:text-indigo-300
                "
                          >
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

                      <button
                        type="button"
                        onClick={() => removeProject(index)}
                        className="
                text-xs
                font-semibold
                text-red-500
                hover:text-red-700
                cursor-pointer
              "
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <hr className="border-t-2 border-gray-300 border-dotted dark:border-gray-600" />

          <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-indigo-500 rounded-full" />

              <h2 className="text-sm xl:text-base font-bold text-slate-800 dark:text-slate-100">
                Compensation & Performance
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="mb-4 flex flex-col">
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
                />
              </div>

              <div className="mb-4 flex flex-col">
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
                />
              </div>

              <div className="mb-4 flex flex-col">
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
                />
              </div>

              <div className="mb-4 flex flex-col">
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
                >
                  <option value="">Select satisfaction</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>

                {errors?.employeeSatisfaction && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.employeeSatisfaction}
                  </p>
                )}
              </div>
            </div>
          </div>

          <hr className="border-t-2 border-gray-300 border-dotted dark:border-gray-600" />

          <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-indigo-500 rounded-full" />

              <h2 className="text-sm xl:text-base font-bold text-slate-800 dark:text-slate-100">
                Skills
              </h2>
            </div>

            <div className="flex gap-3">
              <FormField
                errors={errors}
                value={skillInput}
                name="skillInput"
                type="text"
                placeholder="Enter a skill"
                onChange={(e) => setSkillInput(e.target.value)}
                className={className}
                id="skillInput"
              />

              <button
                type="button"
                onClick={addSkill}
                className="
                  px-5
                  py-2
                  rounded-xl
                  bg-indigo-600
                  text-white
                  font-semibold
                  text-sm
                  hover:bg-indigo-700
                  transition
                  cursor-pointer
                "
              >
                Add
              </button>
            </div>

            {formValues.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {formValues.skills?.map((skill) => (
                  <div
                    key={skill}
                    className="
                      flex items-center gap-2
                      px-3 py-1.5
                      rounded-full
                      bg-indigo-100
                      text-indigo-700
                      text-xs
                      font-medium
                      dark:bg-indigo-950
                      dark:text-indigo-300
                    "
                  >
                    <span>{skill}</span>

                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="cursor-pointer hover:text-red-500"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <hr className="border-t-2 border-gray-300 border-dotted dark:border-gray-600" />

          <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-indigo-500 rounded-full" />

              <h2 className="text-sm xl:text-base font-bold text-slate-800 dark:text-slate-100">
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
              />

              <label
                htmlFor="onNoticePeriod"
                className="text-sm text-slate-700 dark:text-slate-200 cursor-pointer"
              >
                Employee is on notice period
              </label>
            </div>
          </div>

          <hr className="border-t-2 border-gray-300 border-dotted dark:border-gray-600" />

          <div className="flex justify-between items-center p-4">
            <button
              type="submit"
              disabled={formDisabled}
              className="
                px-6 py-2.5
                bg-linear-to-r from-indigo-600 to-violet-600
                text-white font-semibold text-xs xl:text-base
                rounded-xl
                shadow-lg shadow-indigo-500/30
                hover:enabled:shadow-xl
                hover:enabled:shadow-indigo-500/40
                hover:enabled:from-indigo-700
                hover:enabled:to-violet-700
                transition-all duration-200
                cursor-pointer
                disabled:text-gray-400
                disabled:cursor-not-allowed
              "
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
                disabled:cursor-not-allowed
              "
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;
