import { connect, create, disconnect } from "./_repository";

export default async (req, res) => {
  if (req.method === 'PUT') {
    const { query: { id: championsOnBubbleId } } = req;
    
    const { isSelectedChampion, bubbleId, userId } = req.body;
    
    if(isSelectedChampion) {
      const disconnectedChampion = await disconnect(
        bubbleId,
        championsOnBubbleId,
        userId
      );

      res.statusCode = 200;
      res.json(disconnectedChampion);
      
    } else {
      const createBubbleOnChampion = await create(
        userId,
        bubbleId,
        "test"
      );
      const connectedChampion = await connect(
        bubbleId,
        userId,
      );

      res.statusCode = 200;
      res.json(connectedChampion);
    };
  };
};