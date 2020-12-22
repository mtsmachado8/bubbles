import prisma from "../../../../prisma/client";
import { User } from '@prisma/client';

const create = async (bubbleId: number, author: User) => {
  const like = await prisma.like.create({
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
  return like;
};

const remove = async (id: string) => {
  const removedLike = await prisma.like.delete({
    where: { id: parseInt(id) },
  });

  return removedLike;
};

export { create, remove };