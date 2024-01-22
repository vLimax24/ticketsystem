import { NextResponse } from 'next/server';
import connect from '../../../lib/db';
import Report from '../../../models/issues';

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const id = params.id;
  console.log('Request received to find report with ID:', id);

  try {
    await connect();

    console.log('Attempting to find ID:', id);
    const detailedCard = await Report.findOne({ _id: id });

    if (detailedCard) {
      // console.log('Found the card:', detailedCard);
      return new NextResponse(JSON.stringify(detailedCard), { status: 200 });
    } else {
      console.error('Report not found ID:', id);
      return new NextResponse("Report not found", { status: 404 });
    }
  } catch (error) {
    console.error('Error in deleting report:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
};
