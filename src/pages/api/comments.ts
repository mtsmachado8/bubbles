import DBClient from "../../../prisma/client";

const prisma = DBClient.getInstance().prisma;

export default async (req, res) => {
  if (req.method === 'POST') {
    
    const { content, bubbleId, author } = req.body;

    const createdComment = await prisma.comment.create({
      data: {
        bubble: {
          connect: { id: bubbleId }
        },
        author: {
          connectOrCreate: {
            where: { email: author.email },
            create: author,
          },
        },
        content,
      },
    });
    res.statusCode = 200;
    res.json(createdComment);

  } else {
    res.statusCode = 200;
    res.json({ name: 'John Doe' });
  };
};
