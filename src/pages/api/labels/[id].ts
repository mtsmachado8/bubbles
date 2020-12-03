import prisma from "../../../../prisma/client";

export default async (req, res) => {
  if (req.method === 'PUT') {
    const { query: { id } } = req;
    
    const { bubbleId } = req.body;
  
    const alteredLabel = await prisma.label.update({
      where: { id },
      data: {
        Bubbles: {
          disconnect: { id: bubbleId },
        },
      },
    });
    res.statusCode = 200;
    res.json(alteredLabel);

  } else {
    res.statusCode = 200;
    res.json({ name: 'John Doe' });
  };
}