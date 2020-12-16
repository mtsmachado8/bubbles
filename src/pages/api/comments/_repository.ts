import prisma from "../../../../prisma/client";
import { User } from '@prisma/client';

const create = async (content: string, author: User, bubbleId: number) => {
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
  return createdComment;
};

export { create };