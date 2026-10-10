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
  LANDING_HIGHLIGHTS,
  SOCIAL_LINKS,
  TECH_STACK,
  NAV_ITEMS,
  PRODUCT_NAME,
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
  marketing,
  palette,
  surface,
  text,
  tone,
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
          <div className="flex items-center gap-2 min-w-0">
            <LayoutGrid className={cx('h-6 w-6 shrink-0', icon.active)} />
            <span className="min-w-0 font-semibold leading-tight text-sm sm:text-base">
              {PRODUCT_NAME}
            </span>
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
          <span className={cx(marketing.eyebrow, 'mb-6')}>
            WORKFORCE MANAGEMENT PLATFORM
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Manage your entire workforce, in one place.
          </h1>
          <p className={cx(text.secondary, 'text-base sm:text-lg mb-8')}>
            Employee directory, performance tracking, and analytics — all from a
            single dashboard.
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
          <p className={cx(text.muted, 'mt-4 text-xs')}>
            {ACCOUNT_CREATION_COMING_SOON}
          </p>
        </section>

        {/* Highlights */}
        <section className={cx(marketing.section, 'pb-16')}>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className={cx(marketing.eyebrow, 'mb-4')}>
              Why {PRODUCT_NAME}
            </span>
            <h2 className={marketing.heading}>Built for day-to-day HR work</h2>
            <p className={marketing.lead}>
              Everything a people team checks every morning, kept in sync and
              easy to reach from any device.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {LANDING_HIGHLIGHTS.map(
              ({ icon: Icon, tone: highlightTone, title, desc }) => (
                <div key={title} className={marketing.featureCard}>
                  <div
                    className={cx(marketing.featureIcon, tone[highlightTone])}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className={marketing.featureTitle}>{title}</h3>
                    <p className={marketing.featureText}>{desc}</p>
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* Modules */}
        <section className={cx(marketing.section, 'pb-16')}>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className={marketing.heading}>What's inside</h2>
            <p className={marketing.lead}>
              The core modules you get access to as soon as you sign in.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES.map(({ icon: Icon, tone: featureTone, title, desc }) => (
              <div key={title} className={marketing.featureCard}>
                <div className={cx(marketing.featureIcon, tone[featureTone])}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h3 className={marketing.featureTitle}>{title}</h3>
                  <p className={marketing.featureText}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tech stack */}
        <section className={cx(marketing.section, 'pb-20 text-center')}>
          <h2
            className={cx(
              text.muted,
              'text-xs font-semibold uppercase tracking-wide mb-4'
            )}
          >
            Built with
          </h2>
          <ul className="flex flex-wrap justify-center gap-2">
            {TECH_STACK.map((tech) => (
              <li key={tech} className={marketing.techChip}>
                {tech}
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className={marketing.footer}>
        <div
          className={cx(
            marketing.section,
            'py-8 flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between'
          )}
        >
          <div>
            <div className="flex items-center gap-2">
              <LayoutGrid className={cx('h-5 w-5', icon.active)} />
              <span className="font-semibold">{PRODUCT_NAME}</span>
            </div>
            <p className={cx(text.muted, 'mt-1 text-sm')}>
              Workforce management, analytics and directory in one place.
            </p>
          </div>
          <nav aria-label="Social links" className="flex flex-wrap gap-4">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noreferrer"
              className={marketing.footerLink}
            >
              <img
                src={'/assets/GitHub_Invertocat_Black.svg'}
                className={marketing.socialIcon}
                alt=""
              />
              GitHub
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noreferrer"
              className={marketing.footerLink}
            >
              <img
                src={'/assets/linkedin.svg'}
                className={marketing.socialIcon}
                alt=""
              />
              LinkedIn
            </a>
          </nav>
        </div>
        <p
          className={cx(
            text.muted,
            'border-t border-line py-4 text-center text-xs'
          )}
        >
          © 2026 {PRODUCT_NAME}
        </p>
      </footer>
    </div>
  );
}
