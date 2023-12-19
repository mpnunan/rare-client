import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';

function PostCard({ postObj }) {
  return (
    <Card
      className="post-card"
      style={{
        width: '18rem', margin: '20px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', borderRadius: '10px',
      }}
    >
      <Card.Img variant="top" src={postObj.image_url} alt={postObj.title} style={{ height: 'auto', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} />
      <Card.Body className="post-content" style={{ height: '200px' }}>
        <h5>{postObj.title}</h5>
        <p className="text-muted">{postObj.publication_date}</p>
        <p>{postObj.content}</p>
      </Card.Body>
      <Link href={`/posts/${postObj.id}`} passHref>
        <Button>View Post</Button>
      </Link>
    </Card>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    image_url: PropTypes.string,
    publication_date: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
};

export default PostCard;
