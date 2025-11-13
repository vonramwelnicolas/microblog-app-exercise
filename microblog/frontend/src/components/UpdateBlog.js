import React, { useState } from 'react';
import { update_blog } from '../api/endpoints';

const UpdateBlog = ({ blog, onCancel, onSave }) => {
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updated = await update_blog(blog.id, title, content);
      onSave(updated);
    } catch (error) {
      console.error('Error updating blog:', error);
      alert('Failed to update blog.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="blog-card">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Edit title"
          required
        />
        <textarea
          className="input-content"
          rows="4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Edit content"
          required
        />
        <div className="edit-buttons">
          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBlog;
