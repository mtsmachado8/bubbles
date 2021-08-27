import prisma from "../../../../prisma/client";

const getAll = async () => {
  const champions = await prisma.championsOnBubbles.findMany();
  return champions;
}

const create = async (userId: number, bubbleId: number, assignedBy: string) => {
  const createdChampion = await prisma.championsOnBubbles.create({
    data: {
      assignedBy,
      bubble: {
        connect: {
          id: bubbleId
        }
      },
      champion: {
        connect: {
          id: userId
        }
      },
      assignedAt: new Date()
    },
  });
  return createdChampion
};

const connect = async (bubbleId: number, userId: string) => {
  const createdChampion = await prisma.bubble.update({
    where: { id: bubbleId },
    data: {
      champions: {
        connect: {
          championId_bubbleId: {
            bubbleId: bubbleId,
            championId: parseInt(userId),
          }
        }
      }
    },
  });
  return createdChampion;
}

const disconnect = async (bubbleId: number, championsOnBubbleId: string, userId: number) => {
  const disconnectedChampion = await prisma.championsOnBubbles.delete({
    where: {
      championId_bubbleId: {
        bubbleId,
        championId: userId
      }
    },
  });

  return disconnectedChampion
};

export {
  connect,
  disconnect,
  getAll,
  create
}