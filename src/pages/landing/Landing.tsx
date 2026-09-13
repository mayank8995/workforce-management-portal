import { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutGrid,
  ArrowRight,
  Menu,
  X,
  // MessageSquareIcon,
} from 'lucide-react';
import type { LoginData } from '../../types/types';
import {
  ACCOUNT_CREATION_COMING_SOON,
  FEATURE_STYLES,
  FEATURES,
  NAV_ITEMS,
} from '../../utils/constants';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { guestLogin } from '../../api/admin-portal.api';
import { getApiErrorDetails } from '../../services/utils.service';
import { TailSpin } from 'react-loader-spinner';
import { prefetchDashboard } from '../../router/router';
// import { loadDashboardChildPage } from '../../router/router';
// import { useModal } from '../../context/ModalContext';
// import ChatWidget from '../../components/ChatWidget/ChatWidget';

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // const { openModal } = useModal();
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (
      !localStorage.getItem('theme') ||
      localStorage.getItem('theme') === 'dark'
    ) {
      root.setAttribute('data-theme', 'dark');
    }
  }, []);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleGuest();
  };
  const handleGuest = async () => {
    try {
      setIsLoading(true);

      const res = await guestLogin();
      if (res?.status === 200) {
        login(res?.data?.data as LoginData);
        toast.success(res?.data?.message, {});
        navigate(NAV_ITEMS.DASHBOARD);
      } else {
        toast.error(res?.data?.message, {});
      }
    } catch (err) {
      const { message } = getApiErrorDetails(err);
      toast.error(message, {});
      console.error('POST FAILED', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef0fc] via-[#e7e9fb] to-[#dee1f7] dark:from-[#0f172a] dark:via-[#161233] dark:to-[#2a1a52] text-slate-900 dark:text-white">
      <header className="sticky top-0 z-20 backdrop-blur-md bg-white/60 dark:bg-[#0f172a]/60 border-b border-black/5 dark:border-white/10">
        <div className="mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutGrid className="h-6 w-6 text-[#534ab7]" />
            <span className="font-semibold">Admin Portal</span>
          </div>
          {/**AI Chat Bot */}
          {/* <div className="flex items-center gap-2">
            <button
              onClick={() => openModal(ChatWidget)}
              aria-label="Ask about this project"
              className="cursor-pointer inline-flex items-center gap-2 rounded-lg border border-[#534ab7]/30 px-2.5 py-2 text-sm text-slate-700 transition hover:border-[#534ab7] hover:bg-[#534ab7]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#534ab7] dark:border-[#534ab7]/40 dark:text-slate-200 dark:hover:border-[#7f77dd] dark:hover:bg-[#534ab7]/10 dark:focus-visible:outline-[#7f77dd] sm:px-3"
            >
              <MessageSquareIcon className="h-4 w-4 shrink-0 text-[#534ab7] dark:text-[#7f77dd]" />
              <span className="hidden sm:inline">Ask about this project</span>
            </button>
          </div> */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/mgupta8995/"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 dark:bg-white transition"
              aria-label="View source on LinkedIn"
            >
              {/* <GithubI className="h-5 w-5" /> */}
              <img
                loading="eager"
                src={'/assets/linkedin.svg'}
                className="aspect-circle object-cover w-full h-full"
                alt="LinkedIn Link"
              />
            </a>
            <a
              href="https://github.com/mayank8995"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 dark:bg-white transition"
              aria-label="View source on GitHub"
            >
              {/* <GithubI className="h-5 w-5" /> */}
              <img
                loading="eager"
                src={'/assets/GitHub_Invertocat_Black.svg'}
                className="aspect-circle object-cover w-full h-full"
                alt="Github Link"
              />
            </a>
            <button
              onClick={() => navigate('/auth')}
              className="cursor-pointer text-sm font-medium px-4 py-2 rounded-lg bg-[#534ab7] text-white hover:bg-[#463fa1] transition"
            >
              Sign In
            </button>
            <button
              //   onClick={() => navigate('/auth')}
              className="border border-slate-300 flex justify-evenly items-center cursor-pointer text-sm font-medium px-4 py-2 rounded-lg transition hover:bg-black/5 dark:hover:bg-white/10"
            >
              <span>Sign Up</span>
              <span className="ml-1 text-[10px] font-normal bg-white/20 px-1.5 py-0.5 rounded-full border border-slate-300">
                Soon
              </span>
            </button>
          </div>

          <button
            className="md:hidden p-2 cursor-pointer"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="h-5 w-5 cursor-pointer" />
            ) : (
              <Menu className="h-5 w-5 cursor-pointer" />
            )}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden px-4 pb-4 flex flex-col gap-2">
            <button
              onClick={() => navigate('/auth')}
              className="cursor-pointer text-sm font-medium px-4 py-2 rounded-lg bg-[#534ab7] border border-[#534ab7] text-white dark:text-[#a29bec] dark:border-[#7f77dd] transition text-left"
            >
              Sign In
            </button>
            <button
              onClick={(e) => handleSubmit(e)}
              onMouseEnter={prefetchDashboard}
              onFocus={prefetchDashboard}
              onPointerDown={prefetchDashboard}
              className="flex justify-between cursor-pointer text-sm font-medium px-4 py-2 bg-[#534ab7] rounded-lg border border-[#534ab7] text-white dark:text-[#a29bec] dark:border-[#7f77dd] text-center"
            >
              <>Continue as Guest</>{' '}
              {isLoading ? (
                <TailSpin
                  visible={true}
                  height={20}
                  width={20}
                  color="#fff"
                  radius="4"
                  ariaLabel="tail-spin-loading"
                  wrapperStyle={{}}
                  wrapperClass="flex items-center justify-center"
                />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
            </button>
            <button
              //   onClick={() => navigate('/auth')}
              className="flex justify-start items-center  cursor-pointer text-sm font-medium px-4 py-2 rounded-lg  border border-[#534ab7] text-[#534ab7] dark:text-[#a29bec] dark:border-[#7f77dd] hover:bg-black/5 dark:hover:bg-white/10 text-center"
            >
              <span>Sign Up</span>
              <span className="ml-1 text-[10px] font-normal bg-white/20 px-1.5 py-0.5 rounded-full">
                Soon
              </span>
            </button>
          </div>
        )}
      </header>

      <main>
        <section className="mx-auto max-w-3xl px-4 sm:px-6 pt-16 sm:pt-14 pb-16 text-center">
          <span className="inline-block text-xs font-medium tracking-wide uppercase text-[#534ab7] dark:text-[#a29bec] bg-[#534ab7]/10 px-3 py-1 rounded-full mb-6">
            WORKFORCE MANAGEMENT PLATFORM
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Manage your entire workforce, in one place.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-8">
            Employee directory, performance tracking, and analytics — all from a
            single dashboard. No signup needed to look around.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={(e) => handleSubmit(e)}
              onMouseEnter={prefetchDashboard}
              onFocus={prefetchDashboard}
              onPointerDown={prefetchDashboard}
              className="cursor-pointer w-full sm:w-auto px-6 py-3 rounded-lg bg-[#534ab7] text-white font-medium hover:bg-[#463fa1] transition flex items-center justify-center gap-2"
            >
              Continue as Guest{' '}
              {isLoading ? (
                <TailSpin
                  visible={true}
                  height={20}
                  width={20}
                  color="#fff"
                  radius="4"
                  ariaLabel="tail-spin-loading"
                  wrapperStyle={{}}
                  wrapperClass="flex items-center justify-center"
                />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={() => navigate('/auth')}
              className="cursor-pointer w-full sm:w-auto px-6 py-3 rounded-lg border border-slate-300 dark:border-white/20 font-medium hover:bg-black/5 dark:hover:bg-white/10 transition"
            >
              Sign In
            </button>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
            New here?{' '}
            <button
              //   onClick={() => navigate('/auth')}
              className="cursor-pointer text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              Create an account
            </button>
          </p>
          <small className="text-xs text-slate-500 dark:text-slate-400">
            {ACCOUNT_CREATION_COMING_SOON}
          </small>
        </section>

        <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map(({ icon: Icon, color, title, desc }) => (
              <div
                key={title}
                className={`rounded-xl border-l-4 ${FEATURE_STYLES[color].border} bg-white dark:bg-white/5 p-5 shadow-sm`}
              >
                <div
                  className={`h-9 w-9 rounded-lg flex items-center justify-center mb-3 ${FEATURE_STYLES[color].icon}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold mb-1">{title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-black/5 dark:border-white/10 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        © 2026 Admin Dashboard
      </footer>
    </div>
  );
}
