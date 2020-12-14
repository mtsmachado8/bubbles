import prisma from "../../../../prisma/client";

const getAll = async () => {
  const labels = await prisma.label.findMany();

  return labels;
};

const create = async (name, description, color) => {
  const createdLabel = await prisma.label.create({
    data: {
      name,
      description,
      color,
    },
  });
  return createdLabel
};

const createAndLink = async (name, description, color, bubbleId) => {
  const createdLabel = await prisma.label.create({
    data: {
      name,
      description,
      color,
      Bubbles: {
        connect: { id: bubbleId },
      },
    },
  });
  return createdLabel;
};

const connect = async (labelId, bubbleId) => {
  const conectedLabel = await prisma.label.update({
    where: { id: labelId },
    data: {
      Bubbles: {
        connect: { id: bubbleId },
      },
    },
  });
  return conectedLabel;
};

const disconnect = async (labelId: number, bubbleId: number) => {
  const disconnectedLabel = await prisma.label.update({
    where: { id: labelId },
    data: {
      Bubbles: {
        disconnect: { id: bubbleId },
      },
    },
  });
  return disconnectedLabel;
};

export { getAll, create, createAndLink, connect, disconnect };