import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../utils/context/authContext';
import PostForm from '../../../components/forms/PostForm';
import { getSinglePost } from '../../../utils/data/postRequests';

export default function AddPost() {
  const { user } = useAuth();
  const router = useRouter();
  const [post, setPost] = useState({});

  const { id } = router.query;

  useEffect(() => {
    getSinglePost(id).then(setPost);
  }, [id]);

  return <PostForm user={user} id={id} title={post.title} publicationDate={post.publication_date} imageUrl={post.image_url} content={post.content} approved={post.approved} />;
}
