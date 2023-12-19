import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { createComment, updateComment } from '../../utils/data/commentRequests';

const iniitialState = {
  content: '',
};

export default function CommentForm({
  id,
  user,
  postId,
  content,
  createdOn,
}) {
  const [comment, setComment] = useState(iniitialState);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      setComment({
        authorId: user.uid,
        postId,
        content,
        createdOn,
      });
    }
  }, [user.uid, content, createdOn, id, postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updateComment(id, comment).then(() => router.push('/'));
    } else {
      createComment({
        ...comment,
        createdOn: Date.now(),
        authorId: user.uid,
        postId,
      }).then(() => router.push('/'));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Please, chime in</Form.Label>
        <Form.Control
          name="content"
          type="text"
          rows={2}
          value={comment.content}
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

CommentForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.string,
  postId: PropTypes.string.isRequired,
  content: PropTypes.string,
  createdOn: PropTypes.string,
};

CommentForm.defaultProps = {
  id: null,
  content: '',
  createdOn: '',
};
