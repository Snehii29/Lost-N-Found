import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

function Register() {
  const { theme, toggleTheme } = useTheme()
  const [visible, setVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    department: '',
    year: '',
    hostel: ''
  })

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    console.log('Register clicked', formData)
  }

  const inputStyle = {
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
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: theme.bg,
      transition: 'all 0.3s ease',
      padding: '20px'
    }}>

     
      <div style={{
        background: theme.card,
        padding: '40px',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '450px',
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
          Join Us! 🎓
        </h1>
        <p style={{
          color: theme.subtext,
          textAlign: 'center',
          marginBottom: '32px',
          fontFamily: 'Inter, sans-serif'
        }}>
          Create your Sandipian account 
        </p>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          onFocus={e => e.target.style.boxShadow = `0 0 0 2px ${theme.accent}`}
          onBlur={e => e.target.style.boxShadow = 'none'}
          style={inputStyle}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          onFocus={e => e.target.style.boxShadow = `0 0 0 2px ${theme.accent}`}
          onBlur={e => e.target.style.boxShadow = 'none'}
          style={inputStyle}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          onFocus={e => e.target.style.boxShadow = `0 0 0 2px ${theme.accent}`}
          onBlur={e => e.target.style.boxShadow = 'none'}
          style={inputStyle}
        />

        <select
        name="department"
        value={formData.department}
        onChange={handleChange}
        style={{
            ...inputStyle,
            cursor: 'pointer'
        }}
        >
        <option value="">Select Department</option>
        <option value="computer">Computer</option>
        <option value="cs">Computer Science</option>
        <option value="it">Information Technology</option>
        <option value="entc">ENTC</option>
        <option value="aiml">AIML</option>
        <option value="aids">AIDS</option>
        <option value="mechanical">Mechanical</option>
        <option value="civil">Civil</option>
        <option value="electrical">Electrical</option>
        <option value="robotics">Robotics</option>
        <option value="mba">MBA</option>
        <option value="bca">BCA</option>
        <option value="mca">MCA</option>
        <option value="law">Law</option>
        <option value="diploma">Diploma</option>
        <option value="jr_science">Jr. College Science</option>
        <option value="jr_commerce">Jr. College Commerce</option>
        <option value="pharmacy">Pharmacy</option>
        <option value="forensic">Forensic</option>
        <option value="designing">Designing</option>
        <option value="other">Other</option>
</select>

        <select
          name="year"
          value={formData.year}
          onChange={handleChange}
          style={{
            ...inputStyle,
            cursor: 'pointer'
          }}
        >
          <option value="">Select Year</option>
          <option value="1">First Year</option>
          <option value="2">Second Year</option>
          <option value="3">Third Year</option>
          <option value="4">Fourth Year</option>
        </select>

        <input
          type="text"
          name="hostel"
          placeholder="Hostel Name (optional)"
          value={formData.hostel}
          onChange={handleChange}
          onFocus={e => e.target.style.boxShadow = `0 0 0 2px ${theme.accent}`}
          onBlur={e => e.target.style.boxShadow = 'none'}
          style={inputStyle}
        />

        <button
          onClick={handleRegister}
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
          Create Account 
        </button>

        <p style={{
          color: theme.subtext,
          textAlign: 'center',
          marginTop: '24px',
          fontFamily: 'Inter, sans-serif'
        }}>
          Already have an account?{' '}
          <Link to="/" style={{ color: theme.accent }}>Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register