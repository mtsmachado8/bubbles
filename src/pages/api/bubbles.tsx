import DBClient from "../../../prisma/client";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const prisma = DBClient.getInstance().prisma;

export default async (req, res) => {
  if (req.method === 'POST') {
    const { title, description, content } = req.body
    console.log(title)
    console.log(description)
    console.log(content)
    
    const createdBubble = await prisma.bubble.create({
      data: {
        title: 'Titulo 1',
        description: 'Description 1',
        content: 'Content 1'
      }
    })
    res.statusCode = 200
    res.json(createdBubble)

  } else {
    res.statusCode = 200
    res.json({ name: 'John Doe' })
  }
}
