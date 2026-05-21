import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  const navLinks = [
    { path: '/home', label: '🏠 Home' },
    { path: '/post-lost', label: '😢 Lost' },
    { path: '/post-found', label: '🎉 Found' },
    { path: '/messages', label: '💬 Messages' },
    { path: '/notifications', label: '🔔 Notifications' },
    { path: '/profile', label: '👤 Profile' },
  ]

  return (
    <nav style={{
      background: theme.card,
      padding: '12px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: `0 2px 15px ${theme.shadow}`,
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      transition: 'all 0.3s ease'
    }}>
      {/* Logo */}
      <Link to="/home" style={{
        color: theme.accent,
        textDecoration: 'none',
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 'bold',
        fontSize: '20px'
      }}>
        🔍 Lost & Found
      </Link>

      {/* Nav Links */}
      <div style={{
        display: 'flex',
        gap: '8px',
        alignItems: 'center'
      }}>
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            style={{
              color: location.pathname === link.path ? theme.accent : theme.subtext,
              textDecoration: 'none',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              padding: '6px 12px',
              borderRadius: '8px',
              background: location.pathname === link.path ? `${theme.accent}22` : 'transparent',
              transition: 'all 0.3s ease',
              fontWeight: location.pathname === link.path ? 'bold' : 'normal'
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        style={{
          background: theme.isDark ? '#333333' : '#ffffff',
          border: `2px solid ${theme.accent}`,
          borderRadius: '50px',
          width: '70px',
          height: '35px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: theme.isDark ? 'flex-end' : 'flex-start',
          padding: '4px',
          transition: 'all 0.3s ease',
          boxShadow: `0 0 15px ${theme.shadow}`
        }}
      >
        <div style={{
          width: '25px',
          height: '25px',
          borderRadius: '50%',
          background: theme.accent,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          transition: 'all 0.3s ease'
        }}>
          {theme.isDark ? '🌙' : '☀️'}
        </div>
      </button>
    </nav>
  )
}

export default Navbar