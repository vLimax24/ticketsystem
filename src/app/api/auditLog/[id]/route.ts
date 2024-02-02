// pages/api/auditLog/[id].ts
import { NextResponse } from 'next/server';
import connect from '../../../lib/db';
import AuditLogModel from '../../../models/auditLog';

export const generateStaticParams = async () => {
  // Fetch dynamic IDs from your database or any other source
  try {
    await connect();
    const logs = await AuditLogModel.find({}, { _id: 1 }); // Fetch all IDs for example
    return logs.map((log:any) => ({ params: { id: log._id.toString() } }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
};

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const id = params.id;
  console.log('find ID:', id);

  try {
    await connect();

    const logs = await AuditLogModel.find({ reportId: id });

    if (logs && logs.length > 0) {
      console.log('Found the card:', logs);
      return new NextResponse(JSON.stringify(logs), { status: 200 });
    } else {
      console.error('Report not found ID:', id);
      return new NextResponse("Report not found", { status: 404 });
    }
  } catch (error) {
    return new NextResponse("Error in searching logs: " + error, { status: 500 });
  }
};
