import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

function Login() {
  const { theme, toggleTheme } = useTheme()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    console.log('Login clicked', email, password)
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: theme.bg,
      transition: 'all 0.3s ease'
    }}>
      
      <div style={{
        background: theme.card,
        padding: '40px',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: `0 0 30px ${theme.shadow}`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.6s ease'
      }}>
        <h1 style={{
          color: theme.accent,
          textAlign: 'center',
          marginBottom: '8px',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '28px'
        }}>
          Lost N Found 🔍
        </h1>
        <p style={{
          color: theme.subtext,
          textAlign: 'center',
          marginBottom: '32px',
          fontFamily: 'Inter, sans-serif'
        }}>
          Welcome back, Sandipian!
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={e => e.target.style.boxShadow = `0 0 0 2px ${theme.accent}`}
          onBlur={e => e.target.style.boxShadow = 'none'}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '16px',
            borderRadius: '8px',
            border: `1px solid ${theme.inputBorder}`,
            background: theme.inputBg,
            color: theme.text,
            fontSize: '16px',
            fontFamily: 'Inter, sans-serif',
            boxSizing: 'border-box',
            outline: 'none',
            transition: 'box-shadow 0.3s ease'
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={e => e.target.style.boxShadow = `0 0 0 2px ${theme.accent}`}
          onBlur={e => e.target.style.boxShadow = 'none'}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '24px',
            borderRadius: '8px',
            border: `1px solid ${theme.inputBorder}`,
            background: theme.inputBg,
            color: theme.text,
            fontSize: '16px',
            fontFamily: 'Inter, sans-serif',
            boxSizing: 'border-box',
            outline: 'none',
            transition: 'box-shadow 0.3s ease'
          }}
        />

        <button
          onClick={handleLogin}
          onMouseEnter={e => {
            e.target.style.background = theme.accentDark
            e.target.style.transform = 'scale(1.02)'
          }}
          onMouseLeave={e => {
            e.target.style.background = theme.accent
            e.target.style.transform = 'scale(1)'
          }}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: 'none',
            background: theme.accent,
            color: '#1a1a1a',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontFamily: 'Poppins, sans-serif',
            transition: 'all 0.3s ease'
          }}
        >
          Login
        </button>

        <p style={{
          color: theme.subtext,
          textAlign: 'center',
          marginTop: '24px',
          fontFamily: 'Inter, sans-serif'
        }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: theme.accent }}>Register</Link>
        </p>
      </div>
    </div>
  )
}

export default Login