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
        userId: user.uid,
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
    const formattedDate = new Date().toISOString().split('T')[0];

    const commentDataToSend = {
      ...comment,
      created_on: id ? comment.createdOn : formattedDate,
      userId: user.uid,
      post: postId,
    };
    if (id) {
      updateComment(id, commentDataToSend).then(() => router.push(`/posts/${postId}`));
    } else {
      createComment(commentDataToSend).then(() => router.push(`/posts/${postId}`));
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
  postId: PropTypes.number.isRequired,
  content: PropTypes.string,
  createdOn: PropTypes.string,
};

CommentForm.defaultProps = {
  id: null,
  content: '',
  createdOn: '',
};
