import React from 'react';
import TagForm from '../../components/forms/TagForm';
import { useAuth } from '../../utils/context/authContext';

export default function AddPost() {
  const { user } = useAuth();
  return <TagForm user={user} />;
}
