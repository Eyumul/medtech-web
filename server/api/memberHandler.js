import connectToDatabase from '../db/connection';
import Members from '../db/membersModel';

export default defineEventHandler(async (event) => {
  await connectToDatabase();

  const method = event.node.req.method;
  const { id } = getQuery(event);
  const body = await readBody(event);

  switch (method) {
    case 'POST': {
      try {
        const newMember = new Members(body);
        const savedMember = await newMember.save();
        return { message: 'Member created successfully', member: savedMember };
      } catch (error) {
        console.error("Server Error:", error);
        throw createError({
          statusCode: 500,
          statusMessage: "Internal Server Error",
          message: "Failed to add member. Please check if the EMAIL and CODE NUMBER are unique and try again."
        });
      }
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
          deactivated: body.deactivated,
          profilePicture: body.profilePicture,
          startDate: body.startDate,
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
