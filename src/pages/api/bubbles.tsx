import DBClient from "../../../prisma/client";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const prisma = DBClient.getInstance().prisma;

export default async (req, res) => {
  if (req.method === 'POST') {
    
    const { title, description, content, name, email, avatarUrl } = req.body;

    if(!(name || email || avatarUrl) === null || undefined) {
      const createdBubble = await prisma.bubble.create({
        data: {
          title,
          description,
          content,
        },
      });
      res.statusCode = 200;
      res.json(createdBubble);
      
    } else {
      const createdBubble = await prisma.bubble.create({
        data: {
          title,
          description,
          content,
        },
      });

      const createdUser = await prisma.user.create({
        data: {
          name,
          email,
          avatarUrl,
          bubbles: createdBubble[createdBubble.id],
        },
      });
      res.statusCode = 200;
      res.json(createdBubble, createdUser);
    };

  } else {
    res.statusCode = 200;
    res.json({ name: 'John Doe' });
  };
};
