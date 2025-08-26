import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase} from '../../../lib/db';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { db } = await connectToDatabase();
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  try {
    // Verificar que el ID es válido
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const objectId = new ObjectId(id);

    // GET - Obtener empresa por ID
    if (req.method === 'GET') {
      const company = await db
        .collection('companies')
        .findOne({ _id: objectId });

      if (!company) {
        return res.status(404).json({ error: 'Company not found' });
      }

      return res.status(200).json(company);
    }

    // PUT - Actualizar empresa
    if (req.method === 'PUT') {
      const { name, url, phone, email, corporate, headquarters } = req.body;

      // Verificar si la empresa existe
      const existingCompany = await db
        .collection('companies')
        .findOne({ _id: objectId });

      if (!existingCompany) {
        return res.status(404).json({ error: 'Company not found' });
      }

      // Verificar si ya existe otra empresa con el mismo nombre o email
      if (name || email) {
        const duplicateFilter: any = { _id: { $ne: objectId } };
        if (name) duplicateFilter.name = name.trim();
        if (email) duplicateFilter.email = email.trim();
        
        const duplicateCompany = await db
          .collection('companies')
          .findOne({ $or: [duplicateFilter] });

        if (duplicateCompany) {
          return res.status(409).json({ 
            error: 'Another company with this name or email already exists' 
          });
        }
      }

      const updateData: any = {
        updatedAt: new Date()
      };

      if (name) updateData.name = name.trim();
      if (url !== undefined) updateData.url = url?.trim() || '';
      if (phone !== undefined) updateData.phone = phone?.trim() || '';
      if (email) updateData.email = email.trim();
      if (corporate !== undefined) updateData.corporate = corporate?.trim() || '';
      if (headquarters !== undefined) updateData.headquarters = headquarters?.trim() || '';

      const result = await db
        .collection('companies')
        .updateOne({ _id: objectId }, { $set: updateData });

      if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'Company not found' });
      }

      const updatedCompany = await db
        .collection('companies')
        .findOne({ _id: objectId });

      return res.status(200).json(updatedCompany);
    }

    // DELETE - Eliminar empresa
    if (req.method === 'DELETE') {
      const result = await db
        .collection('companies')
        .deleteOne({ _id: objectId });

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Company not found' });
      }

      return res.status(200).json({ message: 'Company deleted successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error in company API:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}