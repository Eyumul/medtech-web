import { defineEventHandler } from 'h3';
import connectToDatabase from '../db/connection';
import Members from '../db/membersModel';

export default defineEventHandler(async () => {
  await connectToDatabase();
  const members = await Members.find();
  return { members };
});
