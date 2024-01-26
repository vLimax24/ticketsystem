// pages/api/auditLog.ts
import { NextResponse } from 'next/server';
import connect from '../../../lib/db';
import AuditLogModel from '../../../models/auditLog';

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
