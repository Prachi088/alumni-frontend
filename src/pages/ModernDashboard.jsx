import React, { useState, useEffect } from 'react';
import theme from '../styles/theme';
import { Card, Button, Avatar, Badge, UserCard } from '../components/PremiumComponents';

function ModernDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const userName = localStorage.getItem('name') || 'Alumni';
  const userRole = localStorage.getItem('role') || 'alumni';
  const [recentActivity, setRecentActivity] = useState([
    { id: 1, name: 'Sarah Johnson', action: 'connected with you', time: '2 hours ago', type: 'connection' },
    { id: 2, name: 'John Tech Co', action: 'posted a new job opening', time: '4 hours ago', type: 'job' },
    { id: 3, name: 'Alumni Network', action: 'invited you to an event', time: '1 day ago', type: 'event' },
  ]);

  const [suggestedConnections] = useState([
    { id: 1, name: 'Alex Kumar', role: 'Product Manager', company: 'Google', skills: ['React', 'Leadership', 'Product'], initials: 'AK' },
    { id: 2, name: 'Priya Sharma', role: 'Data Scientist', company: 'Meta', skills: ['ML', 'Python', 'Analytics'], initials: 'PS' },
    { id: 3, name: 'Raj Patel', role: 'DevOps Engineer', company: 'Amazon', skills: ['Kubernetes', 'AWS', 'CI/CD'], initials: 'RP' },
  ]);

  const handleConnect = (userId) => {
    console.log('Connecting to user:', userId);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${theme.colors.bg.primary} 0%, ${theme.colors.bg.secondary} 100%)`,
      padding: theme.spacing[8] + ' ' + theme.spacing[6],
    }}>
      {/* Header Section */}
      <div style={{
        marginBottom: theme.spacing[12],
        animation: 'fadeInDown 0.6s ease',
      }}>
        <h1 style={{
          fontSize: theme.fontSize['4xl'],
          fontWeight: '800',
          fontFamily: theme.fonts.accent,
          background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: theme.spacing[2],
        }}>
          Welcome back, {userName}!
        </h1>
        <p style={{
          fontSize: theme.fontSize.lg,
          color: theme.colors.text.secondary,
          marginBottom: theme.spacing[6],
        }}>
          Your alumni network awaits. Discover opportunities, connect with peers, and grow together.
        </p>

        {/* Quick Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: theme.spacing[4],
        }}>
          {[
            { label: 'Connections', value: '247', icon: '👥' },
            { label: 'Profile Strength', value: '85%', icon: '⭐' },
            { label: 'Job Matches', value: '12', icon: '💼' },
            { label: 'Events', value: '5', icon: '🎓' },
          ].map((stat, idx) => (
            <Card key={idx} variant="elevated">
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}>
                <div>
                  <p style={{
                    fontSize: theme.fontSize.sm,
                    color: theme.colors.text.muted,
                    marginBottom: theme.spacing[2],
                    fontWeight: '600',
                  }}>
                    {stat.label}
                  </p>
                  <h3 style={{
                    fontSize: theme.fontSize['2xl'],
                    fontWeight: '700',
                    margin: 0,
                    color: theme.colors.text.primary,
                  }}>
                    {stat.value}
                  </h3>
                </div>
                <span style={{ fontSize: theme.fontSize['3xl'] }}>{stat.icon}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        gap: theme.spacing[3],
        marginBottom: theme.spacing[8],
        borderBottom: `1px solid ${theme.colors.border}`,
        paddingBottom: theme.spacing[4],
      }}>
        {['overview', 'connections', 'activity'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
              background: activeTab === tab ? theme.colors.primary : 'transparent',
              color: activeTab === tab ? 'white' : theme.colors.text.muted,
              border: 'none',
              borderRadius: theme.radius.lg,
              fontSize: theme.fontSize.base,
              fontWeight: '600',
              cursor: 'pointer',
              transition: theme.transitions.base,
              textTransform: 'capitalize',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Content Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: theme.spacing[6],
      }}>
        {/* Left Column - Featured Section */}
        <div style={{ gridColumn: '1 / -1' }}>
          {activeTab === 'overview' && (
            <>
              {/* Suggested Connections */}
              <div style={{ marginBottom: theme.spacing[8] }}>
                <h2 style={{
                  fontSize: theme.fontSize['2xl'],
                  fontWeight: '700',
                  marginBottom: theme.spacing[4],
                  color: theme.colors.text.primary,
                }}>
                  Suggested Connections
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: theme.spacing[6],
                }}>
                  {suggestedConnections.map(user => (
                    <UserCard
                      key={user.id}
                      user={user}
                      onConnect={() => handleConnect(user.id)}
                      onViewProfile={() => console.log('View profile:', user.id)}
                    />
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h2 style={{
                  fontSize: theme.fontSize['2xl'],
                  fontWeight: '700',
                  marginBottom: theme.spacing[4],
                  color: theme.colors.text.primary,
                }}>
                  Recent Activity
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[3] }}>
                  {recentActivity.map(activity => (
                    <Card key={activity.id} variant="default">
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing[3] }}>
                          <Avatar size="sm" initials={activity.name.charAt(0)} />
                          <div>
                            <p style={{
                              margin: 0,
                              fontSize: theme.fontSize.base,
                              fontWeight: '600',
                              color: theme.colors.text.primary,
                            }}>
                              {activity.name}
                            </p>
                            <p style={{
                              margin: 0,
                              fontSize: theme.fontSize.sm,
                              color: theme.colors.text.muted,
                            }}>
                              {activity.action}
                            </p>
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <Badge size="sm">{activity.type}</Badge>
                          <p style={{
                            marginTop: theme.spacing[2],
                            fontSize: theme.fontSize.xs,
                            color: theme.colors.text.muted,
                          }}>
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'connections' && (
            <Card variant="elevated">
              <div style={{ textAlign: 'center', padding: theme.spacing[12] }}>
                <p style={{ fontSize: theme.fontSize.lg, color: theme.colors.text.muted }}>
                  View all your connections here
                </p>
                <Button variant="primary" size="lg" style={{ marginTop: theme.spacing[4] }}>
                  Go to Network
                </Button>
              </div>
            </Card>
          )}

          {activeTab === 'activity' && (
            <Card variant="elevated">
              <div style={{ textAlign: 'center', padding: theme.spacing[12] }}>
                <p style={{ fontSize: theme.fontSize.lg, color: theme.colors.text.muted }}>
                  Your activity feed and timeline
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        style={{
          position: 'fixed',
          bottom: theme.spacing[8],
          right: theme.spacing[8],
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`,
          color: 'white',
          border: 'none',
          fontSize: theme.fontSize['2xl'],
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: theme.shadows.xl,
          transition: theme.transitions.base,
          zIndex: theme.zIndex.fixed,
          ':hover': { transform: 'scale(1.1)' },
        }}
        title="Create Post"
      >
        ✎
      </button>

      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default ModernDashboard;
