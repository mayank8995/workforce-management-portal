import { fireEvent, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';
import { AuthProvider } from '../context/AuthContext';
import { ModalProvider } from '../context/ModalContext';
import { ToastContainer } from 'react-toastify';
import { LoaderFlagProvider } from '../context/Loadercontext';
import { MemoryRouter } from 'react-router-dom';

function renderPage() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ModalProvider>
          <ToastContainer autoClose={1000} />
          <LoaderFlagProvider>
            <MemoryRouter initialEntries={['/auth']}>
              <App />
            </MemoryRouter>
          </LoaderFlagProvider>
        </ModalProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

test('Renders the main page', () => {
  render(renderPage());
  expect(screen.getByRole('button', { name: /Sign in/i })).toBeTruthy();
});

test('Renders the Form Error', () => {
  const { container } = render(renderPage());
  const btn = screen.getByRole('button', { name: /Sign in/i });
  fireEvent.click(btn);
  expect(container.querySelector('#email-error-message')?.textContent).toBe(
    'Invalid email address'
  );
});
