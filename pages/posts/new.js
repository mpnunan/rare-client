import React from 'react';
import PostForm from '../../components/forms/PostForm';
import { useAuth } from '../../utils/context/authContext';

export default function AddPost() {
  const { user } = useAuth();
  return <PostForm user={user} />;
}
