import { NextResponse } from "next/server";
import connect from "../../../lib/db";
import Report from "../../../models/issues";

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const id = params.id;
  console.log(id);

  try {
    await connect();
    console.log("Deleting report with ID:", id);
    const deletedReport = await Report.deleteOne({ _id: id });
    if (deletedReport.deletedCount === 1) {
      console.log("Report deleted successfully:", deletedReport);
      return new NextResponse(JSON.stringify(deletedReport), { status: 200 });
    } else {
      console.error("Report not found or not deleted:", deletedReport);
      return new NextResponse("Report not found or not deleted", {
        status: 404,
      });
    }
  } catch (error: any) {
    console.error("Error in deleting report:", error);
    return new NextResponse(error, { status: 500 });
  }
};

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const id = params.id;
  console.log(id);

  try {
    await connect();
    console.log("GET report with ID:", id);
    const report = await Report.findOne({ _id: id });
    if (report) {
      return new NextResponse(JSON.stringify(report), { status: 200 });
    } else {
      console.error("Report not found", report);
      return new NextResponse("Report not found", {
        status: 404,
      });
    }
  } catch (error: any) {
    console.error("Error in finding report:", error);
    return new NextResponse(error, { status: 500 });
  }
};
