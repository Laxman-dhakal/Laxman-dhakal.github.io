import { useEffect, useState } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('theme');
      const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      const initial = stored || system;
      setTheme(initial);
      document.documentElement.classList.toggle('dark', initial === 'dark');
      setMounted(true);
    } catch (error) {
      setTheme('light');
      setMounted(true);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem('theme', theme);
    } catch (error) {
      console.error(error);
    }
  }, [theme, mounted]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return { theme, toggleTheme, mounted };
};

export default useTheme;
