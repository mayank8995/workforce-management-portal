import type { QueryClientConfig } from '@tanstack/react-query';
import type { ChangeEvent, ComponentProps, ReactNode, RefObject } from 'react';

export interface LoginData {
  readonly name: string;
  readonly _id: string;
}

export interface ProfileForm {
  readonly id?: string | undefined;
  name: string;
  phone?: string;
  email?: string;
  department?: string;
  designation?: string;
  empId?: string;
  joiningDate?: string;
  workMode?: string;
  location?: string;
  image?: string | null;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface SignUpForm {
  name: string;
  department: string;
  designation: string;
  empId: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type FormOne = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export type FormTwo = {
  designation: string;
  department: string;
  empId: string;
};
export interface FormData {
  formOne: FormOne;
  formTwo: FormTwo;
}

export type Errors = Partial<Record<string, string>>;

export const initialFormData: FormData = {
  formOne: { name: '', email: '', password: '', confirmPassword: '' },
  formTwo: { designation: '', department: '', empId: '' },
};

export interface ResponseObject<T> {
  data: T[];
  status: number;
  statusText: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ErrorResponseObject {
  data: any;
  status: number;
  statusText: string;
  code?: string;
  config?: any;
  request?: any;
  response?: any;
}
/* eslint-disable @typescript-eslint/no-explicit-any */

export type FilterQueryObject = {
  key: string;
  value: string | string[] | boolean;
};

export type TableQueryParams = {
  page: number;
  limit: number;
  search?: string;
  totalItems?: number;
  totalPages?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  tableType?: TableTypeProps;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};
type ErrorPageProps = {
  isLoading?: boolean;
  isError?: boolean;
  refetch?: () => void;
};
export type TopPerformersList = {
  topPerformersList: TopPerformersCardProps;
  title?: string;
};
export type TopProjectProps = {
  employees: TopProject[];
};
export type TopProjectsList = ErrorPageProps & {
  topProjects: TopProjectProps;
  title?: string;
};

export type MeetingKPIList = {
  meetingKPIs: MeetingKPIsCardProps;
  title?: string;
};
export type PromotedList = {
  promotedThisYear: PromotedThisYearCardProps;
  title?: string;
};

export type ReviewList = {
  requiringReview: RequiringReviewCardProps;
  title?: string;
};

export type TableToolbarProps = {
  txtToBeSearched: string;
  setTextToBeSearched: (e: string) => void;
  tableQueryParams: TableQueryParams;
  handleRowsPerPageChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  openFilterModal: () => void;
  openSortModal: () => void;
  handlePrevious: () => void;
  handleNext: () => void;
  bulkAction: () => void;
  selectedRow: Set<unknown>;
  handleOnChange: (
    event: ChangeEvent<HTMLInputElement, HTMLInputElement>
  ) => void;
  downloading: boolean;
  ref?: RefObject<HTMLInputElement | null>;
  listSize: number;
  openCreateEmployeeModal: () => void;
};
export type TableTypeMap = {
  employees: Employee;
  topPerformer: TopPerformer;
  topProject: TopProject;
  promotedEmployee: PromotedEmployee;
  employeeReview: EmployeeRequiringReview;
};

export type TableTypeProps = keyof TableTypeMap;
export type HeaderType<T extends ListType> = TableHeader<T>[];
export type ColumnType<T extends ListType> = Column<T>[];

export type DesktopTableProps<T extends ListType> = {
  list: T[];
  columnsData: Column<T>[];
  headersData: TableHeader<T>[];
  rowsPerPage: number;
  handleSort: (e: string) => void;
  getSortIcon: (e: string) => ReactNode;
  tableQueryParams?: TableQueryParams;
  selectedRow: Set<unknown>;
  setSelectedRow: React.Dispatch<React.SetStateAction<Set<unknown>>>;
  handleOnChange: (
    event: ChangeEvent<HTMLInputElement, HTMLInputElement>
  ) => void;
  ref?: RefObject<HTMLInputElement | null>;
};

export type MobileTableProps<T extends ListType> = {
  list: T[];
  rowsPerPage: number;
  columnsData: Column<T>[];
  tableQueryParams?: TableQueryParams;
  selectedRow: Set<unknown>;
  setSelectedRow: React.Dispatch<React.SetStateAction<Set<unknown>>>;
  handleOnChange: (
    event: ChangeEvent<HTMLInputElement, HTMLInputElement>
  ) => void;
};

export type FilterList = {
  tableType: TableTypeProps;
};

export type DonutChartProps = {
  data: ProjectStatusDistribution;
  title: string;
};

export type SkeletonProps = {
  target?: string | null;
};

export type QueryClientConfigProps = QueryClientConfig & {
  refetchAll?: () => void;
};

export type BadgeProps = {
  value: string;
};

export type RatingProps = {
  value: string;
};

export type StatusBadgeProps = {
  value: string;
};

export type NameBadgeProps = {
  value: string;
  id?: string;
};

export type ReviewReasonBadgeProps = {
  value: string;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export type InputFieldType = ComponentProps<'input'> & {
  label?: string;
  type: string;
  name: string;
  placeholder?: string;
  errors?: any;
  data?: any;
  maxlength?: number | undefined;
  ref?: RefObject<HTMLInputElement | null>;
};
/* eslint-disable @typescript-eslint/no-explicit-any */

export type CheckBox = Record<string, boolean>;

export interface Project {
  projectName: string;
  status: ProjectStatus;
  riskStatus: RiskStatus;
  priorityRanking: number;
}
type WorkMode = 'Remote' | 'Hybrid' | 'Onsite';
type ProjectStatus =
  | 'Active'
  | 'Completed'
  | 'On Hold'
  | 'Cancelled'
  | 'Support';
type RiskStatus = 'On Track' | 'At Risk' | 'Critical';
type SatisfactionLevel = 'Low' | 'Medium' | 'High';

export interface Employee {
  _id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  manager: string;
  joiningDate: string;
  yearsOfExperience: number;
  salary: number;
  location: string;
  workMode: WorkMode;
  projects: Project[];
  skills: string[];
  rating: number;
  attendancePercentage: number;
  employeeSatisfaction: SatisfactionLevel;
  onNoticePeriod: boolean;
  projectName?: string;
  riskStatus?: string;
  status?: string;
  level?: string;
}
export interface EmployeeFormType {
  name: string;
  empId?: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  manager: string;
  joiningDate: string;
  yearsOfExperience: number;
  salary: number;
  location: string;
  workMode: string;
  skills: string[];
  rating: number;
  attendancePercentage: number;
  employeeSatisfaction: string;
  onNoticePeriod: boolean;
  projects: Project[];
  level?: string;
}

export type EmployeeProps = {
  list: Employee[];
};

export type Column<T> = {
  [K in keyof T]: {
    key: Extract<keyof T, string>;
    header: string;
    render?: (value: string, id: string) => ReactNode;
    metadata?: any;
  };
}[keyof T];

export type AccordionSection = {
  id: string;
  label?: string;
  showColumns?: boolean;
  initialState: boolean;
  fieldType: 'string' | 'array' | 'array-objects';
  fields: string[];
  render?: (props?: Record<any, any>) => React.ReactNode;
};
export interface TopPerformer {
  _id: string;
  name: string;
  designation: string;
  department: string;
  rating: number;
}

export interface TopProject {
  _id: string;
  name: string;
  projectName: string;
  riskStatus: string;
  status: string;
}

export interface PromotedEmployee {
  _id: string;
  name: string;
  currentDesignation: string;
  previousDesignation: string;
  department: string;
  promotedOn: string;
}

export interface EmployeeRequiringReview {
  _id: string;
  name: string;
  designation: string;
  department: string;
  reviewReason: string;
  rating: number;
}

export type TableHeader<T> = {
  key: Extract<keyof T, string>;
  value: string;
  metadata?: any;
};
export type ListType =
  | Employee
  | TopPerformer
  | TopProject
  | PromotedEmployee
  | EmployeeRequiringReview;

export type CustomTableProps<T extends ListType> = ErrorPageProps & {
  list: T[];
  tableQueryParams: TableQueryParams;
  handleTableQuery: (data: TableQueryParams, signal?: AbortSignal) => void;
  columnsData: Column<T>[];
  headersData: TableHeader<T>[];
  title: string;
  setQuery: React.Dispatch<React.SetStateAction<TableQueryParams>>;
};

type Trend = 'up' | 'down';

type EmployeeBase = {
  _id: number;
  name: string;
  department: string;
};

type PerformanceCardBase = {
  title: string;
  icon: string;
  count: number;
  percentage: number;
  trend: Trend;
  trendValue: number;
  description: string;
};

export type TopPerformersCardProps = PerformanceCardBase & {
  employees: TopPerformer[];
};

export type PromotedThisYearCardProps = PerformanceCardBase & {
  employees: PromotedEmployee[];
};

export type KPIBreakdownItem = {
  label: string;
  count: number;
  percentage: number;
  ratingRange: string;
};

type KPITrendHistoryItem = {
  month: string;
  percentage: number;
};

export type MeetingKPIsCardProps = PerformanceCardBase & {
  breakdown: {
    exceeding: KPIBreakdownItem;
    meeting: KPIBreakdownItem;
    notMeeting: KPIBreakdownItem;
  };
  trend_history: KPITrendHistoryItem[];
};

type ReviewReasonItem = {
  label: string;
  count: number;
};

type EmployeeSatisfaction = 'Low' | 'Medium' | 'High';

type ReviewReason =
  | 'Low Rating'
  | 'Low Attendance'
  | 'On Notice'
  | 'Low Satisfaction';

type ReviewEmployee = EmployeeBase & {
  designation: string;
  rating: number;
  attendancePercentage: number;
  employeeSatisfaction: EmployeeSatisfaction;
  onNoticePeriod: boolean;
  reviewReason: ReviewReason[];
};

export type RequiringReviewCardProps = PerformanceCardBase & {
  reasons: {
    lowRating: ReviewReasonItem;
    lowAttendance: ReviewReasonItem;
    onNoticePeriod: ReviewReasonItem;
    lowSatisfaction: ReviewReasonItem;
  };
  employees: ReviewEmployee[];
};

export type PerformanceCards = {
  topPerformers: TopPerformersCardProps;
  promotedThisYear: PromotedThisYearCardProps;
  meetingKPIs: MeetingKPIsCardProps;
  requiringReview: RequiringReviewCardProps;
};

export type KeyMetricCards = {
  data?: PerformanceCards;
};

type AnalyticsSummary = {
  totalEmployees: number;
  activeProjects: number;
  revenueThisQuarterCr: number;
  totalRevenue: number;
  profitMargin: number;
  attritionRate: number;
};

type HeadcountByLocation = {
  city: string;
  employeeCount: number;
};

type RevenueTrendItem = {
  month: string;
  revenueCr: number;
};

export type ProjectStatusDistribution = {
  totalProjects: number;
  Active: number;
  Support: number;
  Completed: number;
};

type DepartmentHeadcount = {
  department: string;
  count: number;
};

type UtilizationTrendItem = {
  month: string;
  utilization: number;
};

type AttritionTrendItem = {
  month: string;
  rate: number;
};

type AttritionInsights = {
  thisMonth: number;
  lastMonth: number;
  employeesOnNoticePeriod: number;
  yearlyAttritionRate: number;
  trend: AttritionTrendItem[];
};

type TopClient = {
  client: string;
  industry: string;
  revenueCr: number;
  contributionPercentage: number;
};

type SkillInDemand = {
  skill: string;
  employeeCount: number;
};

type AlertSeverity = 'warning' | 'success' | 'info';

type AnalyticsAlert = {
  id: number;
  severity: AlertSeverity;
  message: string;
  timestamp: string;
};

export type Analytics = {
  summary: AnalyticsSummary;
  headcountByLocation: HeadcountByLocation[];
  revenueTrend: RevenueTrendItem[];
  projectStatusDistribution: ProjectStatusDistribution;
  departmentHeadcount: DepartmentHeadcount[];
  utilizationTrend: UtilizationTrendItem[];
  attritionInsights: AttritionInsights;
  topClients: TopClient[];
  skillsInDemand: SkillInDemand[];
  alerts: AnalyticsAlert[];
};

export type AnalyticsCard = {
  data?: Analytics;
};

export type KeyMetricCardsProps = {
  metricData?: Analytics;
};

export type KeyMetricCardsConfig = {
  [key: string]: {
    value: number;
    icon: string;
  };
};

export type ExportHeader<T> = {
  key: keyof T;
  value: string;
};

export type NavItems = {
  name: string;
  path: string;
};

export type LoginProfile = {
  _id: string;
  name: string;
};

export type SelectedChip = {
  key: string;
  value: string[];
};

type Metadata = {
  pagination: TableQueryParams;
  title: string;
};
export type TopProjectEmployeeResponse = Metadata & {
  employees: TopProject[];
};

export type EmployeeDirectoryResponse = Metadata & {
  employees: Employee[];
};

export type ScreenType = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
