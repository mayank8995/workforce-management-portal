// Mirrors admin-portal-backend/src/socket/events.js — keep both in sync.
import type { Permission } from '../types/types';

export const SOCKET_EVENTS = {
  EMPLOYEE_CHANGED: 'employee:changed',
  ACTIVITY_NEW: 'activity:new',
  ANALYTICS_UPDATED: 'analytics:updated',
  PRESENCE_LIST: 'presence:list',
  PRESENCE_ONLINE: 'presence:online',
  PRESENCE_OFFLINE: 'presence:offline',
  SESSION_EXPIRED: 'session:expired',
  USER_PROMOTED: 'user:promoted',
  PRESENCE_REQUEST: 'presence:request',
} as const;

export const AUTH_ERROR_CODES = [
  'NO_TOKEN',
  'INVALID_TOKEN',
  'SESSION_EXPIRED',
];

export interface OnlineUser {
  readonly _id: string;
  readonly name: string;
  readonly email: string;
  readonly role: string;
  readonly since?: string;
}

export interface EmployeeChangedEvent {
  readonly action: 'created' | 'edited' | 'deleted' | 'promoted';
  readonly employeeId: string;
  readonly at: string;
}

export interface ActivityEvent {
  readonly action:
    | 'EMPLOYEE_CREATED'
    | 'EMPLOYEE_EDITED'
    | 'EMPLOYEE_DELETED'
    | 'EMPLOYEE_PROMOTED';
  readonly entityType: string;
  readonly entityId: string;
  readonly entityName?: string;
  readonly actor: { readonly _id: string; readonly name?: string };
  readonly at: string;
}

const ACTIVITY_VERBS: Record<ActivityEvent['action'], string> = {
  EMPLOYEE_CREATED: 'added',
  EMPLOYEE_EDITED: 'updated',
  EMPLOYEE_DELETED: 'removed',
  EMPLOYEE_PROMOTED: 'promoted',
};

// Sent only to the promoted user; permissions replace the ones stored at login.
export interface UserPromotedEvent {
  readonly designation: string;
  readonly level: string;
  readonly permissions: Permission[];
  readonly at: string;
}

export const describeActivity = (event: ActivityEvent) =>
  `${event.actor.name ?? 'Someone'} ${ACTIVITY_VERBS[event.action] ?? 'changed'} ${event.entityName ?? 'an employee'}`;
