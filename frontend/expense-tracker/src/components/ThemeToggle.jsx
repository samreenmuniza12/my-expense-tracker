import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { LuSun, LuMoon } from 'react-icons/lu'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
    >
      {theme === 'light' ? <LuMoon size={16} /> : <LuSun size={16} />}
    </button>
  );
};

export default ThemeToggle;