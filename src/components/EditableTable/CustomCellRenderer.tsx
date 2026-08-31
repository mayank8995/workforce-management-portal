import type {
  Column,
  Employee,
  EmployeeRequiringReview,
  PromotedEmployee,
  TopPerformer,
  TopProject,
} from '../../types/types';
import Badge from '../UtilComponents/Badge';
import NameBadge from '../UtilComponents/NameBadge';
import Rating from '../UtilComponents/Rating';
import ReviewReasonBadge from '../UtilComponents/ReviewReasonBadge';
import StatusBadge from '../UtilComponents/StatusBadge';

export const columns_employees: Column<Employee>[] = [
  {
    key: '_id',
    header: 'Id',
    metadata: {
      show: false,
    },
  },
  {
    key: 'name',
    header: 'Name',
    render: (value: string, id: string) => <NameBadge value={value} id={id} />,
  },
  {
    key: 'designation',
    header: 'Designation',
  },
  {
    key: 'department',
    header: 'Department',
  },
  {
    key: 'yearsOfExperience',
    header: 'Years of Experience',
  },
  {
    key: 'location',
    header: 'Location',
  },
  {
    key: 'workMode',
    header: 'Work Mode',
    render: (value: string) => <Badge value={value} />,
  },
  {
    key: 'rating',
    header: 'Rating',
    render: (value: string) => <Rating value={value} />,
  },
];

export const columns_top_performers: Column<TopPerformer>[] = [
  {
    key: '_id',
    header: 'Id',
    metadata: {
      show: false,
    },
  },
  {
    key: 'name',
    header: 'Name',
    render: (value: string, id: string) => <NameBadge value={value} id={id} />,
  },
  {
    key: 'designation',
    header: 'Designation',
  },
  {
    key: 'department',
    header: 'Department',
  },
  {
    key: 'rating',
    header: 'Rating',
    render: (value: string) => <Rating value={value} />,
  },
];
export const columns_top_projects: Column<TopProject>[] = [
  {
    key: 'name',
    header: 'Name',
    render: (value: string, id: string) => <NameBadge value={value} id={id} />,
  },
  {
    key: 'projectName',
    header: 'Project Name',
  },
  {
    key: 'riskStatus',
    header: 'Risk Status',
    render: (value: string) => <StatusBadge value={value} />,
  },
  {
    key: 'status',
    header: 'Status',
    render: (value: string) => <StatusBadge value={value} />,
  },
];
export const columns_promotedThisYear: Column<PromotedEmployee>[] = [
  {
    key: '_id',
    header: 'id',
    metadata: {
      show: false,
    },
  },
  {
    key: 'name',
    header: 'Name',
    render: (value: string, id: string) => <NameBadge value={value} id={id} />,
  },
  {
    key: 'currentDesignation',
    header: 'Current Designation',
  },
  {
    key: 'previousDesignation',
    header: 'Previous Designation',
  },
  {
    key: 'department',
    header: 'Department',
  },
  {
    key: 'promotedOn',
    header: 'Promoted On',
  },
];

export const columns_requiringReview: Column<EmployeeRequiringReview>[] = [
  {
    key: '_id',
    header: 'id',
    metadata: {
      show: false,
    },
  },
  {
    key: 'name',
    header: 'Name',
    render: (value: string, id: string) => <NameBadge value={value} id={id} />,
  },
  {
    key: 'designation',
    header: 'Designation',
  },
  {
    key: 'department',
    header: 'Department',
  },
  {
    key: 'reviewReason',
    header: 'Review Reason',
    render: (value: string) => <ReviewReasonBadge value={value} />,
  },
  {
    key: 'rating',
    header: 'Rating',
    render: (value: string) => <Rating value={value} />,
  },
];
