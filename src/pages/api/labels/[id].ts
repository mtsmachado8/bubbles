import prisma from "../../../../prisma/client";

export default async (req, res) => {
  if (req.method === 'PUT') {
    const { query: { id } } = req;
    
    const { isSelectedLabel, bubbleId, labelId } = req.body;
    
    if(isSelectedLabel) {
      const alteredLabel = await prisma.label.update({
        where: { id: labelId },
        data: {
          Bubbles: {
            disconnect: { id: bubbleId },
          },
        },
      });
      res.statusCode = 200;
      res.json(alteredLabel);

    } else {
      const alteredLabel = await prisma.label.update({
        where: { id: labelId },
        data: {
          Bubbles: {
            connect: { id: bubbleId },
          },
        },
      });
      res.statusCode = 200;
      res.json(alteredLabel);
    };

  } else {
    res.statusCode = 200;
    res.json({ name: 'John Doe' });
  };
}