import { error } from '@sveltejs/kit';
import { MongoClient } from 'mongodb';

const uri = import.meta.env.VITE_MONGODB_URI;
const test = import.meta.env.VITE_TEST_NAME;


// @ts-ignore
export async function POST({request}){
  const body = await request.json();
  const { email, conversation, context } = body;
  if (!email || !conversation || !context) {
    throw error(400, 'Please provide all required fields.');
  }
  // @ts-ignore
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const collection = client.db("proctoring").collection('conversations');
  const count = await collection.countDocuments();
  if (count > 10) {
    await collection.deleteMany({}); // Clear the entire collection
  }
  const result = await collection.insertOne({ student: email, exam: test, conversation: conversation, context: context });
  await client.close();
  if (!result) {
    throw error(500, 'Failed to insert data.');
  }
  // @ts-ignore
  return new Response(collection);
}