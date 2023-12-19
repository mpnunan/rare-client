import rare from '../axiosConfig';

// Function to get posts for a single user
const getSingleUserPosts = async (id) => {
  const response = await rare.get(`/posts?rare_user_id_id=${id}`);
  return response.data;
};

export default getSingleUserPosts;
