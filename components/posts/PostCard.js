import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';

function PostCard({ postObj }) {
  return (
    <Card className="post-card" style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={postObj.image_url} alt={postObj.title} style={{ height: '300px' }} />
      <Card.Body className="post-content" style={{ height: '250px' }}>
        <h5>{postObj.title}</h5>
        <p className="text-muted">{postObj.publication_date}</p>
        <p>{postObj.content}</p>
      </Card.Body>
      <Link href={`/posts/${postObj.id}`} passHref>
        <Button style={{ backgroundColor: '#023e8a', marginBottom: '20px', width: '100%' }}>View Post</Button>
      </Link>
    </Card>
  );
}
PostCard.propTypes = {
  postObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image_url: PropTypes.string,
    publication_date: PropTypes.string,
    content: PropTypes.string,
    username: PropTypes.string,
    user: PropTypes.shape({ // Update this to define the structure of the user object
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      // Include other properties of the user object here if there are any
    }),
  }).isRequired,
};

export default PostCard;
