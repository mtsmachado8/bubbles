import { connect, disconnect } from "./_repository";

export default async (req, res) => {
  if (req.method === 'PUT') {
    const { query: { id } } = req;
    
    const { isSelectedLabel, bubbleId, labelId } = req.body;
    
    if(isSelectedLabel) {
      try {
        const disconnectedLabel = await disconnect(
          labelId,
          bubbleId,
        );
        res.statusCode = 200;
        res.json(disconnectedLabel);
      } catch (err) {
        res.statusCode = 500;
        res.json(err);
      };
    } else {
      try {
        const connectedLabel = await connect(
          labelId,
          bubbleId,
        );
        res.statusCode = 200;
        res.json(connectedLabel);
      } catch (err) {
        res.statusCode = 500;
        res.json(err);
      };
    };
  };
};