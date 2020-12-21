import { connect, disconnect } from "./_repository";

export default async (req, res) => {
  if (req.method === 'PUT') {
    const { query: { id } } = req;
    
    const { isSelectedLabel, bubbleId } = req.body;
    
    if(isSelectedLabel) {
      const disconnectedLabel = await disconnect(
        id,
        bubbleId,
      );

      res.statusCode = 200;
      res.json(disconnectedLabel);
      
    } else {
      const connectedLabel = await connect(
        id,
        bubbleId,
      );

      res.statusCode = 200;
      res.json(connectedLabel);
    };
  };
};