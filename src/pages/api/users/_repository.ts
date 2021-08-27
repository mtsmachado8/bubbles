import prisma from "../../../../prisma/client";

const getAll = async () => {
  const user = await prisma.user.findMany();
  return user;
};

export { getAll };