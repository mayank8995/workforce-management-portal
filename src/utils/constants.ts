import { BarChart3, FolderKanban, ShieldCheck, Users } from 'lucide-react';
import {
  columns_promotedThisYear,
  columns_requiringReview,
  columns_top_performers,
  columns_top_projects,
} from '../components/EditableTable/CustomCellRenderer';
import {
  validateFormOne,
  validateFormTwo,
} from '../services/form-validation.service';
import type {
  Employee,
  EmployeeRequiringReview,
  PromotedEmployee,
  TableHeader,
  TopPerformer,
  TopProject,
} from '../types/types';
import { getEnv } from '../config/env';

export const KEY_TRACK_METRIC = {
  TOTAL_EMPLOYEES: 'Total Employees',
  ATTRITION_RATE: 'Attrition Rate',
  PROFIT_MARGIN: 'Profit Margin',
  REVENUE_IN_QR_CR: 'Revenue in this quarter',
  REVENUE_IN_THIS_MONTH: 'Revenue in this month',
  TOTAL_PROJECTS: 'Total Projects',
} as const;
export const KEY_TRACK_METRIC_ICON = {
  STAR: 'STAR',
  USER: 'USER',
  MONITER_CHECK: 'MONITER_CHECK',
  FLAG: 'FLAG',
  USER_MINUS: 'USER_MINUS',
  INDIAN_RUPEE: 'INDIAN_RUPEE',
  CIRCLE_PERCENT: 'CIRCLE_PERCENT',
  FOLDER_DOT: 'FOLDER_DOT',
};
export const gradients = [
  'bg-gradient-to-br from-pink-400 to-rose-500',
  'bg-gradient-to-br from-indigo-400 to-violet-500',
  'bg-gradient-to-br from-emerald-400 to-teal-500',
  'bg-gradient-to-br from-amber-400 to-orange-500',
  'bg-gradient-to-br from-sky-400 to-blue-500',
];

export const bgColors = [
  'bg-purple-500',
  'bg-violet-500',
  'bg-teal-500',
  'bg-orange-500',
  'bg-blue-500',
];

export const TOP_PROJECTS = 'Top Projects';
export const ATTRITION_INSIGHTS = 'Attrition Insights';
export const DEPARTMENT_WISE_HEADCOUNT = 'Department-wise Headcount';
export const PIE_COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#8884d8',
];
export const REVENUE_TREND_IN_CR = 'Revenue Trend (₹ Cr)';
export const REVENUE_IN_THIS_MONTH = 'Revenue Trend (₹ Cr)';
export const SKILLS_IN_DEMAND = 'Skils in Demand';
export const TOP_CLIENTS = 'Top clients';
export const TOP_PERFORMERS = 'Top performers';
export const PROMOTED_THIS_YEAR = 'PROMOTED_THIS_Year';
export const EMPLOYEE_DIREC = 'Employee Directory';
export const TOTAL_PROJECTS = 'Total Projects';

export const NAV_ITEMS = {
  DASHBOARD: '/home/dashboard',
  ANALYTICS: '/home/analytics',
  EMPLOYEES: '/home/employee',
  SETTINGS: '/home/settings',
  LOGOUT: '/',
  HOME_PAGE: '/',
};

export const SIDE_BAR_ITEMS = {
  DASHBOARD: 'Dashboard',
  ANALYTICS: 'Analytics',
  EMPLOYEES: 'Employees',
  SETTINGS: 'Profile Settings',
  LOGOUT: 'Logout',
};

export const RISK_STATUS = {
  ON_TRACK: 'On Track',
  COMPLETED: 'Completed',
  AT_RISK: 'At Risk',
};

export const PROJECT_DETAILS = {
  MANAGER: 'Project Lead',
};

export const className_ = `w-full
px-4
py-3
mb-2
rounded-xl
border
border-slate-300
bg-white
text-base
font-medium
text-slate-800
placeholder:text-slate-400
placeholder:font-normal
focus:border-blue-500
focus:ring-4
focus:ring-blue-100
outline-none
transition-all
duration-200`;

