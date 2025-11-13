import React, { useState } from 'react';
import Blog from './Blog';
import UpdateBlog from './UpdateBlog'; // ✅ fixed the import path

const BlogList = ({ blogs, deleteBlog, updateBlog }) => {
  const [editingBlog, setEditingBlog] = useState(null);

  const handleSave = (updatedBlog) => {
    updateBlog(updatedBlog); // Update the state in App.js
    setEditingBlog(null);
  };

  const handleCancel = () => {
    setEditingBlog(null);
  };

  return (
    <div className="blog-list">
      {blogs.map((blog) =>
        editingBlog && editingBlog.id === blog.id ? (
          <UpdateBlog
            key={blog.id}
            blog={editingBlog}
            onCancel={handleCancel}
            onSave={handleSave}
          />
        ) : (
          <Blog
          key={blog.id}
          id={blog.id}
          content={blog.content}
          title={blog.blog_title}
          createdAt={blog.created_at}
          userId={blog.user_id}  
          userName={blog.user?.name || 'Unknown User'}
          deleteBlog={deleteBlog}
          editBlog={setEditingBlog}
        />
        )
      )}
    </div>
  );
};

export default BlogList;
