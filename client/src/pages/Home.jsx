import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

function Home() {
  const { theme } = useTheme()
  const [visible, setVisible] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
  }, [])

  const dummyItems = [
    {
      id: 1,
      type: 'lost',
      title: 'Black Wallet',
      description: 'Lost near library, has student ID inside',
      category: 'accessories',
      location: 'Library',
      date: '2024-01-15',
      user: 'Rahul S.',
      hostel: 'Hostel A'
    },
    {
      id: 2,
      type: 'found',
      title: 'Blue Water Bottle',
      description: 'Found near canteen area',
      category: 'accessories',
      location: 'Canteen',
      date: '2024-01-15',
      user: 'Priya M.',
      hostel: 'Hostel B'
    },
    {
      id: 3,
      type: 'lost',
      title: 'Laptop Charger',
      description: 'Lost in computer lab, Dell charger',
      category: 'electronics',
      location: 'Computer Lab',
      date: '2024-01-14',
      user: 'Amit K.',
      hostel: 'Day Scholar'
    },
    {
      id: 4,
      type: 'found',
      title: 'Student ID Card',
      description: 'Found near main gate',
      category: 'documents',
      location: 'Main Gate',
      date: '2024-01-14',
      user: 'Sneha P.',
      hostel: 'Hostel C'
    },
  ]

  const filteredItems = dummyItems.filter(item => {
    const matchTab = activeTab === 'all' || item.type === activeTab
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  })

  const getCategoryIcon = (category) => {
    if (category === 'electronics') return '⚡'
    if (category === 'documents') return '📋'
    return '🎒'
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: theme.bg,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.6s ease'
    }}>

      {/* Hero Section */}
      <div style={{
        background: theme.isDark
          ? 'linear-gradient(135deg, #111111 0%, #1a1a1a 40%, #222222 70%, #1a1a1a 100%)'
          : 'linear-gradient(135deg, #fff9e6 0%, #ffffff 40%, #fff3cc 70%, #fffde7 100%)',
        padding: '50px 24px',
        textAlign: 'center',
        borderBottom: `2px solid ${theme.accent}33`,
        position: 'relative',
        overflow: 'hidden'
      }}>

        {/* Background blobs */}
        <div style={{
          position: 'absolute',
          top: '-80px',
          right: '-80px',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.accent}22, transparent)`,
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-60px',
          left: '-60px',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.accent}18, transparent)`,
          pointerEvents: 'none'
        }} />

        <h1 style={{
          color: theme.accent,
          fontFamily: 'Poppins, sans-serif',
          fontSize: '42px',
          fontWeight: '800',
          marginBottom: '8px',
          letterSpacing: '-1px',
          position: 'relative'
        }}>
          Lost & Found
        </h1>
        <p style={{
          color: theme.subtext,
          fontFamily: 'Inter, sans-serif',
          fontSize: '13px',
          marginBottom: '32px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          position: 'relative'
        }}>
          Sandip University Campus
        </p>

        {/* Stats */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
          marginBottom: '36px',
          flexWrap: 'wrap',
          position: 'relative'
        }}>
          {[
            { label: 'Items Lost', value: '24', color: '#ff4444' },
            { label: 'Items Found', value: '18', color: '#FFC700' },
            { label: 'Recovered', value: '12', color: '#00cc66' },
          ].map((stat) => (
            <div key={stat.label} style={{
              textAlign: 'center',
              background: theme.card,
              padding: '16px 28px',
              borderRadius: '16px',
              boxShadow: `0 4px 20px ${stat.color}22`,
              border: `1px solid ${stat.color}33`,
              minWidth: '100px'
            }}>
              <div style={{
                color: stat.color,
                fontFamily: 'Poppins, sans-serif',
                fontWeight: '800',
                fontSize: '32px',
                lineHeight: '1'
              }}>{stat.value}</div>
              <div style={{
                color: theme.subtext,
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                marginTop: '4px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Search Bar */}
        <div style={{
          maxWidth: '520px',
          margin: '0 auto',
          position: 'relative'
        }}>
          <input
            type="text"
            placeholder="Search lost or found items..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '16px 24px 16px 50px',
              borderRadius: '50px',
              border: `2px solid ${theme.accent}`,
              background: theme.card,
              color: theme.text,
              fontSize: '15px',
              fontFamily: 'Inter, sans-serif',
              boxSizing: 'border-box',
              outline: 'none',
              transition: 'all 0.3s ease',
              boxShadow: `0 4px 20px ${theme.shadow}`
            }}
            onFocus={e => e.target.style.boxShadow = `0 0 0 3px ${theme.accent}44`}
            onBlur={e => e.target.style.boxShadow = `0 4px 20px ${theme.shadow}`}
          />
          <span style={{
            position: 'absolute',
            left: '18px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: theme.accent,
            fontSize: '20px',
            fontWeight: 'bold'
          }}>⌕</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        padding: '20px',
        background: theme.card,
        borderBottom: `1px solid ${theme.accent}22`
      }}>
        {[
          { label: 'All Items', value: 'all' },
          { label: 'Lost', value: 'lost' },
          { label: 'Found', value: 'found' },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            style={{
              padding: '10px 28px',
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
              fontSize: '14px',
              letterSpacing: '0.5px',
              boxShadow: activeTab === tab.value ? `0 4px 15px ${theme.accent}44` : 'none'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '32px 24px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
        gap: '24px'
      }}>
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            style={{
              background: theme.card,
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: `0 4px 20px ${theme.shadow}`,
              border: `1px solid ${item.type === 'lost' ? '#ff444422' : '#00cc6622'}`,
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-8px)'
              e.currentTarget.style.boxShadow = `0 16px 40px ${theme.shadow}`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = `0 4px 20px ${theme.shadow}`
            }}
          >
            {/* Image Area */}
            <div style={{
              width: '100%',
              height: '160px',
              background: item.type === 'lost'
                ? 'linear-gradient(135deg, #ff444411, #ff444433)'
                : 'linear-gradient(135deg, #00cc6611, #00cc6633)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '52px',
              position: 'relative'
            }}>
              {getCategoryIcon(item.category)}

              {/* Attractive Badge */}
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                padding: '6px 16px',
                borderRadius: '50px',
                background: item.type === 'lost'
                  ? 'linear-gradient(135deg, #ff4444, #ff6b6b)'
                  : 'linear-gradient(135deg, #00cc66, #00e676)',
                color: '#ffffff',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: '700',
                fontSize: '10px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                boxShadow: item.type === 'lost'
                  ? '0 4px 15px #ff444466'
                  : '0 4px 15px #00cc6666',
                border: '1px solid rgba(255,255,255,0.3)'
              }}>
                {item.type === 'lost' ? '✦ LOST' : '✦ FOUND'}
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: '20px' }}>
              <h3 style={{
                color: theme.text,
                fontFamily: 'Poppins, sans-serif',
                marginBottom: '8px',
                fontSize: '17px',
                fontWeight: '700'
              }}>
                {item.title}
              </h3>
              <p style={{
                color: theme.subtext,
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                marginBottom: '16px',
                lineHeight: '1.5'
              }}>
                {item.description}
              </p>

              {/* Tags */}
              <div style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '16px',
                flexWrap: 'wrap'
              }}>
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '6px',
                  background: `${theme.accent}22`,
                  color: theme.accent,
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  fontWeight: '600'
                }}>
                  {item.location}
                </span>
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '6px',
                  background: `${theme.accent}22`,
                  color: theme.accent,
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  fontWeight: '600'
                }}>
                  {item.date}
                </span>
              </div>

              {/* User Info */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: `1px solid ${theme.accent}22`,
                paddingTop: '14px',
                marginBottom: '16px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#1a1a1a',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: '700',
                    fontSize: '14px'
                  }}>
                    {item.user.charAt(0)}
                  </div>
                  <span style={{
                    color: theme.text,
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    fontWeight: '600'
                  }}>
                    {item.user}
                  </span>
                </div>
                <span style={{
                  color: theme.subtext,
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  background: theme.inputBg,
                  padding: '4px 10px',
                  borderRadius: '6px'
                }}>
                  {item.hostel}
                </span>
              </div>

              {/* Contact Button */}
              <button
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '12px',
                  border: 'none',
                  background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`,
                  color: '#1a1a1a',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  letterSpacing: '0.5px'
                }}
                onMouseEnter={e => {
                  e.target.style.transform = 'scale(1.03)'
                  e.target.style.boxShadow = `0 6px 20px ${theme.accent}66`
                }}
                onMouseLeave={e => {
                  e.target.style.transform = 'scale(1)'
                  e.target.style.boxShadow = 'none'
                }}
              >
                Contact Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home