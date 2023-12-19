import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

export default function Comment({
  content, author, createdOn, onEdit, onDelete,
}) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{author}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{createdOn}</Card.Subtitle>
        <Card.Text>{content}</Card.Text>
        <Button variant="primary" onClick={onEdit}>Edit</Button>
        <Button variant="danger" onClick={onDelete}>Delete</Button>
      </Card.Body>
    </Card>
  );
}

Comment.propTypes = {
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  createdOn: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
