import PropTypes from 'prop-types';
import Tag from './Tag';

export default function TagSection({ tags, onEdit, onDelete }) {
  return (
    <section>
      {tags.map((tag) => (
        <Tag key={`tag${tag.id}`} tagObj={tag} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </section>
  );
}

TagSection.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
