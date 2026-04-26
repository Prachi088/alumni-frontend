import React, { useState, useEffect, useRef } from 'react';
import theme from '../styles/theme';
import { Card, Button, Input, Avatar } from '../components/PremiumComponents';

function ModernChat() {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [messageText, setMessageText] = useState('');
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: 'Alex Kumar',
      avatar: 'AK',
      lastMessage: 'That sounds great! Let\'s connect next week.',
      timestamp: '2 hours ago',
      unread: 2,
      online: true,
      messages: [
        { id: 1, sender: 'them', text: 'Hey! How have you been?', time: '10:30 AM' },
        { id: 2, sender: 'you', text: 'Great! Just finished a project at work.', time: '10:32 AM' },
        { id: 3, sender: 'them', text: 'That sounds great! Let\'s connect next week.', time: '10:35 AM' },
      ],
    },
    {
      id: 2,
      name: 'Priya Sharma',
      avatar: 'PS',
      lastMessage: 'Thanks for the referral!',
      timestamp: '1 day ago',
      unread: 0,
      online: false,
      messages: [
        { id: 1, sender: 'them', text: 'I saw your post about the job opening', time: 'Yesterday' },
        { id: 2, sender: 'you', text: 'Yeah, it\'s a great opportunity!', time: 'Yesterday' },
      ],
    },
    {
      id: 3,
      name: 'Raj Patel',
      avatar: 'RP',
      lastMessage: 'See you at the alumni event!',
      timestamp: '3 days ago',
      unread: 0,
      online: true,
      messages: [],
    },
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedConversation]);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      setConversations(prev => prev.map(conv => {
        if (conv.id === selectedConversation) {
          return {
            ...conv,
            messages: [
              ...conv.messages,
              { id: conv.messages.length + 1, sender: 'you', text: messageText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
            ],
            lastMessage: messageText,
          };
        }
        return conv;
      }));
      setMessageText('');
    }
  };

  const activeConversation = conversations.find(c => c.id === selectedConversation);

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${theme.colors.bg.primary} 0%, ${theme.colors.bg.secondary} 100%)`,
      padding: theme.spacing[8] + ' ' + theme.spacing[6],
      display: 'grid',
      gridTemplateColumns: '320px 1fr',
      gap: theme.spacing[6],
    }}>
      {/* Conversations List */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing[4],
      }}>
        <div>
          <h1 style={{
            fontSize: theme.fontSize['2xl'],
            fontWeight: '800',
            fontFamily: theme.fonts.accent,
            color: theme.colors.text.primary,
            marginBottom: theme.spacing[4],
          }}>
            Messages
          </h1>
          <Input
            placeholder="Search conversations..."
            icon={<span>🔍</span>}
          />
        </div>

        <Card variant="default">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: theme.spacing[2],
            maxHeight: '60vh',
            overflowY: 'auto',
          }}>
            {conversations.map(conv => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv.id)}
                style={{
                  padding: theme.spacing[3],
                  background: selectedConversation === conv.id ? `${theme.colors.primary}20` : 'transparent',
                  border: 'none',
                  borderRadius: theme.radius.lg,
                  cursor: 'pointer',
                  transition: theme.transitions.base,
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing[3],
                  textAlign: 'left',
                }}
              >
                <div style={{ position: 'relative' }}>
                  <Avatar size="sm" initials={conv.avatar} />
                  {conv.online && (
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: theme.colors.success,
                      border: `2px solid ${theme.colors.bg.secondary}`,
                    }} />
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{
                    margin: 0,
                    fontSize: theme.fontSize.base,
                    fontWeight: '600',
                    color: theme.colors.text.primary,
                  }}>
                    {conv.name}
                  </h4>
                  <p style={{
                    margin: 0,
                    fontSize: theme.fontSize.sm,
                    color: theme.colors.text.muted,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {conv.lastMessage}
                  </p>
                </div>
                {conv.unread > 0 && (
                  <div style={{
                    background: theme.colors.primary,
                    color: 'white',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: theme.fontSize.xs,
                    fontWeight: '700',
                  }}>
                    {conv.unread}
                  </div>
                )}
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Chat Area */}
      {activeConversation && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          background: theme.colors.bg.secondary,
          borderRadius: theme.radius.xl,
          border: `1px solid ${theme.colors.border}`,
          overflow: 'hidden',
        }}>
          {/* Chat Header */}
          <div style={{
            padding: theme.spacing[4],
            borderBottom: `1px solid ${theme.colors.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing[3] }}>
              <div style={{ position: 'relative' }}>
                <Avatar size="md" initials={activeConversation.avatar} />
                {activeConversation.online && (
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    background: theme.colors.success,
                    border: `2px solid ${theme.colors.bg.secondary}`,
                  }} />
                )}
              </div>
              <div>
                <h2 style={{
                  margin: 0,
                  fontSize: theme.fontSize.lg,
                  fontWeight: '700',
                  color: theme.colors.text.primary,
                }}>
                  {activeConversation.name}
                </h2>
                <p style={{
                  margin: 0,
                  fontSize: theme.fontSize.sm,
                  color: theme.colors.text.muted,
                }}>
                  {activeConversation.online ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: theme.spacing[2] }}>
              <button style={{
                width: '36px',
                height: '36px',
                border: 'none',
                borderRadius: theme.radius.lg,
                background: `${theme.colors.primary}20`,
                color: theme.colors.primary,
                cursor: 'pointer',
                fontSize: theme.fontSize.lg,
              }}>
                ☎️
              </button>
              <button style={{
                width: '36px',
                height: '36px',
                border: 'none',
                borderRadius: theme.radius.lg,
                background: `${theme.colors.primary}20`,
                color: theme.colors.primary,
                cursor: 'pointer',
                fontSize: theme.fontSize.lg,
              }}>
                📞
              </button>
            </div>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: theme.spacing[6],
            display: 'flex',
            flexDirection: 'column',
            gap: theme.spacing[4],
          }}>
            {activeConversation.messages.map(msg => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  justifyContent: msg.sender === 'you' ? 'flex-end' : 'flex-start',
                }}
              >
                <div style={{
                  maxWidth: '70%',
                  background: msg.sender === 'you' ? theme.colors.primary : theme.colors.bg.tertiary,
                  color: msg.sender === 'you' ? 'white' : theme.colors.text.primary,
                  padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
                  borderRadius: theme.radius.lg,
                }}>
                  <p style={{ margin: 0, fontSize: theme.fontSize.base, lineHeight: '1.5' }}>
                    {msg.text}
                  </p>
                  <p style={{
                    margin: 0,
                    marginTop: theme.spacing[2],
                    fontSize: theme.fontSize.xs,
                    opacity: 0.7,
                  }}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{
            padding: theme.spacing[4],
            borderTop: `1px solid ${theme.colors.border}`,
            display: 'flex',
            gap: theme.spacing[3],
          }}>
            <Input
              placeholder="Type your message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button
              variant="primary"
              size="md"
              onClick={handleSendMessage}
              icon={<span>➤</span>}
            >
              Send
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModernChat;
