import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/';

// Configure axios interceptor to include token in all requests
axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );




const GET_BLOGS_URL = `${BASE_URL}blogs`;
const POST_BLOGS_URL = `${BASE_URL}blogs`;
const DELETE_BLOG_URL = (id) => `${BASE_URL}blogs/${id}`;
const UPDATE_BLOG_URL = (id) => `${BASE_URL}blogs/${id}`; 
const REGISTER_URL = `${BASE_URL}users`;
const LOGIN_URL = `${BASE_URL}login`;

export const register_user = async (name, email, password, password_confirmation) => {
    const response = await axios.post(REGISTER_URL, {
      user: { name, email, password, password_confirmation },
    });
    return response.data;
  };

export const login_user = async (email, password) => {
  const response = await axios.post(LOGIN_URL, { email, password });
  return response.data;
};




export const get_blogs = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(GET_BLOGS_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const create_blog = async (blog_title, content) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(
        POST_BLOGS_URL, 
        {blog: {blog_title, content}},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data;
}

export const delete_blog = async (id) => {
    const token = localStorage.getItem('token');
    const response = await axios.delete(DELETE_BLOG_URL(id), {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

export const update_blog = async (id, blog_title, content) => {
    const token = localStorage.getItem('token');
    const response = await axios.patch(
        UPDATE_BLOG_URL(id), 
        { blog: { blog_title, content } },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data;
};