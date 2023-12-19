// DetailsPage.js

// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import PostForm from '../components/forms/PostForm';
// import CommentForm from '../components/forms/CommentForm';
// import TagForm from '../components/forms/TagForm';
// import { getSinglePost } from '../utils/data/postRequests';
// import { getSingleComment } from '../utils/data/commentRequests';
// import { getAllTags } from '../utils/data/tagRequests';
// import { useAuth } from '../utils/context/authContext';
import DetailsPageComponent from '../components/DetailsComponents';

export default function DetailsPage() {
  // const router = useRouter();
  // const { postId } = router.query;

  // const [post, setPost] = useState({});
  // const [comments, setComments] = useState([]);
  // const [tags, setTags] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // const auth = useAuth();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       if (postId) {
  //         const postDetails = await getSinglePost(postId);
  //         setPost(postDetails);

  //         const commentsList = await getSingleComment(postId);
  //         setComments(commentsList);

  //         const tagsList = await getAllTags();
  //         setTags(tagsList);
  //       }
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [postId]);

  // if (!auth.user) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <div>
      <DetailsPageComponent />
      {/* <h1>Post Details</h1>
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
      ))} */}
    </div>
  );
}
