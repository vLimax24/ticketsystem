import { NextResponse } from "next/server";
import connect from "../../lib/db";
import Report from "../../models/issues";
import mongoose from "mongoose";
import ImageKit from "imagekit";

import util from "util";

export async function POST(req) {
  // const { projectId, name, description, relevance, email } = await req.json()

  const formData = await req.formData();

  const projectId = formData.get("projectId");
  const name = formData.get("name");
  const email = formData.get("email");
  const description = formData.get("description");
  const relevance = formData.get("relevance");
  const message = formData.get("message");
  const files = formData.getAll("files");

  for (const [name, value] of formData.entries()) {
    console.log(name, value);
  }

  const imagekit = new ImageKit({
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
    urlEndpoint: process.env.URLENDPOINT,
  });

  imagekit.uploadPromise = util.promisify(imagekit.upload);

  try {
    let uploadedFiles = [];

    for (const file of files) {
      let buffer = Buffer.from(await file.arrayBuffer());

      var options = {
        fileName: file.name,
        file: buffer,
        isPrivateFile: false,
        useUniqueFileName: true,
        tags: ["tag1", "tag2"],
      };

      try {
        const result = await imagekit.uploadPromise(options);
        uploadedFiles.push({
          fileName: file.name,
          fileId: result.fileId,
          url: result.url,
        });
      } catch (error) {}
    }

    await connect();
    await Report.create({
      projectId,
      name,
      description,
      relevance,
      email,
      files: uploadedFiles,
    });

    return NextResponse.json({
      msg: ["Message sent successfully"],
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let errorList = [];
      for (let e in error.errors) {
        errorList.push(error.errors[e].message);
      }
      console.log(errorList);
      return NextResponse.json({ msg: errorList });
    } else {
      return NextResponse.json({ msg: ["Unable to send message."] });
    }
  }
}
