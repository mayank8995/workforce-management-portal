import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import ErrorBoundary from '../Error/ErrorBoundary';
import ErrorBoundaryPage from '../Error/ErrorBoundaryPage';
import { surface } from '../../theme/theme';

function Home() {
  return (
    <ErrorBoundary fallback={<ErrorBoundaryPage />}>
      <div className={`md:flex md:flex-col h-screen ${surface.page}`}>
        <Header />
        <div
          className={`flex-col md:flex md:flex-row md:flex-1 h-auto md:overflow-hidden ${surface.page}`}
        >
          <Navigation />
          <div
            data-test="home"
            className={`flex-1 overflow-y-auto ${surface.page}`}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default Home;
