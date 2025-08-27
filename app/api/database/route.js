import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGO_DB_URI;
const dbName = process.env.MONGODB_DB;

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

async function getCollection() {
  const client = await clientPromise;
  const db = client.db(dbName);
  return db.collection("passwords");
}

export async function GET() {
  try {
    const collection = await getCollection();
    const data = await collection.find({}).toArray();
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const collection = await getCollection();
    const data = await request.json();
    const result = await collection.insertOne(data);
    return NextResponse.json({ status: "data added", insertedId: result.insertedId });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const collection = await getCollection();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ success: true, deletedCount: result.deletedCount });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
