import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export default function Tag({ tagObj }) {
  return (
    <Card>
      {tagObj.label}
    </Card>
  );
}

Tag.propTypes = {
  tagObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};
