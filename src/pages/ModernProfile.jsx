import React, { useState, useEffect } from 'react';
import theme from '../styles/theme';
import { Card, Button, Input, Avatar, Badge } from '../components/PremiumComponents';

function ModernProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const userId = localStorage.getItem('userId') || '1';
  const userName = localStorage.getItem('name') || 'Alumni';
  
  const [profile, setProfile] = useState({
    name: userName,
    email: 'alumni@sati.ac.in',
    role: 'Senior Product Manager',
    company: 'Google',
    batch: '2019',
    branch: 'Computer Science',
    bio: 'Passionate about building products that make an impact.',
    skills: ['Product Strategy', 'Leadership', 'User Research', 'Data Analysis'],
    achievements: ['Led 5+ product launches', 'Grew team from 2 to 15', '50% increase in user retention'],
    education: [
      { institution: 'SATI', degree: 'B.Tech', field: 'Computer Science', year: '2019' },
    ],
    experience: [
      { company: 'Google', role: 'Senior PM', duration: '2021-Present' },
      { company: 'Microsoft', role: 'Product Manager', duration: '2019-2021' },
    ],
  });

  const [tempProfile, setTempProfile] = useState(profile);

  const handleEditChange = (field, value) => {
    setTempProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field, index, value) => {
    setTempProfile(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item),
    }));
  };

  const handleAddItem = (field, newItem) => {
    if (newItem.trim()) {
      setTempProfile(prev => ({
        ...prev,
        [field]: [...prev[field], newItem],
      }));
    }
  };

  const handleRemoveItem = (field, index) => {
    setTempProfile(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setProfile(tempProfile);
    setIsEditing(false);
    setSaving(false);
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  const currentProfile = isEditing ? tempProfile : profile;

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${theme.colors.bg.primary} 0%, ${theme.colors.bg.secondary} 100%)`,
      padding: theme.spacing[8] + ' ' + theme.spacing[6],
    }}>
      {/* Header with Cover Image */}
      <div style={{
        background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`,
        height: '200px',
        borderRadius: theme.radius.xl,
        marginBottom: `-${theme.spacing[12]}`,
        position: 'relative',
        zIndex: 1,
      }} />

      {/* Profile Content */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: theme.spacing[6],
        marginBottom: theme.spacing[8],
        position: 'relative',
        zIndex: 2,
      }}>
        {/* Left Column - Basic Info */}
        <Card variant="elevated">
          <div style={{ textAlign: 'center' }}>
            <Avatar size="xl" initials={currentProfile.name.charAt(0)} />
            
            <h1 style={{
              fontSize: theme.fontSize['2xl'],
              fontWeight: '800',
              color: theme.colors.text.primary,
              marginTop: theme.spacing[4],
              marginBottom: theme.spacing[1],
            }}>
              {currentProfile.name}
            </h1>

            <p style={{
              fontSize: theme.fontSize.lg,
              color: theme.colors.primary,
              fontWeight: '600',
              marginBottom: theme.spacing[1],
            }}>
              {currentProfile.role}
            </p>

            <p style={{
              fontSize: theme.fontSize.base,
              color: theme.colors.text.muted,
              marginBottom: theme.spacing[4],
            }}>
              📍 {currentProfile.company}
            </p>

            {isEditing ? (
              <div style={{ display: 'flex', gap: theme.spacing[2] }}>
                <Button variant="primary" size="md" fullWidth onClick={handleSave} disabled={saving}>
                  {saving ? 'Saving...' : 'Save'}
                </Button>
                <Button variant="secondary" size="md" fullWidth onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            ) : (
              <Button variant="primary" size="md" fullWidth onClick={() => {
                setTempProfile(profile);
                setIsEditing(true);
              }}>
                Edit Profile
              </Button>
            )}

            <div style={{
              display: 'flex',
              gap: theme.spacing[2],
              marginTop: theme.spacing[4],
              paddingTop: theme.spacing[4],
              borderTop: `1px solid ${theme.colors.border}`,
            }}>
              <Button variant="secondary" size="sm" fullWidth>📧 Message</Button>
              <Button variant="secondary" size="sm" fullWidth>💼 Share</Button>
            </div>

            {/* Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: theme.spacing[4],
              marginTop: theme.spacing[6],
              paddingTop: theme.spacing[6],
              borderTop: `1px solid ${theme.colors.border}`,
            }}>
              {[
                { label: 'Connections', value: '247' },
                { label: 'Posts', value: '12' },
              ].map((stat, idx) => (
                <div key={idx}>
                  <p style={{
                    fontSize: theme.fontSize.xl,
                    fontWeight: '700',
                    color: theme.colors.primary,
                    margin: 0,
                  }}>
                    {stat.value}
                  </p>
                  <p style={{
                    fontSize: theme.fontSize.sm,
                    color: theme.colors.text.muted,
                    margin: 0,
                  }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Right Column - Detailed Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[6] }}>
          {/* Bio Section */}
          <Card variant="default">
            <h2 style={{
              fontSize: theme.fontSize.lg,
              fontWeight: '700',
              marginBottom: theme.spacing[4],
              color: theme.colors.text.primary,
            }}>
              About
            </h2>
            {isEditing ? (
              <textarea
                value={tempProfile.bio}
                onChange={(e) => handleEditChange('bio', e.target.value)}
                style={{
                  width: '100%',
                  minHeight: '100px',
                  padding: theme.spacing[3],
                  background: theme.colors.bg.secondary,
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: theme.radius.lg,
                  color: theme.colors.text.primary,
                  fontFamily: theme.fonts.primary,
                  resize: 'vertical',
                }}
              />
            ) : (
              <p style={{
                fontSize: theme.fontSize.base,
                color: theme.colors.text.secondary,
                lineHeight: '1.6',
              }}>
                {currentProfile.bio || 'No bio added yet.'}
              </p>
            )}
          </Card>

          {/* Skills Section */}
          <Card variant="default">
            <h2 style={{
              fontSize: theme.fontSize.lg,
              fontWeight: '700',
              marginBottom: theme.spacing[4],
              color: theme.colors.text.primary,
            }}>
              Skills
            </h2>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: theme.spacing[2],
              marginBottom: isEditing ? theme.spacing[4] : 0,
            }}>
              {currentProfile.skills.map((skill, idx) => (
                <div key={idx} style={{ position: 'relative' }}>
                  <Badge>{skill}</Badge>
                  {isEditing && (
                    <button
                      onClick={() => handleRemoveItem('skills', idx)}
                      style={{
                        position: 'absolute',
                        top: '-8px',
                        right: '-8px',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: theme.colors.danger,
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
            {isEditing && (
              <Input
                placeholder="Add a skill..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddItem('skills', e.target.value);
                    e.target.value = '';
                  }
                }}
              />
            )}
          </Card>

          {/* Experience Section */}
          <Card variant="default">
            <h2 style={{
              fontSize: theme.fontSize.lg,
              fontWeight: '700',
              marginBottom: theme.spacing[4],
              color: theme.colors.text.primary,
            }}>
              Experience
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[4] }}>
              {currentProfile.experience.map((exp, idx) => (
                <div key={idx} style={{
                  paddingBottom: theme.spacing[4],
                  borderBottom: idx !== currentProfile.experience.length - 1 ? `1px solid ${theme.colors.border}` : 'none',
                }}>
                  <h4 style={{
                    fontSize: theme.fontSize.base,
                    fontWeight: '700',
                    color: theme.colors.text.primary,
                    margin: 0,
                  }}>
                    {exp.role}
                  </h4>
                  <p style={{
                    fontSize: theme.fontSize.sm,
                    color: theme.colors.text.muted,
                    margin: 0,
                  }}>
                    {exp.company} • {exp.duration}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Achievements Section */}
          <Card variant="default">
            <h2 style={{
              fontSize: theme.fontSize.lg,
              fontWeight: '700',
              marginBottom: theme.spacing[4],
              color: theme.colors.text.primary,
            }}>
              Achievements
            </h2>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing[2],
            }}>
              {currentProfile.achievements.map((achievement, idx) => (
                <li key={idx} style={{
                  fontSize: theme.fontSize.base,
                  color: theme.colors.text.secondary,
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing[2],
                }}>
                  <span style={{ color: theme.colors.success }}>✓</span>
                  {achievement}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ModernProfile;
