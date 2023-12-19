import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PostForm from './forms/PostForm';
import CommentForm from './forms/CommentForm';
import { getSinglePost } from '../utils/data/postRequests';
import { getSingleComment } from '../utils/data/commentRequests';
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
      getSinglePost(postId).then((postDetails) => {
        console.log(postDetails);
        setPost(postDetails);
        setTags(postDetails.tags || []);
      });
      getSingleComment(postId).then((commentsList) => setComments(commentsList));
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
      <div>
        {tags.map((tag) => (
          <div key={tag.id}>{tag.label}</div>
        ))}
      </div>
    </div>
  );
}
