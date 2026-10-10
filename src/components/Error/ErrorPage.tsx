import type { QueryClientConfigProps } from '../../types/types';
import { button, text } from '../../theme/theme';

/** Inline error state with an optional retry action. */
const ErrorPage = ({ refetchAll }: QueryClientConfigProps) => {
  return (
    <div className="m-10 p-6 sm:p-0 flex flex-col justify-center items-center h-fit">
      <div className="w-15 h-15 rounded-lg mb-2">
        <img
          src={'/assets/connection_error_icon.svg'}
          className="w-full h-full object-cover"
        />
      </div>
      <p
        className={`text-sm font-medium ${text.danger} mb-2 text-center text-balance`}
      >
        Something went wrong!
      </p>
      <h1 className={`text-2xl font-semibold ${text.primary} mb-3`}>
        Couldn't load.
      </h1>
      <p className={`${text.muted} text-sm mb-8 text-center text-balance`}>
        There was a problem connecting to the server. Please try again.
      </p>

      {refetchAll && (
        <button onClick={() => refetchAll?.()} className={button.primary}>
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorPage;
