import { createContext, useState, useContext } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(true)

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const theme = {
    // Backgrounds
    bg: isDark ? '#1a1a1a' : '#f5f5f5',
    card: isDark ? '#222222' : '#ffffff',
    
    // Text
    text: isDark ? '#ffffff' : '#1a1a1a',
    subtext: isDark ? '#888888' : '#555555',
    
    // Accent - Bumble Yellow
    accent: '#FFC700',
    accentDark: '#e6b300',
    
    // Input
    inputBg: isDark ? '#111111' : '#eeeeee',
    inputBorder: isDark ? '#FFC700' : '#FFC700',
    
    // Shadow
    shadow: isDark ? 'rgba(255,199,0,0.15)' : 'rgba(255,199,0,0.3)',
    
    isDark
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}