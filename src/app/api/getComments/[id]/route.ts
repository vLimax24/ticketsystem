import { NextResponse } from 'next/server'
import connect from '../../../lib/db';
import Report from '../../../models/issues';

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;

    await connect();
    const report = await Report.findById(id);

    if (!report) {
      console.error('Report not found for ID:', id);
      return new NextResponse(JSON.stringify({ error: "Report not found" }), { status: 404 });
    }

    const comments = report.comments;
    return new NextResponse(JSON.stringify({ comments }), { status: 200 });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return new NextResponse(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
