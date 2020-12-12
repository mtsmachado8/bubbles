import prisma from "../../../../prisma/client";

export default async (req, res) => {
  if (req.method === 'GET') {

    const bubblesResponse = await prisma.bubble.findMany({
      include: {
        labels: true,
        comments: {
          include: {
            author: {
              select: {
                avatarUrl: true,
                name: true,
              },
            },
          },
        },
        author: {
          select: {
            avatarUrl: true,
          },
        },
      },
    });

    const serializableBubbles = bubblesResponse.map(bubble => ({
      ...bubble,
      createdAt: bubble.createdAt.toString(),

      comments: bubble.comments.map(comment => ({
        ...comment,
        createdAt: comment.createdAt.toString(),
      })),
    }));
    
    
    res.statusCode = 200;
    res.json(serializableBubbles);

  } if (req.method === 'POST') {

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
