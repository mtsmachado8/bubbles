import { remove } from './_repository';

export default async (req, res) => {
  if (req.method === 'DELETE') {
    const { query: { id } } = req;

    const disliked = await remove(
      id,
    );

    res.statusCode = 200;
    res.json(disliked);
  };
};