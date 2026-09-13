import { captureOwnerStack, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext.tsx';
import { LoaderFlagProvider } from './context/Loadercontext.tsx';
import { ModalProvider } from './context/ModalContext.tsx';
import { router } from './router/router.tsx';

const queryClient = new QueryClient();

export function onConsoleError({
  consoleMessage,
  ownerStack,
}: {
  consoleMessage: string | null;
  ownerStack: string | null;
}) {
  const errorDialog = document.getElementById('error-dialog');
  const errorBody = document.getElementById('error-body');
  const errorOwnerStack = document.getElementById('error-owner-stack');

  if (!errorDialog || !errorBody || !errorOwnerStack) {
    return;
  }
  // Display console.error() message
  errorBody.innerText = consoleMessage ?? 'Unknown error';

  // Display owner stack
  errorOwnerStack.innerText = ownerStack ?? 'No owner stack available';

  // Show the dialog
  errorDialog.classList.remove('hidden');
}
// const originalConsoleError = console.error;
// console.error = function patchedConsoleError(...args) {
//   originalConsoleError.apply(console, args);
//   const ownerStack = captureOwnerStack();
//   onConsoleError({
//     // Keep in mind that in a real application, console.error can be
//     // called with multiple arguments which you should account for.
//     consoleMessage: args[0],
//     ownerStack,
//   });
// };

createRoot(document.getElementById('root')!, {
  onUncaughtError: (error, errorInfo) => {
    // Errors not caught by any error boundary
    console.error('Uncaught error:', error, errorInfo.componentStack);
    console.log(captureOwnerStack());
  },
  onCaughtError: (error, errorInfo) => {
    // Errors caught by an error boundary
    console.error('Caught error:', error, errorInfo.componentStack);
  },
  onRecoverableError: (error, errorInfo) => {
    // Errors React recovered from automatically (e.g. hydration mismatches)
    console.error('Recoverable error:', error, errorInfo.componentStack);
  },
}).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ModalProvider>
          <ToastContainer autoClose={1000} />
          <LoaderFlagProvider>
            <RouterProvider router={router} />
          </LoaderFlagProvider>
        </ModalProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
