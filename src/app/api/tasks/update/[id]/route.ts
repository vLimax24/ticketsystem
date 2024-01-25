// Import necessary modules and model
import { NextResponse } from 'next/server';
import connect from '../../../../lib/db';
import Report from '../../../../models/issues';

export const PUT = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const id = params.id;

  try {
    // Connect to the database
    await connect();

    // Check if the method is PUT
    if (request.method === 'PUT') {
      // Read the request body as text
      const requestBody = await request.text();

      // Parse the JSON from the request body
      const { newEmail } = JSON.parse(requestBody);

      // Update the document in the database
      // const updatedReport:any = await Report.findOneAndUpdate(
      const updatedReport:any = await Report.updateOne(
        { _id: id },
        { $set: { email: newEmail } },
        { new: true }
      );

      // Return the modified document
      return new NextResponse(updatedReport, { status: 200 });
    } else {
      // If the method is not PUT, return an error response
      return new NextResponse('Method Not Allowed', { status: 405 });
    }
  } catch (error: any) {
    console.error('Error in updating report:', error);
    return new NextResponse(error, { status: 500 });
  }
};
