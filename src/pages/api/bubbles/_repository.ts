import prisma from "../../../../prisma/client";

const getAll = async () => {
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

  const serializedBubbles = bubblesResponse.map(bubble => ({
    ...bubble,
    createdAt: bubble.createdAt.toString(),

    comments: bubble.comments.map(comment => ({
      ...comment,
      createdAt: comment.createdAt.toString(),
    })),
  }));

  return serializedBubbles;
};

const getById = async (id: string) => {
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
  
  const serializedBubble = {
    ...bubble,
    createdAt: bubble.createdAt.toString(),

    comments: bubble.comments.map(comment => ({
      ...comment,
      createdAt: comment.createdAt.toString(),
    })),
  };

  return serializedBubble;
};

const create = async (title, description, content, author) => {
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
  return createdBubble;
}

export { getAll, getById, create }