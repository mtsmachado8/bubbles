import prisma from "../../../../prisma/client";
import { User } from '@prisma/client';

const create = async (bubbleId: number, author: User) => {
  const liked = await prisma.like.create({
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
    },
  });
  return liked;
};

const remove = async (id: string) => {
  const disliked = await prisma.like.delete({
    where: { id: parseInt(id) },
  });

  return disliked;
};

export { create, remove };