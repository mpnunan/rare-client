/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Image } from 'react-bootstrap';
import { getSinglePost } from '../../utils/data/postRequests';
import TagSection from '../../components/tags/TagSection';
import CommentSection from '../../components/comments/CommentSection';
import NewPostTag from '../../components/tags/NewPostTag';
import { getPostComments } from '../../utils/data/commentRequests';

export default function PostDetails() {
  const router = useRouter();
  const { postId } = router.query;
  const [post, setPost] = useState({});
  const [comments, setComments] = [];

  const getPostDetails = () => {
    getSinglePost(postId).then(setPost);
  };

  useEffect(() => {
    getSinglePost(postId).then(setPost);
  }, [postId]);

  useEffect(() => {
    getPostComments(postId).then(setComments);
  }, [postId]);

  return (
    <main>
      <h1>{ post.title }</h1>
      <h2>{ post.rare_user_id.first_name }{ post.rare_user_id.last_name }</h2>
      <Image src={`${post.image_url}`} alt={`${post.title}`} />
      <p>{ post.publication_date }</p>
      <section>
        <p>{ post.content }</p>
      </section>
      <NewPostTag postId={postId} onUpdate={getPostDetails} />
      <TagSection tags={post.tags} />
      <CommentSection comments={comments} />
    </main>
  );
}
