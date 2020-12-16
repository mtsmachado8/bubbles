import { getById } from "./_repository";

export default async (req, res) => {
  if (req.method === 'GET') {
    const { query: { id } } = req;

    const bubble = await getById(id);
    
    res.statusCode = 200;
    res.json(bubble);
  } else {
    res.statusCode = 200;
    res.json({ name: 'John Doe' });
  };
};