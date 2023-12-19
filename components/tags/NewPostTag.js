import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { createPostTag, getAllTags } from '../../utils/data/tagRequests';

const initialState = {
  post: '',
  tag: '',
};

export default function NewPostTag({ postId, onUpdate }) {
  const [tags, setTags] = useState([]);
  const [postTag, setPostTag] = useState(initialState);

  useEffect(() => {
    getAllTags().then(setTags);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostTag((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPostTagObj = { ...postTag, post: postId };

    createPostTag(newPostTagObj.then(() => onUpdate()));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Select
        aria-label="Select Tag"
        name="tag"
        required
        value={postTag.tag}
        onChange={handleChange}
      >
        <option value="">Add a tag:</option>
        {tags.map((tagObj) => (
          <option key={tagObj.id} value={tagObj.id}>{tagObj.label}</option>
        ))}
      </Form.Select>
    </Form>
  );
}

NewPostTag.propTypes = {
  postId: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
