import React from 'react';
import { FaTrash } from 'react-icons/fa';

const DeleteBlog = ({ id, onDelete }) => {
  const handleClick = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this blog post?');
    if (!confirmed) return;
    await onDelete(id);
  };

  return (
    <button className="icon-btn" onClick={handleClick} aria-label="Delete blog post">
      <FaTrash />
    </button>
  );
};

export default DeleteBlog;