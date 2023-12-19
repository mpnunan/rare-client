// / DetailsPageComponent.js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PostForm from './forms/PostForm';
import CommentForm from './forms/CommentForm';
import TagForm from './forms/TagForm';
import { getSinglePost } from '../utils/data/postRequests';
import { getSingleComment } from '../utils/data/commentRequests';
import { getAllTags } from '../utils/data/tagRequests';
import { useAuth } from '../utils/context/authContext';

export default function DetailsPageComponent() {
  const router = useRouter();
  const { postId } = router.query;

  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [tags, setTags] = useState([]);

  const auth = useAuth();

  useEffect(() => {
    if (postId) {
      getSinglePost(postId).then((postDetails) => setPost(postDetails));
      getSingleComment(postId).then((commentsList) => setComments(commentsList));
      getAllTags().then((tagsList) => setTags(tagsList));
    }
  }, [postId]);

  return (
    <div>
      <h1>Post Details</h1>
      <PostForm user={auth.user} {...post} />
      <hr />
      <h2>Comments</h2>
      {comments.map((comment) => (
        <CommentForm key={comment.id} user={auth.user} postId={postId} {...comment} />
      ))}
      <hr />
      <h2>Tags</h2>
      {tags.map((tag) => (
        <TagForm key={tag.id} {...tag} />
      ))}
    </div>
  );
}
