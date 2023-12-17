import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../utils/auth'; // Update with path to registerUser

function RegisterForm({ user, updateUser }) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    bio: '',
    profile_image_url: '',
    email: '',
    created_on: Date.now(),
    active: true,
    is_staff: true,
    uid: user.uid,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData).then(() => updateUser(user.uid));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Scholarly First Name</Form.Label>
        <Form.Control type="text" name="first_name" required placeholder="Enter your First Name" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
        <Form.Label>Scholarly Last Name</Form.Label>
        <Form.Control type="text" name="last_name" required placeholder="Enter your Last Name" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
        <Form.Label>Scholarly Headshot</Form.Label>
        <Form.Control type="url" name="profile_image_url" required placeholder="Link a photo" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
        <Form.Label>Scholarly Email Address</Form.Label>
        <Form.Control type="email" name="email" required placeholder="We'll totally not send you adds" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
        <Form.Label>Scholarly Bio</Form.Label>
        <Form.Control as="textarea" name="bio" required placeholder="Enter your Bio" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
        <Form.Text className="text-muted">Let other book nuts know a little bit about you...</Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    photoURL: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;
