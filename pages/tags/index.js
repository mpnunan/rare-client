import { useEffect, useState } from 'react';
import TagSection from '../../components/tags/TagSection';
import { getAllTags } from '../../utils/data/tagRequests';

export default function Tags() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getAllTags().then(setTags);
  }, []);

  return (
    <main>
      <TagSection tags={tags} />
    </main>
  );
}
