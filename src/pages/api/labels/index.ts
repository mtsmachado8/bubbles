import prisma from "../../../../prisma/client";

export default async (req, res) => {
  if (req.method === 'POST') {
    
    const { name, description, color, bubbleId } = req.body;

    if(bubbleId) {
      const createdLabel = await prisma.label.create({
        data: {
          name,
          description,
          color,
          Bubbles: {
            connect: { id: bubbleId }
          },
        },
      });
      res.statusCode = 200;
      res.json(createdLabel);

    } else {
      const createdLabel = await prisma.label.create({
        data: {
          name,
          description,
          color,
        },
      });
      res.statusCode = 200;
      res.json(createdLabel);
    }
  } else {
    res.statusCode = 200;
    res.json({ name: 'John Doe' });
  };
};

