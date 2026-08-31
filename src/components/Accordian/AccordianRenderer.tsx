import {
  LayoutDashboard,
  FolderKanban,
  Brain,
  TrendingUp,
  UserRound,
  Wallet,
} from 'lucide-react';
import type { AccordionSection } from '../../types/types';

export const accordians: AccordionSection[] = [
  {
    id: 'overview',
    label: 'Overview',
    render: (props?: Record<any, any>) => <LayoutDashboard {...props} />,
    fieldType: 'string',
    initialState: true,
    showColumns: true,
    fields: [
      'joiningDate',
      'manager',
      'location',
      'workMode',
      'yearsOfExperience',
    ],
  },
  {
    id: 'project',
    label: 'Assigned Projects',
    render: (props?: Record<any, any>) => <FolderKanban {...props} />,
    fieldType: 'array-objects',
    initialState: false,
    fields: ['projects$projectName'],
  },
  {
    id: 'skills',
    label: 'Current Skills',
    render: (props?: Record<any, any>) => <Brain {...props} />,
    fieldType: 'array',
    initialState: false,
    fields: ['skills'],
  },
  {
    id: 'performance',
    label: 'Performance',
    render: (props?: Record<any, any>) => <TrendingUp {...props} />,
    showColumns: true,
    initialState: false,
    fieldType: 'string',
    fields: ['rating', 'attendancePercentage', 'employeeSatisfaction'],
  },
  {
    id: 'personalInfo',
    label: 'Personal Information',
    render: (props?: Record<any, any>) => <UserRound {...props} />,
    showColumns: true,
    initialState: false,
    fieldType: 'string',
    fields: ['email', 'phone'],
  },
  {
    id: 'salary',
    label: 'Salary',
    render: (props?: Record<any, any>) => <Wallet {...props} />,
    fieldType: 'string',
    initialState: false,
    fields: ['salary'],
  },
];
