import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

function PostLostItem() {
  const { theme } = useTheme()
  const [visible, setVisible] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    date: '',
    contact: ''
  })
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Lost Item:', formData, image)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const inputStyle = {
    width: '100%',
    padding: '13px 16px',
    borderRadius: '12px',
    border: `1.5px solid ${theme.inputBorder}`,
    background: theme.inputBg,
    color: theme.text,
    fontSize: '15px',
    fontFamily: 'Inter, sans-serif',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'all 0.3s ease',
    marginBottom: '16px'
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: theme.bg,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.6s ease',
      padding: '32px 24px'
    }}>

      <div style={{
        maxWidth: '600px',
        margin: '0 auto'
      }}>

        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '32px'
        }}>
          <div style={{
            display: 'inline-block',
            padding: '8px 20px',
            borderRadius: '50px',
            background: '#ff444422',
            color: '#ff4444',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: '700',
            fontSize: '12px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '12px'
          }}>
            ✦ Report Lost Item
          </div>
          <h1 style={{
            color: theme.text,
            fontFamily: 'Poppins, sans-serif',
            fontSize: '28px',
            fontWeight: '800',
            marginBottom: '8px'
          }}>
            Lost Something?
          </h1>
          <p style={{
            color: theme.subtext,
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px'
          }}>
            Fill in the details and we'll help you find it!
          </p>
        </div>

        {/* Form Card */}
        <div style={{
          background: theme.card,
          borderRadius: '24px',
          padding: '32px',
          boxShadow: `0 8px 32px ${theme.shadow}`,
          border: `1px solid #ff444422`
        }}>

          {/* Image Upload */}
          <div
            onClick={() => document.getElementById('imageInput').click()}
            style={{
              width: '100%',
              height: '180px',
              borderRadius: '16px',
              border: `2px dashed ${imagePreview ? theme.accent : '#ff444466'}`,
              background: imagePreview ? 'transparent' : '#ff444411',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px',
              cursor: 'pointer',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}
            onMouseEnter={e => e.currentTarget.style.border = `2px dashed ${theme.accent}`}
            onMouseLeave={e => e.currentTarget.style.border = `2px dashed ${imagePreview ? theme.accent : '#ff444466'}`}
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="preview"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '14px'
                }}
              />
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '36px', marginBottom: '8px' }}>📸</div>
                <p style={{
                  color: '#ff4444',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  Click to upload photo
                </p>
                <p style={{
                  color: theme.subtext,
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px'
                }}>
                  JPG, PNG supported
                </p>
              </div>
            )}
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              onChange={handleImage}
              style={{ display: 'none' }}
            />
          </div>

          {/* Item Title */}
          <input
            type="text"
            name="title"
            placeholder="Item Name (e.g. Black Wallet)"
            value={formData.title}
            onChange={handleChange}
            onFocus={e => e.target.style.boxShadow = `0 0 0 3px ${theme.accent}44`}
            onBlur={e => e.target.style.boxShadow = 'none'}
            style={inputStyle}
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Describe the item in detail..."
            value={formData.description}
            onChange={handleChange}
            onFocus={e => e.target.style.boxShadow = `0 0 0 3px ${theme.accent}44`}
            onBlur={e => e.target.style.boxShadow = 'none'}
            rows={4}
            style={{
              ...inputStyle,
              resize: 'none',
              lineHeight: '1.6'
            }}
          />

          {/* Category */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={{
              ...inputStyle,
              cursor: 'pointer'
            }}
          >
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="documents">Documents / ID Card</option>
            <option value="accessories">Accessories</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books / Notes</option>
            <option value="keys">Keys</option>
            <option value="bags">Bags</option>
            <option value="other">Other</option>
          </select>

          {/* Location */}
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            style={{
              ...inputStyle,
              cursor: 'pointer'
            }}
          >
            <option value="">Where did you lose it?</option>
            <option value="library">Library</option>
            <option value="canteen">Canteen</option>
            <option value="computer_lab">Computer Lab</option>
            <option value="main_gate">Main Gate</option>
            <option value="hostel_a">Hostel A</option>
            <option value="hostel_b">Hostel B</option>
            <option value="hostel_c">Hostel C</option>
            <option value="classroom">Classroom</option>
            <option value="sports_ground">Sports Ground</option>
            <option value="parking">Parking Area</option>
            <option value="other">Other</option>
          </select>

          {/* Date */}
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            style={{
              ...inputStyle,
              cursor: 'pointer',
              colorScheme: theme.isDark ? 'dark' : 'light'
            }}
          />

          {/* Contact */}
          <input
            type="text"
            name="contact"
            placeholder="Your contact number or email"
            value={formData.contact}
            onChange={handleChange}
            onFocus={e => e.target.style.boxShadow = `0 0 0 3px ${theme.accent}44`}
            onBlur={e => e.target.style.boxShadow = 'none'}
            style={inputStyle}
          />

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '14px',
              border: 'none',
              background: submitted
                ? 'linear-gradient(135deg, #00cc66, #00e676)'
                : 'linear-gradient(135deg, #ff4444, #ff6b6b)',
              color: '#ffffff',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.4s ease',
              fontSize: '16px',
              letterSpacing: '0.5px',
              boxShadow: submitted
                ? '0 6px 20px #00cc6666'
                : '0 6px 20px #ff444466'
            }}
            onMouseEnter={e => {
              e.target.style.transform = 'scale(1.02)'
            }}
            onMouseLeave={e => {
              e.target.style.transform = 'scale(1)'
            }}
          >
            {submitted ? 'Posted Successfully!' : 'Post Lost Item'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PostLostItem