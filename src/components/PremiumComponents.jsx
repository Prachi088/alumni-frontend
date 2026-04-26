import React from 'react';
import theme from '../styles/theme';

/**
 * Modern Premium Button Component
 */
export const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  onClick,
  disabled,
  icon,
  loading,
  fullWidth,
  ...props 
}) => {
  const baseStyles = {
    fontFamily: theme.fonts.primary,
    fontWeight: '600',
    border: 'none',
    borderRadius: theme.radius.lg,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: theme.transitions.base,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled ? 0.6 : 1,
  };

  const sizes = {
    sm: { padding: '8px 12px', fontSize: theme.fontSize.sm },
    md: { padding: '10px 16px', fontSize: theme.fontSize.base },
    lg: { padding: '12px 20px', fontSize: theme.fontSize.lg },
    xl: { padding: '14px 24px', fontSize: theme.fontSize.lg },
  };

  const variants = {
    primary: {
      background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryLight} 100%)`,
      color: 'white',
      boxShadow: theme.shadows.lg,
      ':hover': disabled ? {} : { boxShadow: theme.shadows.xl, transform: 'translateY(-2px)' },
    },
    secondary: {
      background: theme.colors.bg.secondary,
      color: theme.colors.text.primary,
      border: `1px solid ${theme.colors.border}`,
      ':hover': disabled ? {} : { background: theme.colors.bg.tertiary },
    },
    ghost: {
      background: 'transparent',
      color: theme.colors.primary,
      ':hover': disabled ? {} : { background: `${theme.colors.primary}15` },
    },
    outline: {
      background: 'transparent',
      color: theme.colors.text.primary,
      border: `2px solid ${theme.colors.primary}`,
      ':hover': disabled ? {} : { background: `${theme.colors.primary}10` },
    },
    danger: {
      background: theme.colors.danger,
      color: 'white',
      ':hover': disabled ? {} : { boxShadow: `0 0 20px ${theme.colors.danger}40` },
    },
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        ...baseStyles,
        ...sizes[size],
        ...variants[variant],
      }}
      {...props}
    >
      {loading && <span className="spinner" />}
      {icon}
      {children}
    </button>
  );
};

/**
 * Modern Premium Card Component
 */
export const Card = ({ 
  children, 
  variant = 'default',
  hover = true,
  padding = true,
  ...props 
}) => {
  const variants = {
    default: {
      background: theme.colors.bg.secondary,
      border: `1px solid ${theme.colors.border}`,
    },
    elevated: {
      background: theme.colors.bg.secondary,
      border: `1px solid ${theme.colors.border}`,
      boxShadow: theme.shadows.lg,
    },
    gradient: {
      background: `linear-gradient(135deg, ${theme.colors.bg.secondary} 0%, ${theme.colors.bg.tertiary} 100%)`,
      border: `1px solid ${theme.colors.border}`,
    },
  };

  return (
    <div
      style={{
        borderRadius: theme.radius.xl,
        padding: padding ? theme.spacing[6] : 0,
        transition: theme.transitions.base,
        cursor: hover ? 'pointer' : 'default',
        transform: 'translateY(0)',
        ...variants[variant],
        ...(hover ? { ':hover': { transform: 'translateY(-4px)', boxShadow: theme.shadows.xl } } : {}),
      }}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Modern Premium Input Component
 */
export const Input = ({ 
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled,
  error,
  label,
  icon,
  ...props 
}) => {
  return (
    <div style={{ width: '100%' }}>
      {label && (
        <label style={{
          display: 'block',
          fontSize: theme.fontSize.sm,
          fontWeight: '600',
          color: theme.colors.text.secondary,
          marginBottom: theme.spacing[2],
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}>
          {label}
        </label>
      )}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {icon && (
          <div style={{
            position: 'absolute',
            left: theme.spacing[3],
            color: theme.colors.text.muted,
            display: 'flex',
            alignItems: 'center',
          }}>
            {icon}
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          style={{
            width: '100%',
            padding: icon ? `${theme.spacing[3]} ${theme.spacing[3]} ${theme.spacing[3]} ${theme.spacing[10]}` : theme.spacing[3],
            background: theme.colors.bg.secondary,
            border: `1px solid ${error ? theme.colors.danger : theme.colors.border}`,
            borderRadius: theme.radius.lg,
            color: theme.colors.text.primary,
            fontSize: theme.fontSize.base,
            fontFamily: theme.fonts.primary,
            transition: theme.transitions.base,
            outline: 'none',
            '::placeholder': { color: theme.colors.text.muted },
            ':focus': {
              borderColor: theme.colors.primary,
              boxShadow: `0 0 0 3px ${theme.colors.primary}20`,
            },
          }}
          {...props}
        />
      </div>
      {error && (
        <p style={{
          fontSize: theme.fontSize.sm,
          color: theme.colors.danger,
          marginTop: theme.spacing[2],
        }}>
          {error}
        </p>
      )}
    </div>
  );
};

/**
 * Modern Premium Avatar Component
 */
export const Avatar = ({ 
  size = 'md',
  src,
  initials,
  status,
  ...props 
}) => {
  const sizes = {
    sm: { width: '32px', height: '32px', fontSize: '12px' },
    md: { width: '48px', height: '48px', fontSize: '16px' },
    lg: { width: '64px', height: '64px', fontSize: '20px' },
    xl: { width: '96px', height: '96px', fontSize: '24px' },
  };

  return (
    <div
      style={{
        ...sizes[size],
        borderRadius: '50%',
        background: src ? `url(${src})` : `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: '700',
        position: 'relative',
        border: `2px solid ${theme.colors.border}`,
      }}
      {...props}
    >
      {!src && initials}
      {status && (
        <div style={{
          position: 'absolute',
          bottom: '0',
          right: '0',
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          background: status === 'online' ? theme.colors.success : theme.colors.text.muted,
          border: `2px solid ${theme.colors.bg.secondary}`,
        }} />
      )}
    </div>
  );
};

