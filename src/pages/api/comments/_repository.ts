import prisma from "../../../../prisma/client";

const create = async (bubbleId, author, content) => {
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