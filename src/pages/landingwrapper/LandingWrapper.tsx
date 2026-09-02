// components/AuthLayout.tsx
import { LayoutGrid, CheckCircle2 } from 'lucide-react';

const CHECKLIST = [
  'Analytics',
  'Employee performance tracking',
  'Centralized directory',
];

export function LandingWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen max-h-full relative bg-gradient-to-br from-[#eef0fc] via-[#e7e9fb] to-[#dee1f7] dark:from-[#0f172a] dark:via-[#161233] dark:to-[#2a1a52]">
      <div className={` w-full px-4 `}>
        <div
          className={`relative z-10 h-screen  flex flex-1 flex-col md:flex-row justify-center items-center transition-opacity duration-300`}
        >
          <div className="hidden md:flex flex-col justify-center gap-6 p-12">
            <div className="flex items-center gap-2">
              <LayoutGrid className="h-7 w-7 text-[#534ab7]" />
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                Admin Portal
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Manage your entire workforce, in one place.
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              Track performance, and analytics — all from a single dashboard.
            </p>
            <ul className="flex flex-col gap-3">
              {CHECKLIST.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-slate-700 dark:text-slate-200"
                >
                  <CheckCircle2 className="h-4 w-4 text-[#534ab7] dark:text-[#a29bec]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex md:hidden flex-col items-center mb-2">
            <LayoutGrid className="h-7 w-7 text-[#534ab7]" />
            <span className="text-lg font-bold text-slate-900 dark:text-white">
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
