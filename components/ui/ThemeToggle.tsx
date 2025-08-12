'use client'

import { useTheme } from '@/lib/theme'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-chat-hover border border-gray-600 transition-all duration-300 hover:scale-105"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-yellow-400 transition-transform duration-300" />
      ) : (
        <Moon className="w-4 h-4 text-blue-400 transition-transform duration-300" />
      )}
    </button>
  )
}
