import React from 'react';
// import PropTypes from 'prop-types';
import { Button, Image } from 'react-bootstrap';
// import Image from 'next/image';
import { useAuth } from '../utils/context/authContext';
import { signOut } from '../utils/auth';

export default function ShowUser() {
  const { user } = useAuth();

  return (
    <div>
      {user.profile_image_url ? (
        <Image src={user.profile_image_url} alt="user" width={75} height={75} />
      ) : (
        <div style={{
          width: '75px', height: '75px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ddd', borderRadius: '4px',
        }}
        >
          No Image
        </div>
      )}
      <h2>{user.displayName}</h2>
      <h2>Email: {user.email}</h2>
      <h2>Account Created On: {user.created_on}</h2>
      <Button type="button" size="lg" className="signout-btn" onClick={signOut}>Sign Out</Button>
    </div>
  );
}

// ShowUser.propTypes = {
//   userObj: PropTypes.shape({
//     displayName: PropTypes.string,
//     email: PropTypes.string,
//     created_on: PropTypes.string, // Updated PropTypes
//     firebaseKey: PropTypes.string,
//   }).isRequired,
// };
