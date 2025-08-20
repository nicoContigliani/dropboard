// pages/api/uploads/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Verificar autenticación
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Token de autenticación requerido' });
    }

    const decodedToken: any = verifyToken(token);
    if (!decodedToken) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }

    const { id } = req.query;
    const { db } = await connectToDatabase();

    // GET - Obtener un upload específico
    if (req.method === 'GET') {
        try {
            if (!id || typeof id !== 'string') {
                return res.status(400).json({ message: 'ID inválido' });
            }

            const upload = await db.collection('uploads').findOne({
                _id: new ObjectId(id),
                'owner.id': decodedToken.userId
            });

            if (!upload) {
                return res.status(404).json({ message: 'Upload no encontrado' });
            }

            return res.status(200).json(upload);
        } catch (error) {
            console.error('Error fetching upload:', error);
            return res.status(500).json({ message: 'Error al obtener el upload' });
        }
    }

    // PUT - Actualizar un upload
    else if (req.method === 'PUT') {
        try {
            if (!id || typeof id !== 'string') {
                return res.status(400).json({ message: 'ID inválido' });
            }

            const { data, metadata, group } = req.body;

            const updateData: any = { updatedAt: new Date() };
            if (data) updateData.data = data;
            if (metadata) updateData.metadata = metadata;
            if (group) updateData.group = group;

            const result: any | null = await db.collection('uploads').findOneAndUpdate(
                {
                    _id: new ObjectId(id),
                    'owner.id': decodedToken.userId
                },
                { $set: updateData },
                { returnDocument: 'after' }
            );

            if (!result.value) {
                return res.status(404).json({ message: 'Upload no encontrado' });
            }

            return res.status(200).json(result.value);
        } catch (error) {
            console.error('Error updating upload:', error);
            return res.status(500).json({ message: 'Error al actualizar el upload' });
        }
    }

    // DELETE - Eliminar un upload
    else if (req.method === 'DELETE') {
        try {
            if (!id || typeof id !== 'string') {
                return res.status(400).json({ message: 'ID inválido' });
            }

            const result: any | undefined = await db.collection('uploads').findOneAndDelete({
                _id: new ObjectId(id),
                'owner.id': decodedToken.userId
            });

            if (!result.value) {
                return res.status(404).json({ message: 'Upload no encontrado' });
            }

            return res.status(200).json({ message: 'Upload eliminado correctamente', id });
        } catch (error) {
            console.error('Error deleting upload:', error);
            return res.status(500).json({ message: 'Error al eliminar el upload' });
        }
    }

    else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}