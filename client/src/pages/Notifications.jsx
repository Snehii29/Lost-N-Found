import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

function Notifications() {
  const { theme } = useTheme()
  const [visible, setVisible] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'match',
      title: 'Potential Match Found!',
      message: 'Your lost Black Wallet might have been found near Library',
      time: '2 mins ago',
      read: false,
      color: '#FFC700'
    },
    {
      id: 2,
      type: 'hostel',
      title: 'Hostel A Alert!',
      message: 'Someone found a Laptop Charger in your hostel area',
      time: '15 mins ago',
      read: false,
      color: '#00cc66'
    },
    {
      id: 3,
      type: 'message',
      title: 'New Message from Rahul S.',
      message: 'Hey! Is this your wallet? Can you describe whats inside?',
      time: '30 mins ago',
      read: false,
      color: '#FFC700'
    },
    {
      id: 4,
      type: 'badge',
      title: 'Badge Earned!',
      message: 'Congratulations! You earned the Good Samaritan badge',
      time: '1 hour ago',
      read: true,
      color: '#ff4444'
    },
    {
      id: 5,
      type: 'match',
      title: 'Item Claimed!',
      message: 'Someone has claimed the Blue Water Bottle you found',
      time: '2 hours ago',
      read: true,
      color: '#00cc66'
    },
    {
      id: 6,
      type: 'hostel',
      title: 'Hostel A Alert!',
      message: 'New lost item reported in your hostel area - Student ID Card',
      time: '3 hours ago',
      read: true,
      color: '#00cc66'
    },
    {
      id: 7,
      type: 'badge',
      title: 'New Badge Unlocked!',
      message: 'You earned the Trusted Finder badge for helping 5 people!',
      time: '1 day ago',
      read: true,
      color: '#ff4444'
    },
  ])

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
  }, [])

  const getIcon = (type) => {
    if (type === 'match') return '🎯'
    if (type === 'hostel') return '🏠'
    if (type === 'message') return '💬'
    if (type === 'badge') return '🏅'
    return '🔔'
  }

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'all') return true
    if (activeTab === 'unread') return !n.read
    return n.type === activeTab
  })

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const markRead = (id) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div style={{
      minHeight: '100vh',
      background: theme.bg,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.6s ease',
      padding: '32px 24px'
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            <h1 style={{
              color: theme.text,
              fontFamily: 'Poppins, sans-serif',
              fontSize: '28px',
              fontWeight: '800',
              marginBottom: '4px'
            }}>
              Notifications
            </h1>
            {unreadCount > 0 && (
              <p style={{
                color: theme.accent,
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                {unreadCount} unread notifications
              </p>
            )}
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              style={{
                padding: '10px 20px',
                borderRadius: '50px',
                border: `2px solid ${theme.accent}`,
                background: 'transparent',
                color: theme.accent,
                fontFamily: 'Poppins, sans-serif',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '13px'
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
              Mark all read
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '24px',
          flexWrap: 'wrap'
        }}>
          {[
            { label: 'All', value: 'all' },
            { label: 'Unread', value: 'unread' },
            { label: 'Matches', value: 'match' },
            { label: 'Hostel', value: 'hostel' },
            { label: 'Messages', value: 'message' },
            { label: 'Badges', value: 'badge' },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              style={{
                padding: '8px 18px',
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
                fontSize: '13px',
                boxShadow: activeTab === tab.value
                  ? `0 4px 12px ${theme.accent}44`
                  : 'none'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {filteredNotifications.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '48px',
              color: theme.subtext,
              fontFamily: 'Inter, sans-serif'
            }}>
              No notifications found
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => markRead(notification.id)}
                style={{
                  background: theme.card,
                  borderRadius: '16px',
                  padding: '18px 20px',
                  boxShadow: `0 4px 15px ${theme.shadow}`,
                  border: `1px solid ${notification.read ? theme.accent + '11' : notification.color + '33'}`,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start',
                  position: 'relative',
                  opacity: notification.read ? 0.75 : 1
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateX(6px)'
                  e.currentTarget.style.boxShadow = `0 8px 25px ${theme.shadow}`
                  e.currentTarget.style.opacity = '1'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateX(0)'
                  e.currentTarget.style.boxShadow = `0 4px 15px ${theme.shadow}`
                  e.currentTarget.style.opacity = notification.read ? '0.75' : '1'
                }}
              >
                {/* Icon */}
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  background: `${notification.color}22`,
                  border: `1px solid ${notification.color}44`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px',
                  flexShrink: 0,
                  boxShadow: `0 4px 12px ${notification.color}22`
                }}>
                  {getIcon(notification.type)}
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '6px',
                    gap: '8px'
                  }}>
                    <h3 style={{
                      color: theme.text,
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '15px',
                      fontWeight: '700'
                    }}>
                      {notification.title}
                    </h3>
                    <span style={{
                      color: theme.subtext,
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '11px',
                      flexShrink: 0
                    }}>
                      {notification.time}
                    </span>
                  </div>
                  <p style={{
                    color: theme.subtext,
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    lineHeight: '1.5'
                  }}>
                    {notification.message}
                  </p>
                </div>

                {/* Unread dot */}
                {!notification.read && (
                  <div style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: notification.color,
                    flexShrink: 0,
                    marginTop: '4px',
                    boxShadow: `0 0 8px ${notification.color}`
                  }} />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Notifications