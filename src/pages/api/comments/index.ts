import { create } from "./_repository";

export default async (req, res) => {
  if (req.method === 'POST') {
    const { content, author, bubbleId} = req.body;

      const createdComment = await create(
        content,
        author,
        bubbleId,
      );
      res.statusCode = 200;
      res.json(createdComment);
  };
};