export const loginClassName = `w-full
rounded-lg
px-3
py-2.5
text-sm

bg-slate-50
border border-slate-200
text-slate-900
placeholder:text-slate-400

dark:bg-[#0f0a1f]
dark:border-white/10
dark:text-slate-200
dark:placeholder:text-slate-500

focus:outline-none
focus:ring-2
focus:ring-[#534ab7]
focus:border-transparent
focus:transition-all
focus:duration-200
  `;

export const className = `w-full
rounded-lg
px-3
py-2.5
text-sm

bg-slate-50
border border-slate-200
text-slate-900
placeholder:text-slate-400

dark:bg-[#0f0a1f]
dark:border-white/10
dark:text-slate-200
dark:placeholder:text-slate-500

focus:outline-none
focus:ring-2
focus:ring-[#534ab7]
focus:border-transparent
focus:transition-all
focus:duration-200`;

export const selectDropDownClass = `cursor-pointer
            px-2 py-1
            border
            border-slate-300 dark:border-slate-700
            rounded-lg
            bg-white dark:bg-slate-800
            text-sm
            shadow-sm
            focus:ring-2
            focus:ring-blue-500 dark:text-slate-300
            dark:outline-none dark:focus:outline-none`;
export const selectOptionsClass = `text-sm font-bold outline-none`;

export const labelclassName = `block mb-1.5 text-slate-500 dark:text-slate-400 text-xs font-medium`;

export const loginLabelclassNAme = `block mb-1.5 mt-1.5 text-slate-600 dark:text-slate-400 text-xs font-medium tracking-wide uppercase`;

export const PROFILE_SUBHEAD =
  'Manage your personal information and account details';

export const VIEW_MORE = 'View More';

export const headers_top_projects: TableHeader<TopProject>[] = [
  { key: 'name', value: 'Manager' },
  { key: 'projectName', value: 'Project Name' },
  { key: 'riskStatus', value: 'Risk Status' },
  { key: 'status', value: 'Project Status' },
];

export const headers_top_performers: TableHeader<TopPerformer>[] = [
  { key: '_id', value: 'Id', metadata: { show: false } },
  { key: 'name', value: 'Name' },
  { key: 'designation', value: 'Designation' },
  { key: 'department', value: 'Department' },
  { key: 'rating', value: 'Rating' },
];

export const headers_promotedThisYear: TableHeader<PromotedEmployee>[] = [
  { key: '_id', value: 'Id', metadata: { show: false } },
  { key: 'name', value: 'Name' },
  { key: 'currentDesignation', value: 'Current Designation' },
  { key: 'previousDesignation', value: 'Previous Designation' },
  { key: 'department', value: 'Department' },
  { key: 'promotedOn', value: 'Promoted On' },
];

export const headers_requiringReview: TableHeader<EmployeeRequiringReview>[] = [
  { key: '_id', value: 'Id', metadata: { show: false } },
  { key: 'name', value: 'Name' },
  { key: 'designation', value: 'Designation' },
  { key: 'department', value: 'Department' },
  { key: 'reviewReason', value: 'Review Reason' },
  { key: 'rating', value: 'Rating' },
];

export const headers_employees: TableHeader<Employee>[] = [
  { key: '_id', value: 'Id', metadata: { show: false } },
  { key: 'name', value: 'Name' },
  { key: 'designation', value: 'Designation' },
  { key: 'department', value: 'Department' },
  { key: 'yearsOfExperience', value: 'Years of Experience' },
  { key: 'location', value: 'Location' },
  { key: 'workMode', value: 'Work Mode' },
  { key: 'rating', value: 'Rating' },
];

export const CARD_CONTENT_LIMIT_TO_SCROLL = 5;

