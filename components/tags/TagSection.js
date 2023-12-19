import PropTypes from 'prop-types';
import Tag from './Tag';

export default function TagSection({ tags }) {
  return (
    <section>
      {tags.map((tag) => (
        <Tag key={`tag${tag.id}`} tagObj={tag} />
      ))}
    </section>
  );
}

TagSection.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};
