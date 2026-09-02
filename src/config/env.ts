export const getEnv = () => ({
  apiUrl: import.meta.env.VITE_API_URL,
  email: import.meta.env.VITE_GUEST_EMAIL,
  password: import.meta.env.VITE_GUEST_PASSWORD,
});