export const VIEW_MORE_ROUTES = {
  top_projects: 'topProjects',
  top_performers: 'topPerformers',
  promotedThisYear: 'promotedThisYear',
  requiringReview: 'requiringReview',
  employees: 'employees',
};

export const VIEW_MORE_ROUTES_VALUES = {
  top_projects: 'Top Projects',
  top_performers: 'Top Performers',
  promotedThisYear: 'Promoted This Year',
  requiringReview: 'Requiring Review',
  employees: 'Employees',
};

export type HeadersType =
  | TableHeader<Employee>
  | TableHeader<TopPerformer>
  | TableHeader<TopProject>
  | TableHeader<PromotedEmployee>
  | TableHeader<EmployeeRequiringReview>;
export const ADMIN_PORTAL = 'Admin Portal';

export const NO_RESULT_FOUND = 'No match found';

// map step index -> its slice key + validator
export const stepConfig = [
  { key: 'formOne' as const, validate: validateFormOne },
  { key: 'formTwo' as const, validate: validateFormTwo },
];

export const MSG_404 = 'Endpoint not found';

export const headers_filters_top_projects = [
  { key: 'projectName', value: 'PROJECT NAME' },
  { key: 'riskStatus', value: 'RISK STATUS' },
  { key: 'status', value: 'STATUS' },
];
export const headers_filters_top_performers = [
  { key: 'designation', value: 'DESIGNATION' },
  { key: 'department', value: 'DEPARTMENT' },
];

export const headers_filters_promotedThisYear = [
  { key: 'currentDesignation', value: 'DESIGNATION' },
  { key: 'previousDesignation', value: 'PREV DESIGNATION' },
  { key: 'department', value: 'DEPARTMENT' },
];

export const headers_filters_requiringReview = [
  { key: 'designation', value: 'DESIGNATION' },
  { key: 'department', value: 'DEPARTMENT' },
  { key: 'reviewReason', value: 'REVIEW REASON' },
];

export const CORRESPONDING_FILTER_TABLE_KEY_NAME = {
  department: 'DEPARTMENT',
  designation: 'DESIGNATION',
  location: 'LOCATION',
  workMode: 'WORK MODE',
  employeeSatisfaction: 'EMPLOYEE SATISFACTION',
  reviewReason: 'REVIEW REASON',
  currentDesignation: 'DESIGNATION',
  previousDesignation: 'PREV DESIGNATION',
  projectName: 'PROJECT NAME',
  riskStatus: 'RISK STATUS',
  status: 'PROJECT STATUS',
};

export const TABLE_CONFIG = {
  [VIEW_MORE_ROUTES.top_projects]: {
    headers: headers_top_projects,
    columns: columns_top_projects,
    title: TOP_PROJECTS,
    tableType: VIEW_MORE_ROUTES.top_projects,
  },
  [VIEW_MORE_ROUTES.top_performers]: {
    headers: headers_top_performers,
    columns: columns_top_performers,
    title: '',
    tableType: VIEW_MORE_ROUTES.top_performers,
  },
  [VIEW_MORE_ROUTES.promotedThisYear]: {
    headers: headers_promotedThisYear,
    columns: columns_promotedThisYear,
    title: '',
    tableType: VIEW_MORE_ROUTES.promotedThisYear,
  },
  [VIEW_MORE_ROUTES.requiringReview]: {
    headers: headers_requiringReview,
    columns: columns_requiringReview,
    title: '',
    tableType: VIEW_MORE_ROUTES.requiringReview,
  },
  // [VIEW_MORE_ROUTES.employees]: {
  //   headers: headers_employees,
  //   columns: columns_employees,
  //   title: '',
  //   tableType: VIEW_MORE_ROUTES.employees,
  // },
};

export const DEFAULT_TABLE_QUERY_PARAMS = {
  page: 1,
  limit: 5,
  search: '',
  sortBy: '',
  sortOrder: '',
};

