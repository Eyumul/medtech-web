import connectToDatabase from '../db/connection';
import Members from '../db/membersModel';

export default defineEventHandler(async (event) => {
  await connectToDatabase();

  const method = event.node.req.method;
  const { id } = getQuery(event);
  const body = await readBody(event);

  switch (method) {
    case 'POST': {
      const newMember = new Members(body);
      const savedMember = await newMember.save();
      return { message: 'Member created successfully', member: savedMember };
    }
    case 'PUT': {
      const updatedMember = await Members.findByIdAndUpdate(
        id,
        {
          name: body.name,
          email: body.email,
          age: body.age,
          salary: body.salary,
          position: body.position,
          surety: body.surety,
          suretyDocument: body.suretyDocument,
          educationalDocument: body.educationalDocument,
          status: body.status,
          codeNumber: body.codeNumber,
        },
        { new: true }
      );
      if (!updatedMember) return { error: 'Member not found' };
      return { message: 'Member updated successfully', member: updatedMember };
    }
    case 'DELETE': {
      const deletedMember = await Members.findByIdAndDelete(id);
      if (!deletedMember) return { error: 'Member not found' };
      return { message: 'Member deleted successfully' };
    }
    default:
      return { error: 'Invalid request method' };
  }
});
