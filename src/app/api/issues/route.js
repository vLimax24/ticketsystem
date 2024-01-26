import {NextResponse} from 'next/server'
import connect from '../../lib/db'
import Report from '../../models/issues'
import mongoose from 'mongoose'

export async function POST(req) {
    const { projectId, name, description, relevance, email, senderEmail } = await req.json()

    try {
        await connect()
        await Report.create({ projectId, name, description, relevance, email, senderEmail })

        return NextResponse.json({
            msg: ['Message sent successfully']
        })
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