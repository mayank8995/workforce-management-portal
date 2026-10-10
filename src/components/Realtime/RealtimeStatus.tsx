import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Bell, Users } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';
import { describeActivity } from '../../socket/events';

const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

function Dropdown({
  label,
  icon,
  badge,
  onOpen,
  children,
}: {
  label: string;
  icon: ReactNode;
  badge?: number;
  onOpen?: () => void;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        onClick={() => {
          if (!open) {
            onOpen?.();
          }
          setOpen(!open);
        }}
        className="relative p-1.5 rounded-lg text-slate-700 transition-colors hover:bg-slate-100 cursor-pointer dark:text-slate-200 dark:hover:bg-slate-800"
      >
        {icon}
        {!!badge && (
          <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 rounded-full bg-red-500 text-white text-[10px] leading-4 text-center">
            {badge > 9 ? '9+' : badge}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-72 max-h-80 overflow-y-auto z-50 rounded-lg border border-slate-200 bg-white shadow-lg dark:bg-slate-900 dark:border-slate-700">
          <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500 border-b border-slate-200 dark:border-slate-700 dark:text-slate-400">
            {label}
          </p>
          {children}
        </div>
      )}
    </div>
  );
}

function RealtimeStatus() {
  const { user } = useAuth();
  const { connected, activity, unreadCount, markActivityRead, onlineUsers } =
    useSocket();
  const isAdmin = user?.role === 'admin';

  return (
    <div className="flex items-center gap-1">
      <span
        title={connected ? 'Live updates on' : 'Live updates offline'}
        className={`mr-1 inline-block w-2 h-2 rounded-full ${connected ? 'bg-emerald-500' : 'bg-slate-400'}`}
      />
      {isAdmin && (
        <>
          <Dropdown
            label={`Online now (${onlineUsers.length})`}
            icon={<Users size={18} />}
          >
            <ul className="py-1">
              {onlineUsers.map((u) => (
                <li
                  key={u._id}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-700 dark:text-slate-200"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="truncate">{u.name}</span>
                  <span className="ml-auto text-xs text-slate-400">
                    {u.role}
                  </span>
                </li>
              ))}
            </ul>
          </Dropdown>
          <Dropdown
            label="Recent activity"
            icon={<Bell size={18} />}
            badge={unreadCount}
            onOpen={markActivityRead}
          >
            {activity.length === 0 ? (
              <p className="px-3 py-4 text-sm text-slate-500 dark:text-slate-400">
                No activity yet
              </p>
            ) : (
              <ul className="py-1">
                {activity.map((event) => (
                  <li
                    key={`${event.entityId}-${event.at}-${event.action}`}
                    className="px-3 py-2 text-sm text-slate-700 dark:text-slate-200"
                  >
                    <p>{describeActivity(event)}</p>
                    <p className="text-xs text-slate-400">
                      {formatTime(event.at)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </Dropdown>
        </>
      )}
    </div>
  );
}

export default RealtimeStatus;
