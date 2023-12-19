/* eslint-disable no-shadow */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { createPost, updatePost } from '../../utils/data/postRequests';

// Import functions for handling tags
import { getAllTags } from '../../utils/data/tagRequests';

const initialState = {
  title: '',
  imageUrl: '',
  content: '',
  approved: 'MQ==',
  tags: [], // Initialize tags as an empty array
};

const now = new Date();
const rightNow = now.toISOString().substring(0, 10);

export default function PostForm({
  user,
  id,
  title,
  publicationDate,
  imageUrl,
  content,
  approved,
}) {
  const [currentPost, setCurrentPost] = useState(initialState);
  const [tags, setTags] = useState([]); // State to store available tags
  const router = useRouter();

  useEffect(() => {
    if (id) {
      setCurrentPost({
        rareUserId: user.uid,
        title,
        publicationDate,
        imageUrl,
        content,
        approved,
        tags: [], // Initialize tags as an empty array
      });
    }
  }, [approved, content, id, imageUrl, publicationDate, title, user.uid]);

  // Load available tags when the component mounts
  useEffect(() => {
    getAllTags().then((tagsList) => setTags(tagsList));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to handle tag selection
  const handleTagChange = (tagId) => {
    setCurrentPost((prevState) => ({
      ...prevState,
      tags: prevState.tags.includes(tagId)
        ? prevState.tags.filter((id) => id !== tagId)
        : [...prevState.tags, tagId],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updatePost(id, currentPost).then(() => router.push('/'));
    } else {
      createPost({ ...currentPost, publicationDate: rightNow, rareUserId: user.uid }).then(() => router.push('/posts'));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>What are you calling your post?</Form.Label>
        <Form.Control
          name="title"
          type="text"
          value={currentPost.title}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Add an image</Form.Label>
        <Form.Control
          name="imageUrl"
          type="url"
          placeholder="Image URL"
          value={currentPost.imageUrl}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Speak your mind</Form.Label>
        <Form.Control
          name="content"
          type="text"
          rows={4}
          value={currentPost.content}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        {tags.map((tag) => (
          <Form.Check
            key={tag.id}
            type="checkbox"
            label={tag.label}
            onChange={() => handleTagChange(tag.id)}
            checked={currentPost.tags.includes(tag.id)}
          />
        ))}
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

PostForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.number,
  title: PropTypes.string,
  publicationDate: PropTypes.string,
  imageUrl: PropTypes.string,
  content: PropTypes.string,
  approved: PropTypes.string,
};

PostForm.defaultProps = {
  id: null,
  title: '',
  publicationDate: '',
  imageUrl: '',
  content: '',
  approved: 'MQ==',
};
