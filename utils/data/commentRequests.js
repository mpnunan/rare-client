import rare from '../axiosConfig';

const getSingleComment = async (id) => {
  const comment = await rare.get(`/comments/${id}`);
  return comment.data;
};

const createComment = async (payload) => {
  const comment = await rare.post('/comments', payload);
  return comment.data;
};

const updateComment = async (id, payload) => {
  const updatedComment = await rare.put(`/comments/${id}`, payload);
  return updatedComment.data;
};

const deleteComment = async (id) => {
  const deletedComment = await rare.delete(`/comments/${id}`);
  return deletedComment.data;
};
export {
  getSingleComment,
  createComment,
  updateComment,
  deleteComment,
};
