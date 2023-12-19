import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import TagSection from '../../components/tags/TagSection';
import { getAllTags, updateTag, deleteTag } from '../../utils/data/tagRequests';
import EditTagModal from '../../components/forms/EditTag';

export default function Tags() {
  const [tags, setTags] = useState([]);
  const [editingTag, setEditingTag] = useState();

  useEffect(() => {
    getAllTags().then(setTags);
  }, []);

  const handleEdit = (tag) => {
    setEditingTag(tag);
  };

  const handleDelete = async (id) => {
    await deleteTag(id);
    setTags(tags.filter((tag) => tag.id !== id));
  };

  const handleSaveChanges = async (updatedTag) => {
    await updateTag(updatedTag.id, updatedTag);
    setTags(tags.map((tag) => (tag.id === updatedTag.id ? updatedTag : tag)));
    setEditingTag(null);
  };

  return (
    <>
      <Head>
        <title>Tags</title>
      </Head>
      <div className="center-container">
        <Link href="/tags/new" passHref>
          <Button style={{ backgroundColor: '#023e8a', marginBottom: '30px', marginTop: '20px' }}>Create Tag</Button>
        </Link>
      </div>
      <main>
        <TagSection tags={tags} onEdit={handleEdit} onDelete={handleDelete} />
      </main>
      {editingTag && (
      <EditTagModal
        show={!!editingTag}
        tag={editingTag}
        handleClose={() => setEditingTag(null)}
        handleSave={handleSaveChanges}
      />
      )}
    </>
  );
}
