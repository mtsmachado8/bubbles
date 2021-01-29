import { create } from "./_repository";

export default async (req, res) => {
  if (req.method === 'POST') {
    const { content, author, bubbleId} = req.body;

    const updatedContent = content.map(content => ({
      ...content,
      id: undefined
    }))
    
    const createdComment = await create(
      updatedContent,
      author,
      bubbleId,
    );

    res.statusCode = 201;
    res.json(createdComment);
  };
};
