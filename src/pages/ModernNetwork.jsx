import React, { useState, useMemo } from 'react';
import theme from '../styles/theme';
import { Card, Button, Input, Avatar, Badge, UserCard } from '../components/PremiumComponents';

function ModernNetwork() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    role: 'all',
    company: 'all',
    skills: [],
    batch: 'all',
  });
  const [selectedFilter, setSelectedFilter] = useState(null);

  // Mock data - in real app, fetch from API
  const allUsers = [
    { id: 1, name: 'Alex Kumar', role: 'Product Manager', company: 'Google', batch: '2019', skills: ['React', 'Leadership', 'Product'], initials: 'AK', connected: false },
    { id: 2, name: 'Priya Sharma', role: 'Data Scientist', company: 'Meta', batch: '2020', skills: ['ML', 'Python', 'Analytics'], initials: 'PS', connected: false },
    { id: 3, name: 'Raj Patel', role: 'DevOps Engineer', company: 'Amazon', batch: '2018', skills: ['Kubernetes', 'AWS', 'CI/CD'], initials: 'RP', connected: true },
    { id: 4, name: 'Sneha Nair', role: 'UX Designer', company: 'Apple', batch: '2019', skills: ['Figma', 'Design System', 'User Research'], initials: 'SN', connected: false },
    { id: 5, name: 'Vikram Singh', role: 'Backend Engineer', company: 'Microsoft', batch: '2021', skills: ['Node.js', 'Databases', 'Microservices'], initials: 'VS', connected: false },
    { id: 6, name: 'Anushka Gupta', role: 'Frontend Engineer', company: 'Netflix', batch: '2020', skills: ['React', 'TypeScript', 'Performance'], initials: 'AG', connected: true },
  ];

  const companies = ['all', ...new Set(allUsers.map(u => u.company))];
  const roles = ['all', ...new Set(allUsers.map(u => u.role))];
  const allSkills = [...new Set(allUsers.flatMap(u => u.skills))];
  const batches = ['all', ...new Set(allUsers.map(u => u.batch))];

  // Filtered users
  const filteredUsers = useMemo(() => {
    return allUsers.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.role.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesRole = filters.role === 'all' || user.role === filters.role;
      const matchesCompany = filters.company === 'all' || user.company === filters.company;
      const matchesBatch = filters.batch === 'all' || user.batch === filters.batch;
      const matchesSkills = filters.skills.length === 0 || 
                           filters.skills.some(skill => user.skills.includes(skill));

      return matchesSearch && matchesRole && matchesCompany && matchesBatch && matchesSkills;
    });
  }, [searchQuery, filters]);

  const toggleSkill = (skill) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${theme.colors.bg.primary} 0%, ${theme.colors.bg.secondary} 100%)`,
      padding: theme.spacing[8] + ' ' + theme.spacing[6],
    }}>
      {/* Header */}
      <div style={{ marginBottom: theme.spacing[8] }}>
        <h1 style={{
          fontSize: theme.fontSize['4xl'],
          fontWeight: '800',
          fontFamily: theme.fonts.accent,
          background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: theme.spacing[4],
        }}>
          Network & Discover
        </h1>
        <p style={{
          fontSize: theme.fontSize.lg,
          color: theme.colors.text.secondary,
        }}>
          Search and connect with alumni from your institution
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        gap: theme.spacing[6],
      }}>
        {/* Sidebar - Filters */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing[6],
        }}>
          {/* Search Box */}
          <Card variant="default">
            <Input
              placeholder="Search alumni..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<span>🔍</span>}
            />
          </Card>

          {/* Filter Sections */}
          <Card variant="default">
            <h3 style={{
              fontSize: theme.fontSize.base,
              fontWeight: '700',
              marginBottom: theme.spacing[3],
              color: theme.colors.text.primary,
            }}>
              Filters
            </h3>

            {/* Role Filter */}
            <div style={{ marginBottom: theme.spacing[4] }}>
              <p style={{
                fontSize: theme.fontSize.sm,
                fontWeight: '600',
                color: theme.colors.text.secondary,
                marginBottom: theme.spacing[2],
                textTransform: 'uppercase',
              }}>
                Role
              </p>
              <select
                value={filters.role}
                onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value }))}
                style={{
                  width: '100%',
                  padding: theme.spacing[2],
                  background: theme.colors.bg.secondary,
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: theme.radius.md,
                  color: theme.colors.text.primary,
                  cursor: 'pointer',
                }}
              >
                {roles.map(role => (
                  <option key={role} value={role}>
                    {role === 'all' ? 'All Roles' : role}
                  </option>
                ))}
              </select>
            </div>

            {/* Company Filter */}
            <div style={{ marginBottom: theme.spacing[4] }}>
              <p style={{
                fontSize: theme.fontSize.sm,
                fontWeight: '600',
                color: theme.colors.text.secondary,
                marginBottom: theme.spacing[2],
                textTransform: 'uppercase',
              }}>
                Company
              </p>
              <select
                value={filters.company}
                onChange={(e) => setFilters(prev => ({ ...prev, company: e.target.value }))}
                style={{
                  width: '100%',
                  padding: theme.spacing[2],
                  background: theme.colors.bg.secondary,
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: theme.radius.md,
                  color: theme.colors.text.primary,
                  cursor: 'pointer',
                }}
              >
                {companies.map(company => (
                  <option key={company} value={company}>
                    {company === 'all' ? 'All Companies' : company}
                  </option>
                ))}
              </select>
            </div>

            {/* Batch Filter */}
            <div style={{ marginBottom: theme.spacing[4] }}>
              <p style={{
                fontSize: theme.fontSize.sm,
                fontWeight: '600',
                color: theme.colors.text.secondary,
                marginBottom: theme.spacing[2],
                textTransform: 'uppercase',
              }}>
                Batch
              </p>
              <select
                value={filters.batch}
                onChange={(e) => setFilters(prev => ({ ...prev, batch: e.target.value }))}
                style={{
                  width: '100%',
                  padding: theme.spacing[2],
                  background: theme.colors.bg.secondary,
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: theme.radius.md,
                  color: theme.colors.text.primary,
                  cursor: 'pointer',
                }}
              >
                {batches.map(batch => (
                  <option key={batch} value={batch}>
                    {batch === 'all' ? 'All Batches' : `Batch ${batch}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Skills Filter */}
            <div>
              <p style={{
                fontSize: theme.fontSize.sm,
                fontWeight: '600',
                color: theme.colors.text.secondary,
                marginBottom: theme.spacing[2],
                textTransform: 'uppercase',
              }}>
                Skills
              </p>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing[2],
              }}>
                {allSkills.map(skill => (
                  <label key={skill} style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    padding: `${theme.spacing[2]} ${theme.spacing[2]}`,
                    borderRadius: theme.radius.md,
                    transition: theme.transitions.base,
                    ':hover': { background: theme.colors.bg.hover },
                  }}>
                    <input
                      type="checkbox"
                      checked={filters.skills.includes(skill)}
                      onChange={() => toggleSkill(skill)}
                      style={{ marginRight: theme.spacing[2], cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: theme.fontSize.sm, color: theme.colors.text.primary }}>
                      {skill}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            <Button
              variant="ghost"
              size="sm"
              fullWidth
              onClick={() => {
                setSearchQuery('');
                setFilters({ role: 'all', company: 'all', skills: [], batch: 'all' });
              }}
              style={{ marginTop: theme.spacing[4] }}
            >
              Clear All
            </Button>
          </Card>
        </div>

        {/* Main Content - Users Grid */}
        <div>
          <div style={{
            marginBottom: theme.spacing[4],
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <h2 style={{
              fontSize: theme.fontSize.lg,
              fontWeight: '700',
              color: theme.colors.text.primary,
            }}>
              {filteredUsers.length} Results Found
            </h2>
          </div>

          {filteredUsers.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: theme.spacing[6],
            }}>
              {filteredUsers.map(user => (
                <UserCard
                  key={user.id}
                  user={user}
                  onConnect={() => console.log('Connect with:', user.id)}
                  onViewProfile={() => console.log('View profile:', user.id)}
                />
              ))}
            </div>
          ) : (
            <Card variant="elevated">
              <div style={{
                textAlign: 'center',
                padding: `${theme.spacing[12]} ${theme.spacing[6]}`,
              }}>
                <p style={{
                  fontSize: theme.fontSize.lg,
                  color: theme.colors.text.muted,
                  marginBottom: theme.spacing[4],
                }}>
                  No alumni found matching your filters
                </p>
                <Button variant="primary" onClick={() => {
                  setSearchQuery('');
                  setFilters({ role: 'all', company: 'all', skills: [], batch: 'all' });
                }}>
                  Clear Filters
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default ModernNetwork;
