import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase} from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { db } = await connectToDatabase();

  // GET - Buscar empresas o obtener todas
  if (req.method === 'GET') {
    try {
      const { search } = req.query;
      let filter = {};

      if (search && typeof search === 'string') {
        filter = {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { corporate: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } }
          ]
        };
      }

      const companies = await db
        .collection('companies')
        .find(filter)
        .sort({ name: 1 })
        .toArray();

      return res.status(200).json(companies);
    } catch (error) {
      console.error('Error fetching companies:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  // POST - Crear nueva empresa
  if (req.method === 'POST') {
    try {
      const { name, url, phone, email, corporate, headquarters } = req.body;

      // Validaciones básicas
      if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
      }

      // Verificar si ya existe una empresa con el mismo nombre o email
      const existingCompany = await db.collection('companies').findOne({
        $or: [
          { name: name.trim() },
          { email: email.trim() }
        ]
      });

      if (existingCompany) {
        return res.status(409).json({ 
          error: 'Company with this name or email already exists' 
        });
      }

      const companyData = {
        name: name.trim(),
        url: url?.trim() || '',
        phone: phone?.trim() || '',
        email: email.trim(),
        corporate: corporate?.trim() || '',
        headquarters: headquarters?.trim() || '',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await db.collection('companies').insertOne(companyData);
      
      return res.status(201).json({
        _id: result.insertedId,
        ...companyData
      });
    } catch (error) {
      console.error('Error creating company:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}