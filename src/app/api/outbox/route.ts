import { NextResponse } from 'next/server'
import connect from '../../../app/lib/db'
import Report from '../../../app/models/issues'

export const POST = async (request:any) => {
    try {
        await connect()
        const { senderEmail } = await request.json()
        const products = await Report.find({ senderEmail })
        return new NextResponse(JSON.stringify(products), { status: 200})
    } catch (error) {
        return new NextResponse("Error in searching Products" + error, { status: 500})
    }
}