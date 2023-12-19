import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Form } from 'react-bootstrap';
import { createTag } from '../../utils/data/tagRequests';

const initialLabel = {
  label: '',
};

export default function TagForm() {
  const [label, setLabel] = useState(initialLabel);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLabel((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTag(label).then(() => router.push('/tags'));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Apparently we need more tags</Form.Label>
        <Form.Control
          name="label"
          type="text"
          value={label.label}
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
