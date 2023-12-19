import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Form } from 'react-bootstrap';
import { createTag } from '../../utils/data/tagRequests';

const initialDescription = {
  description: '',
};

export default function TagForm() {
  const [description, setDescription] = useState(initialDescription);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDescription((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTag(description).then(() => router.push('/'));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Apparently we need more tags</Form.Label>
        <Form.Control
          name="description"
          type="text"
          value={description}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
