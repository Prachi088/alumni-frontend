/**
 * PREMIUM DESIGN SYSTEM
 * Alumni Portal - Modern Theme Configuration
 */

export const theme = {
  // Color Palette
  colors: {
    primary: '#4F46E5',
    primaryLight: '#818CF8',
    primaryDark: '#3730A3',
    secondary: '#8B5CF6',
    accent: '#EC4899',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    
    // Backgrounds
    bg: {
      primary: '#0F172A',
      secondary: '#1E293B',
      tertiary: '#334155',
      hover: '#1E3A8A',
      light: '#F8FAFC',
    },
    
    // Text
    text: {
      primary: '#F1F5F9',
      secondary: '#CBD5E1',
      muted: '#94A3B8',
      subtle: '#64748B',
      dark: '#1E293B',
    },
    
    // Borders & Dividers
    border: 'rgba(148, 163, 184, 0.15)',
    borderLight: 'rgba(148, 163, 184, 0.08)',
  },
  
  // Typography
  fonts: {
    primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    accent: '"Syne", "Inter", sans-serif',
    mono: '"Fira Code", monospace',
  },
  
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    glow: '0 0 24px rgba(79, 70, 229, 0.2)',
    glowHover: '0 0 32px rgba(79, 70, 229, 0.3)',
  },
  
  // Spacing
  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    6: '1.5rem',
    8: '2rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
  },
  
  // Border Radius
  radius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.25rem',
    full: '9999px',
  },
  
  // Transitions
  transitions: {
    fast: 'all 0.15s ease',
    base: 'all 0.2s ease',
    slow: 'all 0.3s ease',
    slower: 'all 0.5s ease',
  },
  
  // Breakpoints
  breakpoints: {
    mobile: '640px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
    ultrawide: '1536px',
  },
  
  // Z-index Scale
  zIndex: {
    hide: -1,
    base: 0,
    dropdown: 10,
    sticky: 20,
    fixed: 30,
    overlay: 40,
    modal: 50,
    tooltip: 60,
    notification: 70,
  },
};

// CSS Custom Properties Initialization
export const getCSSVariables = () => {
  const vars = {};
  Object.entries(theme.colors).forEach(([key, value]) => {
    if (typeof value === 'object') {
      Object.entries(value).forEach(([subKey, subValue]) => {
        vars[`--color-${key}-${subKey}`] = subValue;
      });
    } else {
      vars[`--color-${key}`] = value;
    }
  });
  
  Object.entries(theme.shadows).forEach(([key, value]) => {
    vars[`--shadow-${key}`] = value;
  });
  
  return vars;
};

export default theme;