export const statusColors: Record<string, string> = {
  'on track': 'bg-emerald-400',
  completed: 'bg-[#534ab7]/20',
  'at risk': 'bg-orange-400',
  'on notice': 'bg-orange-400',
  active: 'bg-green-100',
  dead: 'bg-slate-500/20',
  support: 'bg-fuchsia-500/20',
};

export const textColors: Record<string, string> = {
  'on track': `text-white`,
  completed: `text-emerald-500`,
  'at risk': `text-white`,
  'on notice': 'text-white',
  active: `text-green-700`,
  dead: `text-slate-600`,
  support: `text-amber-500`,
};

export const statusColorsDark: Record<string, string> = {
  'on track': 'bg-emerald-900/40',
  completed: 'bg-[#534ab7]/20',
  'at risk': 'bg-emerald-900/40',
  'on notice': 'bg-emerald-900/40',
  active: 'bg-green-100',
  dead: 'bg-slate-500/20',
  support: 'bg-fuchsia-500/20',
};

export const textColorsDark: Record<string, string> = {
  'on track': `text-emerald-400`,
  completed: `text-emerald-500`,
  'at risk': `text-orange-400`,
  'on notice': 'text-orange-400',
  active: `text-green-700`,
  dead: `text-slate-600`,
  support: `text-amber-500`,
};

export const reviewColors: Record<string, string> = {
  'low rating': 'bg-orange-100',
  'low attendance': 'bg-yellow-100',
  'on notice': 'bg-red-100',
  'low satisfaction': 'bg-purple-100',
};

export const reviewtextColors: Record<string, string> = {
  'low rating': 'text-orange-600',
  'low attendance': 'text-yellow-600',
  'on notice': 'text-red-600',
  'low satisfaction': 'text-purple-600',
};

export const reviewColorsDark: Record<string, string> = {
  'low rating': 'bg-emerald-900/40',
  'low attendance': 'bg-[#534ab7]/20',
  'on notice': 'bg-orange-400',
  'low satisfaction': 'bg-green-100',
};

export const reviewtextColorsDark: Record<string, string> = {
  'low rating': 'text-orange-400',
  'low attendance': 'text-yellow-600',
  'on notice': 'text-red-400',
  'low satisfaction': 'text-purple-400',
};

export const FIELD_LABELS: Record<keyof Employee, string> = {
  _id: 'ID',
  name: 'Name',
  email: 'Email',
  phone: 'Phone',
  department: 'Department',
  designation: 'Designation',
  manager: 'Manager',
  joiningDate: 'Joining Date',
  yearsOfExperience: 'Years of Experience',
  salary: 'Salary',
  location: 'Location',
  workMode: 'Work Mode',
  projects: 'Projects',
  skills: 'Skills',
  rating: 'Rating',
  attendancePercentage: 'Attendance Percentage',
  employeeSatisfaction: 'Employee Satisfaction',
  onNoticePeriod: 'On Notice',
  projectName: 'Project Name',
  riskStatus: 'Risk Status',
  status: 'Status',
  level: 'Level',
};

export const TOP_PERFORMER_FIELD_LABELS: Record<keyof TopPerformer, string> = {
  _id: 'ID',
  name: 'Name',
  designation: 'Designation',
  department: 'Department',
  rating: 'Rating',
};

export const TOP_PROJECT_FIELD_LABELS: Record<keyof TopProject, string> = {
  _id: 'ID',
  name: 'Name',
  projectName: 'Project Name',
  riskStatus: 'Risk Status',
  status: 'Status',
};

export const PROMOTED_EMPLOYEE_FIELD_LABELS: Record<
  keyof PromotedEmployee,
  string
> = {
  _id: 'ID',
  name: 'Name',
  currentDesignation: 'Current Designation',
  previousDesignation: 'Previous Designation',
  department: 'Department',
  promotedOn: 'Promoted On',
};

export const EMPLOYEE_REVIEW_FIELD_LABELS: Record<
  keyof EmployeeRequiringReview,
  string
