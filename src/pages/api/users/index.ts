import { getAll } from './_repository';

export default async (req, res) => {
  if (req.method === 'GET') {
    const users = await getAll();

    res.statusCode = 200;
    res.json(users);
    
  }
};

