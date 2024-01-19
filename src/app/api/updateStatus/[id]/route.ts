// Import necessary modules and model
import { NextResponse } from 'next/server';
import Report from '../../../models/issues';
import connect from '../../../lib/db';

export const PUT = async (
  request: Request,
  { params }: { params: { id: string } }
) => {

    const id = params.id

  try {
    await connect();
    if (request.method === 'PUT') {
      const requestBody = await request.text();

      try {
        const { statusToUpdate } = JSON.parse(requestBody);
        const updatedStatus: any = await Report.updateOne(
          { _id: id },
          { $set: { status: statusToUpdate } },
          { new: true }
        );

        return new NextResponse(updatedStatus, { status: 200 });
      } catch (jsonError) {
        console.error('Error parsing JSON:', jsonError);
        return new NextResponse('Invalid JSON format', { status: 400 });
      }
    } else {
      return new NextResponse('Method Not Allowed', { status: 405 });
    }
  } catch (error: any) {
    console.error('Error in updating status:', error);
    return new NextResponse(error, { status: 500 });
  }
};
