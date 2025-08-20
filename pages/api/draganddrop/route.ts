// app/api/draganddrop/route.ts
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/db';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    
    const data = await db.collection('boards').findOne({
      "_id": new ObjectId("68a355de16fda17c2ccb92b8")
    });

    if (!data) {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch board data" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { db } = await connectToDatabase();
    const body = await request.json();
    
    await db.collection('boards').updateOne(
      { "_id": new ObjectId("68a355de16fda17c2ccb92b8") },
      { $set: { "data.board.columns": body.columns } }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update board" },
      { status: 500 }
    );
  }
}