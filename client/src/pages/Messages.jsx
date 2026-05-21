import { useState, useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'

function Messages() {
  const { theme } = useTheme()
  const [visible, setVisible] = useState(false)
  const [activeChat, setActiveChat] = useState(0)
  const [message, setMessage] = useState('')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeChat])

  const chats = [
    {
      id: 0,
      name: 'Rahul S.',
      hostel: 'Hostel A',
      item: 'Black Wallet',
      lastMessage: 'Is this your wallet?',
      time: '2:30 PM',
      unread: 2,
      messages: [
        { id: 1, text: 'Hey! I found a black wallet near library', sent: false, time: '2:00 PM' },
        { id: 2, text: 'Is this your wallet?', sent: false, time: '2:01 PM' },
        { id: 3, text: 'Oh yes! That might be mine!', sent: true, time: '2:30 PM' },
        { id: 4, text: 'Can you describe whats inside?', sent: false, time: '2:31 PM' },
      ]
    },
    {
      id: 1,
      name: 'Priya M.',
      hostel: 'Hostel B',
      item: 'Blue Water Bottle',
      lastMessage: 'Found it near canteen!',
      time: '1:15 PM',
      unread: 0,
      messages: [
        { id: 1, text: 'Hi! I found a blue water bottle', sent: false, time: '1:00 PM' },
        { id: 2, text: 'Found it near canteen!', sent: false, time: '1:01 PM' },
        { id: 3, text: 'Thank you so much!', sent: true, time: '1:15 PM' },
      ]
    },
    {
      id: 2,
      name: 'Amit K.',
      hostel: 'Day Scholar',
      item: 'Laptop Charger',
      lastMessage: 'Is it a Dell charger?',
      time: '11:30 AM',
      unread: 1,
      messages: [
        { id: 1, text: 'I lost my laptop charger in computer lab', sent: true, time: '11:00 AM' },
        { id: 2, text: 'Is it a Dell charger?', sent: false, time: '11:30 AM' },
      ]
    }
  ]

  const [chatMessages, setChatMessages] = useState(chats)

  const handleSend = () => {
    if (message.trim() === '') return
    const newMessage = {
      id: Date.now(),
      text: message,
      sent: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    const updatedChats = chatMessages.map((chat, index) => {
      if (index === activeChat) {
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
          lastMessage: message,
          time: newMessage.time
        }
      }
      return chat
    })
    setChatMessages(updatedChats)
    setMessage('')
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend()
  }

  return (
    <div style={{
      height: 'calc(100vh - 60px)',
      background: theme.bg,
      opacity: visible ? 1 : 0,
      transition: 'all 0.6s ease',
      display: 'flex'
    }}>

      {/* Chat List */}
      <div style={{
        width: '320px',
        flexShrink: 0,
        background: theme.card,
        borderRight: `1px solid ${theme.accent}22`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>

        {/* Header */}
        <div style={{
          padding: '20px',
          borderBottom: `1px solid ${theme.accent}22`,
          background: theme.card
        }}>
          <h2 style={{
            color: theme.text,
            fontFamily: 'Poppins, sans-serif',
            fontSize: '20px',
            fontWeight: '800',
            marginBottom: '12px'
          }}>
            Messages
          </h2>
          <input
            type="text"
            placeholder="Search conversations..."
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '50px',
              border: `1.5px solid ${theme.accent}44`,
              background: theme.inputBg,
              color: theme.text,
              fontSize: '13px',
              fontFamily: 'Inter, sans-serif',
              boxSizing: 'border-box',
              outline: 'none'
            }}
          />
        </div>

        {/* Chat List */}
        <div style={{ overflowY: 'auto', flex: 1 }}>
          {chatMessages.map((chat, index) => (
            <div
              key={chat.id}
              onClick={() => setActiveChat(index)}
              style={{
                padding: '16px 20px',
                cursor: 'pointer',
                background: activeChat === index
                  ? `${theme.accent}11`
                  : 'transparent',
                borderLeft: activeChat === index
                  ? `3px solid ${theme.accent}`
                  : '3px solid transparent',
                transition: 'all 0.2s ease',
                borderBottom: `1px solid ${theme.accent}11`
              }}
              onMouseEnter={e => {
                if (activeChat !== index) {
                  e.currentTarget.style.background = `${theme.accent}08`
                }
              }}
              onMouseLeave={e => {
                if (activeChat !== index) {
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                {/* Avatar */}
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#1a1a1a',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '800',
                  fontSize: '18px',
                  flexShrink: 0
                }}>
                  {chat.name.charAt(0)}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '4px'
                  }}>
                    <span style={{
                      color: theme.text,
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: '700',
                      fontSize: '14px'
                    }}>
                      {chat.name}
                    </span>
                    <span style={{
                      color: theme.subtext,
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '11px'
                    }}>
                      {chat.time}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      color: theme.subtext,
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '12px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '160px'
                    }}>
                      {chat.lastMessage}
                    </span>
                    {chat.unread > 0 && (
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: theme.accent,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#1a1a1a',
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: '800',
                        fontSize: '10px',
                        flexShrink: 0
                      }}>
                        {chat.unread}
                      </div>
                    )}
                  </div>
                  <span style={{
                    color: theme.accent,
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    fontWeight: '600'
                  }}>
                    Re: {chat.item}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>

        {/* Chat Header */}
        <div style={{
          padding: '16px 24px',
          background: theme.card,
          borderBottom: `1px solid ${theme.accent}22`,
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#1a1a1a',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: '800',
            fontSize: '16px'
          }}>
            {chatMessages[activeChat].name.charAt(0)}
          </div>
          <div>
            <h3 style={{
              color: theme.text,
              fontFamily: 'Poppins, sans-serif',
              fontSize: '16px',
              fontWeight: '700',
              marginBottom: '2px'
            }}>
              {chatMessages[activeChat].name}
            </h3>
            <p style={{
              color: theme.subtext,
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px'
            }}>
              {chatMessages[activeChat].hostel} • Re: {chatMessages[activeChat].item}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {chatMessages[activeChat].messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                justifyContent: msg.sent ? 'flex-end' : 'flex-start'
              }}
            >
              <div style={{
                maxWidth: '65%',
                padding: '12px 16px',
                borderRadius: msg.sent
                  ? '18px 18px 4px 18px'
                  : '18px 18px 18px 4px',
                background: msg.sent
                  ? `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`
                  : theme.card,
                color: msg.sent ? '#1a1a1a' : theme.text,
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                lineHeight: '1.5',
                boxShadow: msg.sent
                  ? `0 4px 12px ${theme.accent}44`
                  : `0 2px 8px ${theme.shadow}`,
                border: msg.sent ? 'none' : `1px solid ${theme.accent}22`
              }}>
                <p style={{ margin: 0, marginBottom: '4px' }}>{msg.text}</p>
                <p style={{
                  margin: 0,
                  fontSize: '10px',
                  opacity: 0.7,
                  textAlign: msg.sent ? 'right' : 'left'
                }}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div style={{
          padding: '16px 24px',
          background: theme.card,
          borderTop: `1px solid ${theme.accent}22`,
          display: 'flex',
          gap: '12px',
          alignItems: 'center'
        }}>
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{
              flex: 1,
              padding: '12px 18px',
              borderRadius: '50px',
              border: `1.5px solid ${theme.accent}44`,
              background: theme.inputBg,
              color: theme.text,
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif',
              outline: 'none',
              transition: 'all 0.3s ease'
            }}
            onFocus={e => e.target.style.border = `1.5px solid ${theme.accent}`}
            onBlur={e => e.target.style.border = `1.5px solid ${theme.accent}44`}
          />
          <button
            onClick={handleSend}
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              border: 'none',
              background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`,
              color: '#1a1a1a',
              fontSize: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              boxShadow: `0 4px 12px ${theme.accent}44`,
              flexShrink: 0
            }}
            onMouseEnter={e => e.target.style.transform = 'scale(1.1)'}
            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  )
}

export default Messages