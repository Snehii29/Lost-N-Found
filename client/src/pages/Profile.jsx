import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

function Profile() {
  const { theme } = useTheme()
  const [visible, setVisible] = useState(false)
  const [activeTab, setActiveTab] = useState('lost')
  const [editMode, setEditMode] = useState(false)
  const [profileImage, setProfileImage] = useState(null)
  const [profileImagePreview, setProfileImagePreview] = useState(null)
  const [user, setUser] = useState({
    name: 'Snehal Talekar',
    department: 'Computer Science',
    year: 'Third Year',
    hostel: 'Hostel A',
    email: 'snehal@sandipuniversity.edu.in',
    phone: '9876543210',
    bio: 'CS Student at Sandip University, Nashik',
    rating: 4.8,
    totalReviews: 12,
    itemsLost: 3,
    itemsFound: 7,
    itemsRecovered: 5,
    badges: [
      { name: 'Good Samaritan', icon: '🏅', color: '#FFC700' },
      { name: 'Trusted Finder', icon: '⭐', color: '#00cc66' },
      { name: 'Helper', icon: '🎖️', color: '#ff4444' },
    ]
  })

  const [editData, setEditData] = useState({ ...user })

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
  }, [])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileImage(file)
      setProfileImagePreview(URL.createObjectURL(file))
    }
  }

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    setUser({ ...editData })
    setEditMode(false)
  }

  const handleCancel = () => {
    setEditData({ ...user })
    setEditMode(false)
  }

  const myItems = {
    lost: [
      { id: 1, title: 'Black Wallet', location: 'Library', date: '2024-01-15', status: 'active' },
      { id: 2, title: 'Laptop Charger', location: 'Computer Lab', date: '2024-01-10', status: 'recovered' },
    ],
    found: [
      { id: 3, title: 'Blue Water Bottle', location: 'Canteen', date: '2024-01-14', status: 'active' },
      { id: 4, title: 'Student ID Card', location: 'Main Gate', date: '2024-01-12', status: 'claimed' },
    ]
  }

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '10px',
    border: `1.5px solid ${theme.accent}`,
    background: theme.inputBg,
    color: theme.text,
    fontSize: '14px',
    fontFamily: 'Inter, sans-serif',
    boxSizing: 'border-box',
    outline: 'none',
    marginBottom: '12px',
    transition: 'all 0.3s ease'
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
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        {/* Profile Card */}
        <div style={{
          background: theme.card,
          borderRadius: '24px',
          padding: '32px',
          boxShadow: `0 8px 32px ${theme.shadow}`,
          border: `1px solid ${theme.accent}22`,
          marginBottom: '24px',
          position: 'relative',
          overflow: 'hidden'
        }}>

          {/* Background decoration */}
          <div style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${theme.accent}22, transparent)`,
            pointerEvents: 'none'
          }} />

          {/* Top Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '24px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              flexWrap: 'wrap'
            }}>
              {/* Avatar */}
              <div style={{ position: 'relative' }}>
                <div style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  background: profileImagePreview
                    ? 'transparent'
                    : `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#1a1a1a',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '800',
                  fontSize: '32px',
                  boxShadow: `0 4px 20px ${theme.accent}44`,
                  overflow: 'hidden',
                  flexShrink: 0
                }}>
                  {profileImagePreview ? (
                    <img
                      src={profileImagePreview}
                      alt="profile"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    user.name.charAt(0)
                  )}
                </div>

                {/* Edit photo button */}
                <div
                  onClick={() => document.getElementById('profileImageInput').click()}
                  style={{
                    position: 'absolute',
                    bottom: '0',
                    right: '0',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: theme.accent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '14px',
                    boxShadow: `0 2px 8px ${theme.accent}66`,
                    border: `2px solid ${theme.card}`
                  }}
                >
                  📷
                </div>
                <input
                  id="profileImageInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </div>

              {/* Name & Info */}
              {!editMode ? (
                <div>
                  <h1 style={{
                    color: theme.text,
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '24px',
                    fontWeight: '800',
                    marginBottom: '4px'
                  }}>
                    {user.name}
                  </h1>
                  <p style={{
                    color: theme.accent,
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '4px'
                  }}>
                    {user.department} • {user.year}
                  </p>
                  <p style={{
                    color: theme.subtext,
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    marginBottom: '4px'
                  }}>
                    {user.hostel} • {user.email}
                  </p>
                  <p style={{
                    color: theme.subtext,
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    fontStyle: 'italic'
                  }}>
                    "{user.bio}"
                  </p>
                </div>
              ) : null}
            </div>

            {/* Edit Button */}
            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '50px',
                  border: `2px solid ${theme.accent}`,
                  background: 'transparent',
                  color: theme.accent,
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px'
                }}
                onMouseEnter={e => {
                  e.target.style.background = theme.accent
                  e.target.style.color = '#1a1a1a'
                }}
                onMouseLeave={e => {
                  e.target.style.background = 'transparent'
                  e.target.style.color = theme.accent
                }}
              >
                Edit Profile
              </button>
            ) : null}
          </div>

          {/* Edit Form */}
          {editMode && (
            <div style={{
              background: theme.inputBg,
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '24px',
              border: `1px solid ${theme.accent}33`
            }}>
              <h3 style={{
                color: theme.accent,
                fontFamily: 'Poppins, sans-serif',
                fontSize: '16px',
                fontWeight: '700',
                marginBottom: '16px'
              }}>
                Edit Profile
              </h3>

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={editData.name}
                onChange={handleEditChange}
                style={inputStyle}
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={editData.phone}
                onChange={handleEditChange}
                style={inputStyle}
              />

              <select
                name="department"
                value={editData.department}
                onChange={handleEditChange}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Computer">Computer</option>
                <option value="Information Technology">Information Technology</option>
                <option value="ENTC">ENTC</option>
                <option value="AIML">AIML</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Civil">Civil</option>
                <option value="Electrical">Electrical</option>
                <option value="Robotics">Robotics</option>
                <option value="MBA">MBA</option>
                <option value="BCA">BCA</option>
                <option value="MCA">MCA</option>
                <option value="Law">Law</option>
                <option value="Diploma">Diploma</option>
                <option value="Jr. College Science">Jr. College Science</option>
                <option value="Jr. College Commerce">Jr. College Commerce</option>
                <option value="Pharmacy">Pharmacy</option>
                <option value="Forensic">Forensic</option>
                <option value="Designing">Designing</option>
                <option value="Other">Other</option>
              </select>

              <select
                name="year"
                value={editData.year}
                onChange={handleEditChange}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                <option value="First Year">First Year</option>
                <option value="Second Year">Second Year</option>
                <option value="Third Year">Third Year</option>
                <option value="Fourth Year">Fourth Year</option>
              </select>

              <input
                type="text"
                name="hostel"
                placeholder="Hostel Name"
                value={editData.hostel}
                onChange={handleEditChange}
                style={inputStyle}
              />

              <textarea
                name="bio"
                placeholder="Write your bio..."
                value={editData.bio}
                onChange={handleEditChange}
                rows={3}
                style={{
                  ...inputStyle,
                  resize: 'none',
                  lineHeight: '1.6'
                }}
              />

              {/* Save & Cancel Buttons */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={handleSave}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '12px',
                    border: 'none',
                    background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`,
                    color: '#1a1a1a',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: '14px'
                  }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.02)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '12px',
                    border: `2px solid ${theme.subtext}44`,
                    background: 'transparent',
                    color: theme.subtext,
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: '14px'
                  }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.02)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Stats */}
          <div style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '24px',
            flexWrap: 'wrap'
          }}>
            {[
              { label: 'Items Lost', value: user.itemsLost, color: '#ff4444' },
              { label: 'Items Found', value: user.itemsFound, color: '#00cc66' },
              { label: 'Recovered', value: user.itemsRecovered, color: '#FFC700' },
            ].map((stat) => (
              <div key={stat.label} style={{
                flex: 1,
                minWidth: '80px',
                textAlign: 'center',
                background: theme.inputBg,
                padding: '14px',
                borderRadius: '14px',
                border: `1px solid ${stat.color}33`
              }}>
                <div style={{
                  color: stat.color,
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '800',
                  fontSize: '24px'
                }}>{stat.value}</div>
                <div style={{
                  color: theme.subtext,
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Rating */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '16px 20px',
            borderRadius: '14px',
            background: theme.inputBg,
            border: `1px solid ${theme.accent}33`,
            marginBottom: '24px'
          }}>
            <div style={{
              color: theme.accent,
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '800',
              fontSize: '32px'
            }}>
              {user.rating}
            </div>
            <div>
              <div style={{ color: '#FFC700', fontSize: '18px', marginBottom: '2px' }}>
                ★★★★★
              </div>
              <div style={{
                color: theme.subtext,
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px'
              }}>
                Based on {user.totalReviews} reviews
              </div>
            </div>
          </div>

          {/* Badges */}
          <div>
            <h3 style={{
              color: theme.text,
              fontFamily: 'Poppins, sans-serif',
              fontSize: '16px',
              fontWeight: '700',
              marginBottom: '12px'
            }}>
              Badges & Achievements
            </h3>
            <div style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap'
            }}>
              {user.badges.map((badge) => (
                <div key={badge.name} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '50px',
                  background: `${badge.color}22`,
                  border: `1px solid ${badge.color}44`,
                  boxShadow: `0 4px 12px ${badge.color}22`
                }}>
                  <span style={{ fontSize: '18px' }}>{badge.icon}</span>
                  <span style={{
                    color: badge.color,
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: '700',
                    fontSize: '12px'
                  }}>
                    {badge.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* My Items */}
        <div style={{
          background: theme.card,
          borderRadius: '24px',
          padding: '32px',
          boxShadow: `0 8px 32px ${theme.shadow}`,
          border: `1px solid ${theme.accent}22`
        }}>
          <h2 style={{
            color: theme.text,
            fontFamily: 'Poppins, sans-serif',
            fontSize: '20px',
            fontWeight: '800',
            marginBottom: '20px'
          }}>
            My Items
          </h2>

          {/* Tabs */}
          <div style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '20px'
          }}>
            {[
              { label: 'Lost Items', value: 'lost' },
              { label: 'Found Items', value: 'found' },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                style={{
                  padding: '8px 24px',
                  borderRadius: '50px',
                  border: `2px solid ${activeTab === tab.value ? theme.accent : theme.subtext + '44'}`,
                  background: activeTab === tab.value
                    ? `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`
                    : 'transparent',
                  color: activeTab === tab.value ? '#1a1a1a' : theme.subtext,
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Items List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {myItems[activeTab].map((item) => (
              <div key={item.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderRadius: '14px',
                background: theme.inputBg,
                border: `1px solid ${theme.accent}22`,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateX(4px)'
                e.currentTarget.style.boxShadow = `0 4px 15px ${theme.shadow}`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateX(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
              >
                <div>
                  <h4 style={{
                    color: theme.text,
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '15px',
                    fontWeight: '700',
                    marginBottom: '4px'
                  }}>
                    {item.title}
                  </h4>
                  <p style={{
                    color: theme.subtext,
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px'
                  }}>
                    {item.location} • {item.date}
                  </p>
                </div>
                <div style={{
                  padding: '4px 14px',
                  borderRadius: '50px',
                  background: item.status === 'active'
                    ? '#FFC70022'
                    : item.status === 'recovered'
                    ? '#00cc6622'
                    : '#ff444422',
                  color: item.status === 'active'
                    ? '#FFC700'
                    : item.status === 'recovered'
                    ? '#00cc66'
                    : '#ff4444',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '700',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  {item.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile