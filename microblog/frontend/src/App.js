import './App.css';
import BlogList from './components/BlogList';

import AddBlog from './components/AddBlog';

import { useState, useEffect } from 'react';

import { get_blogs, create_blog, delete_blog } from './api/endpoints';

import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Login from './components/Login';



function App() {

  const { user, logout } = useContext(AuthContext);

  // if not logged in, show login screen


  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all' or 'my'
  const [searchQuery, setSearchQuery] = useState(''); // Add search state


  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await get_blogs();
      setBlogs(blogs);
    };
    fetchBlogs();
  }, []);


  const addBlog = async (blog_title, content) => {
    const blog = await create_blog(blog_title, content);
    setBlogs([blog, ...blogs])
  }

  const deleteBlog = async (id) => {
    delete_blog(id);
    setBlogs(blogs.filter((todo) => todo.id !== id))
  }

  const updateBlog = (updatedBlog) => {
    setBlogs(blogs.map(blog => 
      blog.id === updatedBlog.id ? updatedBlog : blog
    ));
  }

  // Filter blogs based on selected filter and search query
  const filteredBlogs = blogs.filter(blog => {
    // Apply filter (all vs my posts)
    const matchesFilter = filter === 'my' 
      ? blog.user_id === user?.id 
      : true;
    
    // Apply search query (case-insensitive)
    const matchesSearch = searchQuery === '' || 
      blog.blog_title.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  if (!user) return <Login />; 

  return (
    <div className="App">
      <header className="navbar">
        <div className="logo">Deya</div>
        <nav className="nav-links">
          {/* <a href="#">Home</a> */}
          {/* <a href="#">My profile</a> */}
          <button className="logout-btn"  onClick={logout}>Log Out</button>
        </nav>
      </header>

      <main className="content">
        <h1>Home</h1>
        <hr className="divider" />
        



        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            View All Posts
          </button>
          <button 
            className={`filter-btn ${filter === 'my' ? 'active' : ''}`}
            onClick={() => setFilter('my')}
          >
            My Posts
          </button>
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search blogs by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <hr className="divider" />
        <AddBlog addBlog={addBlog} />
        <BlogList blogs={filteredBlogs} deleteBlog={deleteBlog} updateBlog={updateBlog}/>
      </main>
    </div>
  );
}

export default App;