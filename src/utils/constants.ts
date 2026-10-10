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

export const TOP_PROJECTS = 'Top Projects';
export const ATTRITION_INSIGHTS = 'Attrition Insights';
export const DEPARTMENT_WISE_HEADCOUNT = 'Department-wise Headcount';
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
    tone: 'info',
    title: 'Employee Directory',
    desc: 'Searchable, sortable, paginated directory across the whole org.',
  },
  {
    icon: BarChart3,
    tone: 'accent',
    title: 'Analytics & Insights',
    desc: 'Attrition, revenue, and profit margin in one dashboard.',
  },
  {
    icon: FolderKanban,
    tone: 'caution',
    title: 'Project Tracking',
    desc: 'Active projects and delivery status across every team.',
  },
  {
    icon: ShieldCheck,
    tone: 'success',
    title: 'Role-Based Access',
    desc: 'Guest, employee, and admin views scoped to the right data.',
  },
] as const;

export const ACCOUNT_CREATION_COMING_SOON = `Account creation is coming soon. Use Guest access to explore the
            portal, or sign in if you already have access.`;

export const ROWS_PER_PAGE_OPTIONS = [2, 3, 5, 7, 10, 15];
