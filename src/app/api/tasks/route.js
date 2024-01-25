import { NextResponse } from 'next/server'
import connect from '../../../app/lib/db'
import Report from '../../../app/models/issues'

export const GET = async (request) => {
    try {
        await connect()
        const products = await Report.find()
        return new NextResponse(JSON.stringify(products), { status: 200})
    } catch (error) {
        return new NextResponse("Error in searching Products", error, { status: 500})
    }
}

export const POST = async (request) => {
    const { projectId, name, description, relevance, email } = await request.json()

    console.log("-------------------------------------------------", projectId, name, description, relevance, email)

    try {
        await connect()
        const searchCriteria = {
            projectId: projectId,
            email: email
        }
        
        const existingTask = await Report.findOne(searchCriteria)
        if (existingTask) {
            console.log("Already shared!")
            return NextResponse.json({
                msg: 'Already shared!'
            })
        } else {
            await Report.create({ projectId, name, description, relevance, email })
            console.log("Task shared!")
            return NextResponse.json({
                msg: 'Task shared!'
            })
        }
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




