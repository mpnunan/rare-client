import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { createPost, updatePost } from '../../utils/data/postRequests';

const initialState = {
  title: '',
  imageUrl: '',
  content: '',
  approved: 'MQ==',
};

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
      });
    }
  }, [approved, content, id, imageUrl, publicationDate, title, user.uid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updatePost(id, currentPost).then(() => router.push('/'));
    } else {
      createPost({ ...currentPost, publicationDate: Date.now(), rareUserId: user.uid }).then(() => router.push('/'));
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
