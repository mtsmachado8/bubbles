import prisma from "../../../../prisma/client";
import { User } from "@prisma/client";

const getAll = async () => {
  const bubblesResponse = await prisma.bubble.findMany({
    include: {
      labels: true,
      likes: {
        include: {
          author: {
            select: {
              email: true,
            },
          },
        },
      },
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
      likes: {
        include: {
          author: {
            select: {
              email: true,
            },
          },
        },
      },
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
      id: parseInt(id),
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

const create = async (title: string, description: string, content: string, author: User) => {
  if(author) {
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
  } else {
    const createdBubble = await prisma.bubble.create({
      data: {
        title,
        description,
        content,
      },
    });
    return createdBubble;
  };
};

export { getAll, getById, create }