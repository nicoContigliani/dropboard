// pages/api/swagger.ts
import { type NextApiRequest, type NextApiResponse } from 'next';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
    },
  },
  apis: ['./pages/api/**/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(swaggerSpec);
}
