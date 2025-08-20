import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm } from 'formidable';
import { promises as fs } from 'fs';
import * as XLSX from 'xlsx';
import csvParser from 'csv-parser';
import { connectToDatabase } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function parseExcel(buffer: Buffer) {
  const workbook = XLSX.read(buffer);
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  return XLSX.utils.sheet_to_json(worksheet);
}

async function parseCSV(buffer: Buffer) {
  const results: any[] = [];
  const stream = require('stream');
  const readable = new stream.Readable();
  readable.push(buffer);
  readable.push(null);

  return new Promise((resolve, reject) => {
    readable
      .pipe(csvParser())
      .on('data', (data: any) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error: any) => reject(error));
  });
}

async function parseJSON(buffer: Buffer) {
  return JSON.parse(buffer.toString());
}

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

  const { db } = await connectToDatabase();

  // GET - Obtener todos los uploads del usuario
  if (req.method === 'GET') {
    console.log("llegue")
    console.log(decodedToken?.userId);
    try {
      const uploads = await db.collection('uploads')
        .find({ 'owner.id': decodedToken?.userId })
        .sort({ createdAt: -1 })
        .toArray();
      
      return res.status(200).json(uploads);
    } catch (error) {
      console.error('Error fetching uploads:', error);
      return res.status(500).json({ message: 'Error al obtener los uploads' });
    }
  }
  
  // POST - Crear un nuevo upload
  else if (req.method === 'POST') {
    try {
      const form = new IncomingForm();
      const [fields, files] = await new Promise<[any, any]>((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) return reject(err);
          resolve([fields, files]);
        });
      });

      let fileData;
      let jsonData;

      if (files.file) {
        // Handle file upload
        const file = files.file[0];
        const buffer = await fs.readFile(file.filepath);

        switch (file.mimetype) {
          case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            jsonData = await parseExcel(buffer);
            break;
          case 'text/csv':
            jsonData = await parseCSV(buffer);
            break;
          case 'application/json':
            jsonData = await parseJSON(buffer);
            break;
          default:
            return res.status(400).json({ message: 'Unsupported file type' });
        }

        fileData = {
          originalFilename: file.originalFilename,
          mimetype: file.mimetype,
          size: file.size,
          source: 'file-upload'
        };
      } else if (fields.jsonText) {
        // Handle JSON text input
        try {
          jsonData = JSON.parse(fields.jsonText[0]);
        } catch (error) {
          return res.status(400).json({ message: 'Invalid JSON format' });
        }
        fileData = { source: 'text-input' };
      } else {
        return res.status(400).json({ message: 'No file or JSON data provided' });
      }

      // Guardar en base de datos
      const result = await db.collection('uploads').insertOne({
        data: jsonData,
        metadata: fileData,
        owner: {
          id: decodedToken.userId,
          email: decodedToken.email
        },
        group: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Obtener el documento recién insertado
      const newUpload = await db.collection('uploads').findOne({ _id: result.insertedId });

      return res.status(201).json(newUpload);
    } catch (error) {
      console.error('Upload error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}