import React, { useState } from 'react';

function AddBlog( {addBlog} ) {


  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAdd = () => {
    addBlog(title, content);
    setTitle('');
    setContent('');
}

  return (
    <form className="add-blog-form" onSubmit={(e) => { e.preventDefault(); handleAdd(); }}>
      <h2 className="add-blog-title">Add a New Blog</h2>
      <input
        type="text"
        placeholder="Enter blog title"
        className="add-blog-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Write your blog content..."
        className="add-blog-textarea"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit" className="add-blog-btn">Post Blog</button>
    </form>
  );
}

export default AddBlog;
