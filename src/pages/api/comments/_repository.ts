import prisma from "../../../../prisma/client";
import { User } from '@prisma/client';

const create = async (content: any, author: User, bubbleId: number) => {
  if(author) {
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
    
  } else {
    const createdComment = await prisma.comment.create({
      data: {
        bubble: {
          connect: { id: bubbleId }
        },
        content,
      },
    });
    return createdComment;
  };
};

export { create };