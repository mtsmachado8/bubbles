import prisma from "../../../prisma/client";

export default async (req, res) => {
  if (req.method === 'POST') {
    
    const { title, description, content, author } = req.body;

    const createdBubble = await prisma.bubble.create({
      data: {
        title,
        description,
        content,
        author: {
          connectOrCreate: {
            where: { email: author.email },
            create: author,
          },
        },
      },
    });
    res.statusCode = 200;
    res.json(createdBubble);

  } else {
    res.statusCode = 200;
    res.json({ name: 'John Doe' });
  };
};
