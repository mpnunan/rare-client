import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

export default function Tag({ tagObj, onEdit, onDelete }) {
  const handleEdit = () => {
    onEdit(tagObj);
  };

  const handleDelete = () => {
    onDelete(tagObj.id);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{tagObj.label}</Card.Title>
        <Button variant="primary" onClick={handleEdit}>Edit</Button>
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </Card.Body>
    </Card>
  );
}

Tag.propTypes = {
  tagObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
