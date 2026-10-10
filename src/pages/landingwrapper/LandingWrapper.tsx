// components/AuthLayout.tsx
import { LayoutGrid, CheckCircle2 } from 'lucide-react';
import { cx, icon, surface, text } from '../../theme/theme';

const CHECKLIST = [
  'Analytics',
  'Employee performance tracking',
  'Centralized directory',
];

export function LandingWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className={cx('h-screen max-h-full relative', surface.marketing)}>
      <div className={` w-full px-4 `}>
        <div
          className={`relative z-10 h-screen  flex flex-1 flex-col md:flex-row justify-center items-center transition-opacity duration-300`}
        >
          <div className="hidden md:flex flex-col justify-center gap-6 p-12">
            <div className="flex items-center gap-2">
              <LayoutGrid className={cx('h-7 w-7', icon.active)} />
              <span className={cx(text.primary, 'text-xl font-bold')}>
                Admin Portal
              </span>
            </div>
            <h1
              className={cx(text.primary, 'text-4xl font-bold tracking-tight')}
            >
              Manage your entire workforce, in one place.
            </h1>
            <p className={text.secondary}>
              Track performance, and analytics — all from a single dashboard.
            </p>
            <ul className="flex flex-col gap-3">
              {CHECKLIST.map((item) => (
                <li
                  key={item}
                  className={cx(text.secondary, 'flex items-center gap-2')}
                >
                  <CheckCircle2 className={cx('h-4 w-4', icon.active)} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex md:hidden flex-col items-center mb-2">
            <LayoutGrid className={cx('h-7 w-7', icon.active)} />
            <span className={cx(text.primary, 'text-lg font-bold')}>
              Admin Portal
            </span>
          </div>
          {children}
        </div>
      </div>
      {/* <div
        className="absolute inset-0 bg-linear-to-br
        from-white via-sky-50 to-violet-100
        dark:from-slate-950 dark:via-indigo-950 dark:to-purple-950"
      />

      <div
        className="absolute bottom-0 right-0 w-2/3 h-2/3
        bg-violet-500/15
        dark:bg-violet-500/20
        blur-3xl rounded-full"
      /> */}
    </div>
  );
}