> = {
  _id: 'ID',
  name: 'Name',
  designation: 'Designation',
  department: 'Department',
  reviewReason: 'Review Reason',
  rating: 'Rating',
};

export const EMPLOYEE = 'employees';
export const TOP_PROJ = 'topProjects';

export const FORM_FIELD_ERROR_LABELS: Record<string, string> = {
  name: 'Name',
  email: 'Email',
  phone: 'Phone',
  department: 'Department',
  designation: 'Designation',
  password: 'Password',
  confirmPassword: 'Confirm Password',
  empId: 'Employee ID',
  jdate: 'Joining Date',
  wmode: 'Work Mode',
  location: 'Location',
};

export const NAME = 'name';

export const sortModalContainerCss = `bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10  fixed z-300 left-0 right-0 bottom-0 rounded-t-2xl`;
export const employeeDetailModalContainerCss = `h-full max-h-full overflow-auto w-screen md:w-fit  bg-white dark:bg-slate-950  border border-slate-200 dark:border-white/10  fixed z-300 right-0 top-0`;
export const REFETCH_TRY = 3;

export const GUEST_LOGIN = {
  email: getEnv().email,
  password: getEnv().password,
};

export const CHECK_FOR_ROUTES = ['dashboard', 'employee', 'analytics'];

export const EDIT_EMPLOYEE_TITLE = 'Edit Employee';
export const EDIT_EMPLOYEE_SUBTITLE = 'Edit employee details';

export const CREATE_EMPLOYEE_TITLE = 'Create Employee';
export const CREATE_EMPLOYEE_SUBTITLE =
  'Add a new employee to the organization';

export const EMPLOYEE_TABLE = 'employees';

export const ERROR_OCCURRED_WHILE_DOWNLOADING_FILE =
  'Error occurred while downloading the file. Please try again.';
export const VIEW_EMPLOYEE_TTILE = 'View Employee';
export const VIEW_EMPLOYEE_SUB_TTILE = 'View Employee Details';

export const FEATURES = [
  {
    icon: Users,
    color: 'blue',
    title: 'Employee Directory',
    desc: 'Searchable, sortable, paginated directory across the whole org.',
  },
  {
    icon: BarChart3,
    color: 'purple',
    title: 'Analytics & Insights',
    desc: 'Attrition, revenue, and profit margin in one dashboard.',
  },
  {
    icon: FolderKanban,
    color: 'orange',
    title: 'Project Tracking',
    desc: 'Active projects and delivery status across every team.',
  },
  {
    icon: ShieldCheck,
    color: 'green',
    title: 'Role-Based Access',
    desc: 'Guest, employee, and admin views scoped to the right data.',
  },
] as const;

export const FEATURE_STYLES: Record<string, { icon: string; border: string }> =
  {
    blue: {
      icon: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
      border: 'border-blue-500',
    },
    purple: {
      icon: 'bg-[#534ab7]/10 text-[#534ab7] dark:text-[#a29bec]',
      border: 'border-[#534ab7]',
    },
    orange: {
      icon: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
      border: 'border-orange-500',
    },
    green: {
      icon: 'bg-green-500/10 text-green-600 dark:text-green-400',
      border: 'border-green-500',
    },
  };

export const ACCOUNT_CREATION_COMING_SOON = `Account creation is coming soon. Use Guest access to explore the
            portal, or sign in if you already have access.`;

export const CARD_BACKGROUND_COLOR = `bg-white border border-slate-200
dark:bg-[#151B32] dark:border-[#27304D]`;

export const BACKGROUND_COLOR = `dark:bg-gradient-to-br dark:from-[#0f172a] dark:via-[#161233] dark:to-[#2a1a52]`;
export const iconBtn =
  'p-1.5 rounded-lg transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 disabled:hover:bg-transparent';
export const iconActive = 'text-blue-600 dark:text-blue-400';
export const iconMuted = 'text-slate-400 dark:text-slate-600';
