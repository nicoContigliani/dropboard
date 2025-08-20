import { NextApiRequest, NextApiResponse } from 'next';
import swaggerDocs from '../../api/swagger/swagger-setup';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (process.env.NODE_ENV === 'production') {
    return res.status(404).json({ message: 'Not found' });
  }

  return swaggerDocs(req, res);
}