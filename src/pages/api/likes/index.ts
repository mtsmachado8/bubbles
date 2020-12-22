import { create } from "./_repository";

export default async (req, res) => {
  if (req.method === 'POST') {
    const { bubbleId, author } = req.body;

    const like = await create(
      bubbleId,
      author,
    );

    res.statusCode = 201;
    res.json(like);
  };
};
