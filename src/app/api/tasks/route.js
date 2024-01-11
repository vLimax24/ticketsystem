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