/**
 * Modern Badge Component
 */
export const Badge = ({ 
  variant = 'primary',
  size = 'md',
  children,
  ...props 
}) => {
  const variants = {
    primary: { background: `${theme.colors.primary}20`, color: theme.colors.primary },
    success: { background: `${theme.colors.success}20`, color: theme.colors.success },
    warning: { background: `${theme.colors.warning}20`, color: theme.colors.warning },
    danger: { background: `${theme.colors.danger}20`, color: theme.colors.danger },
  };

  const sizes = {
    sm: { padding: '4px 8px', fontSize: theme.fontSize.xs },
    md: { padding: '6px 12px', fontSize: theme.fontSize.sm },
    lg: { padding: '8px 14px', fontSize: theme.fontSize.base },
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: theme.radius.full,
        fontWeight: '600',
        ...sizes[size],
        ...variants[variant],
      }}
      {...props}
    >
      {children}
    </span>
  );
};

/**
 * Social User Card Component
 */
export const UserCard = ({ 
  user,
  onConnect,
  onViewProfile,
  ...props 
}) => {
  return (
    <Card variant="elevated" hover padding {...props}>
      <div style={{ textAlign: 'center' }}>
        <Avatar size="lg" initials={user.initials} />
        <h3 style={{
          marginTop: theme.spacing[4],
          marginBottom: theme.spacing[1],
          fontSize: theme.fontSize.lg,
          fontWeight: '700',
          color: theme.colors.text.primary,
        }}>
          {user.name}
        </h3>
        <p style={{
          fontSize: theme.fontSize.sm,
          color: theme.colors.text.muted,
          marginBottom: theme.spacing[3],
        }}>
          {user.role}
        </p>
        
        {user.company && (
          <p style={{
            fontSize: theme.fontSize.sm,
            color: theme.colors.text.secondary,
            marginBottom: theme.spacing[4],
          }}>
            📍 {user.company}
          </p>
        )}
        
        {user.skills && (
          <div style={{ display: 'flex', gap: theme.spacing[2], flexWrap: 'wrap', marginBottom: theme.spacing[4], justifyContent: 'center' }}>
            {user.skills.slice(0, 3).map(skill => (
              <Badge key={skill} size="sm">{skill}</Badge>
            ))}
          </div>
        )}
        
        <div style={{ display: 'flex', gap: theme.spacing[2] }}>
          <Button variant="primary" size="sm" fullWidth onClick={onConnect}>
            Connect
          </Button>
          <Button variant="secondary" size="sm" fullWidth onClick={onViewProfile}>
            View Profile
          </Button>
        </div>
      </div>
    </Card>
  );
};

/**
 * Feed Post Component
 */
export const Post = ({ 
  author,
  avatar,
  timestamp,
  content,
  image,
  likes,
  comments,
  onLike,
  onComment,
  ...props 
}) => {
  const [liked, setLiked] = React.useState(false);

  return (
    <Card variant="default" padding {...props}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing[3],
        marginBottom: theme.spacing[4],
        paddingBottom: theme.spacing[4],
        borderBottom: `1px solid ${theme.colors.border}`,
      }}>
        <Avatar size="md" initials={avatar} />
        <div style={{ flex: 1 }}>
          <h4 style={{ fontSize: theme.fontSize.base, fontWeight: '700', margin: 0 }}>{author}</h4>
          <p style={{ fontSize: theme.fontSize.sm, color: theme.colors.text.muted, margin: 0 }}>{timestamp}</p>
        </div>
      </div>

      {/* Content */}
      <p style={{
        fontSize: theme.fontSize.base,
        lineHeight: '1.6',
        marginBottom: image ? theme.spacing[4] : 0,
        color: theme.colors.text.primary,
      }}>
        {content}
      </p>

      {/* Image */}
      {image && (
        <div style={{
          width: '100%',
          height: '200px',
          background: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: theme.radius.lg,
          marginBottom: theme.spacing[4],
        }} />
      )}

      {/* Interactions */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: theme.spacing[3],
        borderTop: `1px solid ${theme.colors.border}`,
        fontSize: theme.fontSize.sm,
        color: theme.colors.text.muted,
      }}>
        <button onClick={() => { setLiked(!liked); onLike?.(); }} style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: liked ? theme.colors.danger : theme.colors.text.muted,
          transition: theme.transitions.base,
        }}>
          ❤️ {likes + (liked ? 1 : 0)} Likes
        </button>
        <button onClick={onComment} style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: theme.colors.text.muted,
        }}>
          💬 {comments} Comments
        </button>
        <button style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: theme.colors.text.muted,
        }}>
          🔗 Share
        </button>
      </div>
    </Card>
  );
};

export default {
  Button,
  Card,
  Input,
  Avatar,
  Badge,
  UserCard,
  Post,
};
