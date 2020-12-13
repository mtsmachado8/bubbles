import prisma from "../../../../prisma/client";

export default async (req, res) => {
  if (req.method === 'GET') {
    const { query: { id } } = req;

    const bubble = await prisma.bubble.findUnique({
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
      where: {
        id: parseInt(id as string),
      },
    });
    
    const serializableBubble = {
      ...bubble,
      createdAt: bubble.createdAt.toString(),
  
      comments: bubble.comments.map(comment => ({
        ...comment,
        createdAt: comment.createdAt.toString(),
      })),
    };
    
    res.statusCode = 200;
    res.json(serializableBubble);
    
  } else {
    res.statusCode = 200;
    res.json({ name: 'John Doe' });
  }
} 