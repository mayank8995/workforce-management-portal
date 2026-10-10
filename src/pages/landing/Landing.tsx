import { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutGrid,
  ArrowRight,
  Menu,
  X,
  MessageSquareIcon,
  // MessageSquareIcon,
} from 'lucide-react';
import type { LoginData } from '../../types/types';
import {
  ACCOUNT_CREATION_COMING_SOON,
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
import { useModal } from '../../context/ModalContext';
import ChatWidget from '../../components/ChatWidget/ChatWidget';
import {
  button,
  cx,
  icon,
  palette,
  surface,
  text,
  tone,
  toneBorder,
} from '../../theme/theme';

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const { openModal } = useModal();
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
    <div className={cx('min-h-screen', surface.marketing, text.primary)}>
      <header className="sticky top-0 z-20 backdrop-blur-md bg-surface/60 border-b border-line">
        <div className="mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutGrid className={cx('h-6 w-6', icon.active)} />
            <span className="font-semibold">Admin Portal</span>
          </div>
          {/**AI Chat Bot */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => openModal(ChatWidget)}
              aria-label="Ask about this project"
              className={cx(
                button.secondary,
                'h-auto px-2.5 py-2 sm:px-3 border-accent-line hover:border-accent hover:bg-accent-soft'
              )}
            >
              <MessageSquareIcon
                className={cx('h-4 w-4 shrink-0', icon.active)}
              />
              <span className="hidden sm:inline">Ask about this project</span>
            </button>
          </div>
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
              className={button.primary}
            >
              Sign In
            </button>
            <button
              //   onClick={() => navigate('/auth')}
              className={cx(button.secondary, 'justify-evenly bg-transparent')}
            >
              <span>Sign Up</span>
              <span className="ml-1 text-[10px] font-normal px-1.5 py-0.5 rounded-full border border-line-strong">
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
              className={cx(button.primary, 'justify-start')}
            >
              Sign In
            </button>
            <button
              onClick={(e) => handleSubmit(e)}
              onMouseEnter={prefetchDashboard}
              onFocus={prefetchDashboard}
              onPointerDown={prefetchDashboard}
              className={cx(
                button.primary,
                'justify-between',
                isLoading && button.loading
              )}
            >
              <>Continue as Guest</>{' '}
              {isLoading ? (
                <TailSpin
                  visible={true}
                  height={20}
                  width={20}
                  color={palette.white}
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
              className={cx(
                button.secondary,
                'justify-start bg-transparent border-accent-line text-accent'
              )}
            >
              <span>Sign Up</span>
              <span className="ml-1 text-[10px] font-normal px-1.5 py-0.5 rounded-full bg-accent-soft">
                Soon
              </span>
            </button>
          </div>
        )}
      </header>

      <main>
        <section className="mx-auto max-w-3xl px-4 sm:px-6 pt-16 sm:pt-14 pb-16 text-center">
          <span className="inline-block text-xs font-medium tracking-wide uppercase text-accent bg-accent-soft px-3 py-1 rounded-full mb-6">
            WORKFORCE MANAGEMENT PLATFORM
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Manage your entire workforce, in one place.
          </h1>
          <p className={cx(text.secondary, 'text-base sm:text-lg mb-8')}>
            Employee directory, performance tracking, and analytics — all from a
            single dashboard. No signup needed to look around.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={(e) => handleSubmit(e)}
              onMouseEnter={prefetchDashboard}
              onFocus={prefetchDashboard}
              onPointerDown={prefetchDashboard}
              className={cx(
                button.primaryLg,
                'w-full sm:w-auto gap-2',
                isLoading && button.loading
              )}
            >
              Continue as Guest{' '}
              {isLoading ? (
                <TailSpin
                  visible={true}
                  height={20}
                  width={20}
                  color={palette.white}
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
              className={cx(
                button.secondaryLg,
                'w-full sm:w-auto bg-transparent'
              )}
            >
              Sign In
            </button>
          </div>
          <p className={cx(text.muted, 'text-sm mt-4')}>
            New here?{' '}
            <button
              //   onClick={() => navigate('/auth')}
              className={button.linkMd}
            >
              Create an account
            </button>
          </p>
          <small className={cx(text.muted, 'text-xs')}>
            {ACCOUNT_CREATION_COMING_SOON}
          </small>
        </section>

        <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map(({ icon: Icon, tone: featureTone, title, desc }) => (
              <div
                key={title}
                className={cx(
                  'rounded-xl border-l-4 bg-surface p-5 shadow-sm',
                  toneBorder[featureTone]
                )}
              >
                <div
                  className={cx(icon.tile, 'h-9 w-9 mb-3', tone[featureTone])}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold mb-1">{title}</h3>
                <p className={cx(text.secondary, 'text-sm')}>{desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer
        className={cx(
          'border-t border-line py-6 text-center text-xs',
          text.muted
        )}
      >
        © 2026 Admin Dashboard
      </footer>
    </div>
  );
}
