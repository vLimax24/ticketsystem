import connect from "@/app/lib/db";
import Report from "@/app/models/issues";
import { NextResponse } from 'next/server';

export async function PUT(req: any, res: any) {
  try {
    const { input, id } = await req.json()

    try {
      await connect()
      const report = await Report.findOneAndUpdate(
        { _id: id },
        { $push: { comments: input } },
        { new: true }
      );


      if (report) {
        return new NextResponse(JSON.stringify(report), { status: 200 });
      } else {
        return new NextResponse("Report not found", { status: 404 });
      }

    } catch (err) {
      NextResponse.json(err)
    }

    res.status(200).json({ message: "Comment received successfully" });
  } catch (error) {
    console.error("Error handling comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
