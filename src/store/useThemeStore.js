import { create } from 'zustand';

const useThemeStore = create((set) => ({
  theme: localStorage.getItem('talkaty-theme') || 'coffee',
  setTheme: (theme) => {
    localStorage.setItem('talkaty-theme', theme);
    set({ theme });
  },
}));

export default useThemeStore;
