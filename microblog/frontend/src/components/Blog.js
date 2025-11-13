import React, { useContext } from 'react';
import { FaEdit } from 'react-icons/fa';
import DeleteBlog from './DeleteBlog';
import { AuthContext } from '../context/AuthContext';

const Blog = ({id, content, title, createdAt, deleteBlog, editBlog, userId, userName}) => {
  const { user } = useContext(AuthContext);
  const isOwner = user && user.id === userId;

  
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' })
    : 'Unknown date';

  return (
    <div className="blog-card">
      <div className="blog-header">
        <h3 className="blog-title">{title}</h3>
        {isOwner && (
          <div className="blog-actions">
            <button className="icon-btn" onClick={() => editBlog({ id, title, content })}><FaEdit /></button>
            <DeleteBlog id={id} onDelete={deleteBlog} />
          </div>
        )}
      </div>
      <p className="blog-date">Posted by {userName} on {formattedDate}</p>
      <p className="blog-content">
       {content}
      </p>
    </div>
  );
}

export default Blog;