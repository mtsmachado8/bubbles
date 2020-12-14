import { create, createAndLink, getAll } from './_repository';

export default async (req, res) => {
  if (req.method === 'GET') {
    const labels = await getAll();

    res.statusCode = 200;
    res.json(labels);
    
  } if (req.method === 'POST') {
    const { name, description, color, bubbleId } = req.body;

    if(bubbleId) {
      try{
        const createdLabel = await createAndLink(
          name,
          description,
          color,
          bubbleId
        );
        res.statusCode = 201;
        res.json(createdLabel);
      } catch (err) {
        res.statusCode = 500;
        res.json(err);
      };
    } else {
      try{
        const createdLabel = await create(
          name,
          description,
          color,
        );
        res.statusCode = 201;
        res.json(createdLabel);
      } catch (err) {
        res.statusCode = 500;
        res.json(err);
      };
    };
  };
};

