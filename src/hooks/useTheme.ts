import { useQuery, useQueryClient } from '@tanstack/react-query';

const THEME_KEY = ['theme'];

export function useTheme() {
  const queryClient = useQueryClient();

  // 1. Fetch or initialize the static data
  const { data: theme = 'dark' } = useQuery({
    queryKey: THEME_KEY,
    queryFn: () => {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme || 'dark';
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', nextTheme);
    queryClient.setQueryData(THEME_KEY, nextTheme);
  };

  return { theme, toggleTheme };
}
