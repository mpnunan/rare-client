import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import getSingleUserPosts from '../utils/data/userRequests';
import PostCard from './posts/PostCard';

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchPosts = async () => {
        try {
          const fetchedPosts = await getSingleUserPosts(id);
          setPosts(fetchedPosts);
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      };

      fetchPosts();
    }
  }, [id]);

  return (
    <div>
      <h2>User Posts</h2>
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCard key={post.id} postObj={post} />
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

export default UserPosts;
