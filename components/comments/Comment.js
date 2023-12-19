import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export default function Comment({
  content,
  author,
}) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{ author }</Card.Title>
        <Card.Text>{ content }</Card.Text>
      </Card.Body>
    </Card>
  );
}

Comment.propTypes = {
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};
