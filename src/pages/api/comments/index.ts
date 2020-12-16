import { create } from "./_repository";

export default async (req, res) => {
  if (req.method === 'POST') {
    const { content, author, bubbleId} = req.body;

    try {
      const createdComment = await create(
        content,
        author,
        bubbleId,
      );
      res.statusCode = 200;
      res.json(createdComment);
    } catch (err) {
      res.statusCode = 500;
      res.json(err);
    };
  };
};
