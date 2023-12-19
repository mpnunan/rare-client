import Link from 'next/link';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export default function Tag({ tagObj }) {
  return (
    <Link href={`/tags/${tagObj.id}`} passHref>
      <Card>
        {tagObj.label}
      </Card>
    </Link>
  );
}

Tag.propTypes = {
  tagObj: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};
