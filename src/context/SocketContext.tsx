import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { io } from 'socket.io-client';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';
import { getEnv } from '../config/env';
import {
  AUTH_ERROR_CODES,
  SOCKET_EVENTS,
  describeActivity,
  type ActivityEvent,
  type EmployeeChangedEvent,
  type OnlineUser,
} from '../socket/events';

const ANALYTICS_QUERY_KEYS = [
  'analyticsData',
  'analyticsView',
  'topPerformers',
  'meetingKPIs',
  'promotedThisYear',
  'requiringReview',
];
const MAX_ACTIVITY = 50;

interface SocketContextType {
  connected: boolean;
  activity: ActivityEvent[];
  unreadCount: number;
  markActivityRead: () => void;
  onlineUsers: OnlineUser[];
}

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { user, logout } = useAuth();
  const queryClient = useQueryClient();
  const [connected, setConnected] = useState(false);
  const [activity, setActivity] = useState<ActivityEvent[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);

  // logout and user are recreated on every render; refs keep the socket from reconnecting.
  const logoutRef = useRef(logout);
  const userNameRef = useRef(user?.name);
  logoutRef.current = logout;
  userNameRef.current = user?.name;

  const userId = user?._id;

  useEffect(() => {
    if (!userId) {
      return;
    }

    const apiUrl = getEnv().apiUrl as string | undefined;
    const socket = io(apiUrl || 'http://localhost:3500', {
      withCredentials: true,
    });

    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));
    socket.on('connect_error', (err: Error & { data?: { code?: string } }) => {
      if (AUTH_ERROR_CODES.includes(err.data?.code ?? '')) {
        socket.disconnect();
        logoutRef.current();
      }
    });
    socket.on(SOCKET_EVENTS.SESSION_EXPIRED, () => {
      toast.info('Session expired, please log in again');
      logoutRef.current();
    });

    socket.on(
      SOCKET_EVENTS.EMPLOYEE_CHANGED,
      ({ employeeId }: EmployeeChangedEvent) => {
        void queryClient.invalidateQueries({ queryKey: ['employees'] });
        void queryClient.invalidateQueries({
          queryKey: ['employeeDetail', { _id: employeeId }],
        });
      }
    );
    socket.on(SOCKET_EVENTS.ANALYTICS_UPDATED, () => {
      ANALYTICS_QUERY_KEYS.forEach((key) => {
        void queryClient.invalidateQueries({ queryKey: [key] });
      });
    });

    socket.on(SOCKET_EVENTS.ACTIVITY_NEW, (event: ActivityEvent) => {
      setActivity((prev) => [event, ...prev].slice(0, MAX_ACTIVITY));
      setUnreadCount((count) => Math.min(count + 1, MAX_ACTIVITY));
      // The actor already sees a success toast from the form itself.
      if (event.actor.name !== userNameRef.current) {
        toast.info(describeActivity(event));
      }
    });

    socket.on(SOCKET_EVENTS.PRESENCE_LIST, (users: OnlineUser[]) =>
      setOnlineUsers(users)
    );
    socket.on(SOCKET_EVENTS.PRESENCE_ONLINE, (onlineUser: OnlineUser) =>
      setOnlineUsers((prev) =>
        prev.some((u) => u._id === onlineUser._id)
          ? prev
          : [...prev, onlineUser]
      )
    );
    socket.on(SOCKET_EVENTS.PRESENCE_OFFLINE, ({ _id }: { _id: string }) =>
      setOnlineUsers((prev) => prev.filter((u) => u._id !== _id))
    );

    return () => {
      socket.disconnect();
      setConnected(false);
      setActivity([]);
      setUnreadCount(0);
      setOnlineUsers([]);
    };
  }, [userId, queryClient]);

  const value = useMemo(
    () => ({
      connected,
      activity,
      unreadCount,
      markActivityRead: () => setUnreadCount(0),
      onlineUsers,
    }),
    [connected, activity, unreadCount, onlineUsers]
  );

  return <SocketContext value={value}>{children}</SocketContext>;
};

export const useSocket = () => {
  const context = useContext<SocketContextType | null>(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
