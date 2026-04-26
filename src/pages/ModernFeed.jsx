import React, { useState } from 'react';
import theme from '../styles/theme';
import { Card, Button, Input, Avatar, Post } from '../components/PremiumComponents';

function ModernFeed() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Alex Kumar',
      avatar: 'AK',
      timestamp: '2 hours ago',
      content: 'Just launched a new product at Google! The team worked incredibly hard on this. Excited to see how users respond. 🚀',
      likes: 24,
      comments: 8,
    },
    {
      id: 2,
      author: 'Priya Sharma',
      avatar: 'PS',
      timestamp: '4 hours ago',
      content: 'Looking for alumni in the data science field for a mentorship program. If you\'re interested in giving back to the community, please reach out!',
      likes: 12,
      comments: 15,
    },
    {
      id: 3,
      author: 'Raj Patel',
      avatar: 'RP',
      timestamp: '1 day ago',
      content: 'Great alumni event yesterday! So inspiring to see how far everyone has come. SATI alumni are doing amazing things across the globe. 🌟',
      image: 'https://via.placeholder.com/400x200/4F46E5/FFFFFF?text=Alumni+Event',
      likes: 45,
      comments: 22,
    },
  ]);

  const [newPost, setNewPost] = useState('');
  const [showPostForm, setShowPostForm] = useState(false);

  const handleCreatePost = () => {
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        author: localStorage.getItem('name') || 'You',
        avatar: (localStorage.getItem('name') || 'You').charAt(0),
        timestamp: 'Just now',
        content: newPost,
        likes: 0,
        comments: 0,
      };
      setPosts([post, ...posts]);
      setNewPost('');
      setShowPostForm(false);
    }
  };

  const handleLike = (postId) => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleComment = (postId) => {
    // In a real app, this would open a comment modal
    console.log('Comment on post:', postId);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${theme.colors.bg.primary} 0%, ${theme.colors.bg.secondary} 100%)`,
      padding: theme.spacing[8] + ' ' + theme.spacing[6],
    }}>
      {/* Header */}
      <div style={{
        marginBottom: theme.spacing[8],
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div>
          <h1 style={{
            fontSize: theme.fontSize['4xl'],
            fontWeight: '800',
            fontFamily: theme.fonts.accent,
            background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: theme.spacing[2],
          }}>
            Community Feed
          </h1>
          <p style={{
            fontSize: theme.fontSize.lg,
            color: theme.colors.text.secondary,
          }}>
            Stay connected with your alumni community
          </p>
        </div>

        <Button
          variant="primary"
          size="lg"
          onClick={() => setShowPostForm(!showPostForm)}
          icon={<span>✎</span>}
        >
          Create Post
        </Button>
      </div>

      {/* Create Post Form */}
      {showPostForm && (
        <Card variant="elevated" style={{ marginBottom: theme.spacing[8] }}>
          <div style={{ display: 'flex', gap: theme.spacing[4] }}>
            <Avatar size="md" initials={(localStorage.getItem('name') || 'You').charAt(0)} />
            <div style={{ flex: 1 }}>
              <textarea
                placeholder="What's on your mind?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                style={{
                  width: '100%',
                  minHeight: '120px',
                  padding: theme.spacing[4],
                  background: theme.colors.bg.secondary,
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: theme.radius.lg,
                  color: theme.colors.text.primary,
                  fontFamily: theme.fonts.primary,
                  fontSize: theme.fontSize.base,
                  resize: 'vertical',
                  outline: 'none',
                }}
              />
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: theme.spacing[4],
              }}>
                <div style={{ display: 'flex', gap: theme.spacing[2] }}>
                  <button style={{
                    padding: theme.spacing[2],
                    background: 'transparent',
                    border: 'none',
                    borderRadius: theme.radius.md,
                    cursor: 'pointer',
                    color: theme.colors.text.muted,
                    fontSize: theme.fontSize.lg,
                  }}>
                    📷
                  </button>
                  <button style={{
                    padding: theme.spacing[2],
                    background: 'transparent',
                    border: 'none',
                    borderRadius: theme.radius.md,
                    cursor: 'pointer',
                    color: theme.colors.text.muted,
                    fontSize: theme.fontSize.lg,
                  }}>
                    📎
                  </button>
                </div>
                <div style={{ display: 'flex', gap: theme.spacing[2] }}>
                  <Button variant="secondary" onClick={() => setShowPostForm(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleCreatePost}>
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Feed */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing[6],
      }}>
        {posts.map(post => (
          <Post
            key={post.id}
            author={post.author}
            avatar={post.avatar}
            timestamp={post.timestamp}
            content={post.content}
            image={post.image}
            likes={post.likes}
            comments={post.comments}
            onLike={() => handleLike(post.id)}
            onComment={() => handleComment(post.id)}
          />
        ))}
      </div>

      {/* Load More */}
      <div style={{
        textAlign: 'center',
        marginTop: theme.spacing[8],
      }}>
        <Button variant="secondary" size="lg">
          Load More Posts
        </Button>
      </div>
    </div>
  );
}

export default ModernFeed;
