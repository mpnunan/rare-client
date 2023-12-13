import rare from '../axiosConfig';

const getAllTags = async () => {
  const tags = await rare.get('/tags');
  return Object.values(tags.data);
};

const getSingleTag = async (id) => {
  const tag = await rare.get(`/tags/${id}`);
  return tag.data;
};

const createTag = async (payload) => {
  const tag = await rare.post('/tags', payload);
  return tag.data;
};

export {
  getAllTags,
  getSingleTag,
  createTag,
};
