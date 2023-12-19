import PropTypes from 'prop-types';
import Comment from './Comment';
import CommentForm from '../forms/CommentForm';

export default function CommentSection({ comments }) {
  console.log(comments);
  return (
    <section>
      <CommentForm />
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          content={comment.content}
          author={comment.author}
          createdOn={comment.createdOn}
        />
      ))}
    </section>
  );
}

CommentSection.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    createdOn: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};
