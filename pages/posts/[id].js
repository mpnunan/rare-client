/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Image } from 'react-bootstrap';
import Link from 'next/link';
import { getSinglePost } from '../../utils/data/postRequests';
import { useAuth } from '../../utils/context/authContext';
import Comment from '../../components/comments/Comment';
import CommentForm from '../../components/forms/CommentForm';
import { getPostComments } from '../../utils/data/commentRequests';

function ViewPost() {
  const [postDetails, setPostDetails] = useState({});
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query ?? {};

  const getAllComments = () => {
    getPostComments(id).then((data) => setComments(data));
  };

  useEffect(() => {
    getSinglePost(id, user.uid)
      .then(setPostDetails)
      .then(getAllComments);
  }, [id]);

  return (
    <>
      <Head>
        <title>{postDetails?.title}</title>
      </Head>
      <>
        <Link passHref href={`/posts/edit/${id}`}>Update Post</Link>
      </>
      <div className="mt-5 d-flex flex-wrap post-details-cont">
        <div className="d-flex flex-column post-details-cont" />
        <div className="text-black ms-5 details">
          <div className="post-details-cont">
            <div className="post-img-details">
              <Image src={postDetails?.image_url} alt={postDetails?.imageUrl} className="post-img-detail" />
            </div>
            <div className="post-content-cont">
              <h2 className="post-details-title">{postDetails?.title}</h2>
              <h6 className="post-details-text">{postDetails?.publication_date}</h6>
              <h5 className="post-details-text post-content-detail">{postDetails?.content}</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="post-details-cont">
        <h2 className="post-comment-title">Post Comment</h2>
        <CommentForm user={user} postId={Number(id)} onSubmit={getAllComments} />
        {comments.map((comment) => (
          <section key={`comment--${comment.id}`} className="comment">
            <Comment
              id={comment.id}
              postId={comment.post_id}
              content={comment.content}
              author={comment.author_full_name}
              createdOn={comment.created_on}
              onUpdate={getAllComments}
            />
          </section>
        ))}
      </div>
    </>
  );
}

export default ViewPost;
