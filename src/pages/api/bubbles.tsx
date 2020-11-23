import DBClient from "../../../prisma/client";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const prisma = DBClient.getInstance().prisma;

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
