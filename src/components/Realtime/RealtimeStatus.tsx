import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Bell, Users } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';
import { describeActivity } from '../../socket/events';
import {
  badge as badgeStyles,
  modal,
  shell,
  text,
  toneSolid,
} from '../../theme/theme';

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
    <div className={modal.dropdownAnchor} ref={ref}>
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
        className={shell.headerButton}
      >
        {icon}
        {!!badge && (
          <span className={badgeStyles.counterAlert}>
            {badge > 9 ? '9+' : badge}
          </span>
        )}
      </button>
      {open && (
        <div className={modal.dropdown}>
          <p className={modal.dropdownHeader}>{label}</p>
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
        className={`mr-1 inline-block w-2 h-2 rounded-full ${connected ? toneSolid.success : 'bg-ink-subtle'}`}
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
                  className={`flex items-center gap-2 px-3 py-1.5 text-sm ${text.secondary}`}
                >
                  <span
                    className={`shrink-0 w-1.5 h-1.5 rounded-full ${toneSolid.success}`}
                  />
                  <span className="min-w-0 truncate">{u.name}</span>
                  <span className={`ml-auto shrink-0 text-xs ${text.subtle}`}>
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
              <p className={`px-3 py-4 text-sm ${text.muted}`}>
                No activity yet
              </p>
            ) : (
              <ul className="py-1">
                {activity.map((event) => (
                  <li
                    key={`${event.entityId}-${event.at}-${event.action}`}
                    className={`px-3 py-2 text-sm ${text.secondary}`}
                  >
                    <p className="wrap-break-word">{describeActivity(event)}</p>
                    <p className={`text-xs ${text.subtle}`}>
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
