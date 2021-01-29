import { create, getAll } from './_repository';

export default async (req, res) => {
  if (req.method === 'GET') {
    const bubbles = await getAll();
    
    res.statusCode = 200;
    res.json(bubbles);

  } if (req.method === 'POST') {
    const { title, description, content, author } = req.body;
    
    const updatedContent = content.map(content => ({
      ...content,
      id: undefined
    }))

    const createdBubble = await create(
      title,
      description,
      updatedContent,
      author,
    );
    res.statusCode = 201;
    res.json(createdBubble);
  };
};
