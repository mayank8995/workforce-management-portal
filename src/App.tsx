import { useEffect, useLayoutEffect, useState } from 'react';
import './App.css';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import ErrorBoundary from './components/Error/ErrorBoundary';
import ErrorBoundaryPage from './components/Error/ErrorBoundaryPage';
// import { useSearchParams } from 'react-router-dom';
import { LandingWrapper } from './pages/landingwrapper/LandingWrapper';
import { prefetchDashboard } from './router/router';

function App() {
  const [show, setShow] = useState<boolean>(true);
  // const [searchParams] = useSearchParams();
  // const isGuest = searchParams?.get('isGuest') === 'true';
  useEffect(() => {
    const supportsIdle = typeof window.requestIdleCallback === 'function';
    const id = supportsIdle
      ? window.requestIdleCallback(prefetchDashboard, { timeout: 3000 })
      : window.setTimeout(prefetchDashboard, 2000);

    return () => {
      if (supportsIdle) window.cancelIdleCallback(id);
      else window.clearTimeout(id);
    };
  }, []);
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (
      !localStorage.getItem('theme') ||
      localStorage.getItem('theme') === 'dark'
    ) {
      root.setAttribute('data-theme', 'dark');
    }
  }, []);
  return (
    <ErrorBoundary fallback={<ErrorBoundaryPage />}>
      <LandingWrapper>
        {show ? (
          <Login
            // isGuest={isGuest}
            onCustomEvent={(flag: boolean) => setShow(flag)}
          />
        ) : (
          <Signup onCustomEvent={() => setShow((flag) => !flag)} />
        )}
      </LandingWrapper>
    </ErrorBoundary>
  );
}

export default App;
