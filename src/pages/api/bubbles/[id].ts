import prisma from "../../../../prisma/client";

export default async (req, res) => {
  const { query: { id } } = req;

  if (req.method === 'GET') {
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
        id: parseInt(id as string)
      },
    });
  
    const labels = await prisma.label.findMany();
  
    const serializableBubble = {
      ...bubble,
      createdAt: bubble.createdAt.toString(),
  
      comments: bubble.comments.map(comment => ({
        ...comment,
        createdAt: comment.createdAt.toString(),
      })),
    };
    
    return { props: { bubble: serializableBubble, labels } };
  }
} 