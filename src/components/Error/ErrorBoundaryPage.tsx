import { text } from '../../theme/theme';

/** Full-page fallback shown when rendering throws. */
const ErrorBoundaryPage = () => {
  return (
    <div className="p-6 sm:p-0 flex flex-col justify-center items-center h-screen max-h-screen">
      <div className="w-37.5 md:w-50 rounded-lg mb-2">
        <img
          src={'/assets/ui-error-bordered.svg'}
          className="object-cover"
          alt="User interface error logo"
        />
      </div>
      <p
        className={`text-sm md:text-xl font-medium ${text.danger} mb-2 text-center text-balance`}
      >
        Something went wrong!
      </p>
      <p
        className={`${text.muted} text-xs sm:text-sm mb-8 text-center text-balance`}
      >
        There was a problem in rendering. Please Contact the developer.
      </p>
    </div>
  );
};

export default ErrorBoundaryPage;
