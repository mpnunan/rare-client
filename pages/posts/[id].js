import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Image } from 'react-bootstrap';
import { getSinglePost } from '../../utils/data/postRequests';
import { useAuth } from '../../utils/context/authContext';
import Comment from '../../components/comments/Comment';
import CommentForm from '../../components/forms/CommentForm';
import { getPostComments } from '../../utils/data/commentRequests';
import { getTagsForSinglePost } from '../../utils/data/tagRequests';

function ViewPost() {
  const [postDetails, setPostDetails] = useState({});
  const [comments, setComments] = useState([]);
  const [tags, setTags] = useState([]); // State to store post tags
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query ?? {};

  const getAllComments = () => {
    getPostComments(id).then((data) => setComments(data));
  };

  useEffect(() => {
    getSinglePost(id, user.uid)
      .then(setPostDetails)
      .then(getAllComments)
      .then(() => {
        getTagsForSinglePost(id)
          .then((data) => setTags(data)); // Update the tags state with the fetched tags
      });
  }, [id]);

  return (
    <>
      <Head>
        <title>{postDetails?.title}</title>
      </Head>
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
      {/* Render Tags */}
      <div className="post-details-cont">
        <h2 className="post-tags-title">Tags</h2>
        <div>
          {tags.map((tag) => (
            <div key={tag.id}>{tag.label}</div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ViewPost;
