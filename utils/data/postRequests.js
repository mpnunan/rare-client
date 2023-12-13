import rare from '../axiosConfig';

const getAllPosts = async () => {
  const posts = await rare.get('/posts');
  return Object.values(posts.data);
};

const getSinglePost = async (id) => {
  const post = await rare.get(`/posts/${id}`);
  return post.data;
};

const createPost = async (payload) => {
  const post = await rare.post('/posts', payload);
  return post.data;
};

const updatePost = async (id, payload) => {
  const updatedPost = await rare.put(`/posts/${id}`, payload);
  return updatedPost.data;
};

const deletePost = async (id) => {
  const deletedPost = await rare.delete(`/posts/${id}`);
  return deletedPost.data;
};

export {
  getAllPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
};
