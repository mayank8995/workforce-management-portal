import apiClient from '../../../services/http-common.service';
import { render, screen } from '@testing-library/react';
import Login from '../Login';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../../../context/AuthContext';
import { ModalProvider } from '../../../context/ModalContext';
import { ToastContainer } from 'react-toastify';
import { LoaderFlagProvider } from '../../../context/Loadercontext';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const mockedApi = apiClient as jest.Mocked<typeof apiClient>;

function renderPage() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ModalProvider>
          <ToastContainer autoClose={1000} />
          <LoaderFlagProvider>
            <MemoryRouter initialEntries={['/auth']}>
              <Login onCustomEvent={() => {}} isGuest={false} />
            </MemoryRouter>
          </LoaderFlagProvider>
        </ModalProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
test('Renders the Login page', () => {
  render(renderPage());
  expect(screen.getByRole('button', { name: /Sign in/i })).toBeTruthy();
});

test('Logins successfully', async () => {
  mockedApi.post.mockResolvedValue({
    token: 'efdgdfogfdogfdgfd.dgwegsgfg.gsdsgsds',
    user: {
      id: '1786258116300',
      name: 'Mayank Gupta',
    },
    message: 'Logged in successfully',
  });
  const user = userEvent.setup();
  const { container } = render(renderPage());
  await user.type(container.querySelector('#email')!, 'test@ad.com');
  await user.type(container.querySelector('#password')!, '987654');
  await user.click(screen.getByRole('button', { name: /Sign in/i }));
  expect(mockedApi.post).toHaveBeenCalledWith('/login', expect.anything());
});
