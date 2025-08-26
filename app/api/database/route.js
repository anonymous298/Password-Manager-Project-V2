import { NextResponse } from "next/server";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from 'mongodb';

dotenv.config();

const url = process.env.MONGO_DB_URI;
const client = new MongoClient(url);
const dbName = 'passwordManagerDB';

async function getCollection() {
  await client.connect();
  console.log('Connected successfully to MongoDB');
  const db = client.db(dbName);
  return db.collection('passwords');
}

export async function GET(request) {
  const collection = await getCollection();

  // Fetch all documents
  const findResult = await collection.find({}).toArray();

  return NextResponse.json({ data: findResult });
}

export async function POST(request) {
    const collection = await getCollection();

    const data = await request.json();
    console.log(data)

    collection.insertOne(data);

    return NextResponse.json({status: 'data added...'});
}

export async function DELETE(request) {
    const collection = await getCollection()

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // console.log(id, searchParams)
    // console.log(request.url)

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true, task : 'delete', deletedCount: result.deletedCount})
}