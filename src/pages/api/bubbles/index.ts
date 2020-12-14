import { create, getAll } from './_repository';

export default async (req, res) => {
  if (req.method === 'GET') {
    const bubbles = await getAll();
    
    res.statusCode = 200;
    res.json(bubbles);

  } if (req.method === 'POST') {
    const { title, description, content, author } = req.body;

    try {
      const createdBubble = await create(
        title,
        description,
        content,
        author,
      );
      res.statusCode = 200;
      res.json(createdBubble);
    } catch (err) {
      res.statusCode = 500;
      res.json(err);
    };
  };
};
