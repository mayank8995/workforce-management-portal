import { Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';

export default function Toggle() {
  const { toggleTheme } = useTheme();
  const [enabled, setEnabled] = useState<boolean>(() => {
    return (
      !localStorage.getItem('theme') || localStorage.getItem('theme') === 'dark'
    );
  });
  function toggle(enable: boolean) {
    const root = document.documentElement;
    if (enable) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    setEnabled(enable);
    toggleTheme();
  }

  return (
    <label
      htmlFor="theme"
      className="inline-flex items-center cursor-pointer select-none"
    >
      <input
        id="theme"
        name="theme"
        type="checkbox"
        checked={enabled}
        onChange={() => toggle(!enabled)}
        className="sr-only peer"
      />
      {/* Track */}
      <div
        className={`relative w-12 h-6 rounded-full transition-colors duration-200 ease-in-out peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-blue-500 dark:peer-focus-visible:ring-offset-slate-950 ${
          enabled ? 'bg-slate-700' : 'bg-blue-500'
        }`}
      >
        {/* Thumb */}
        <div
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white flex items-center justify-center shadow-sm transition-transform duration-200 ease-in-out ${
            enabled ? 'translate-x-6' : 'translate-x-0'
          }`}
        >
          {enabled ? (
            <Moon size={12} className="text-slate-700" fill="currentColor" />
          ) : (
            <Sun size={12} className="text-amber-500" fill="currentColor" />
          )}
        </div>
      </div>
    </label>
  );
}
