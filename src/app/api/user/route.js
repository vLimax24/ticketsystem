import connect from '../../lib/db'
import User from '../../models/user'
import { NextResponse } from 'next/server';

export async function POST(request) {
    const { name, email, imageUrl, role, provider } = await request.json()
    await connect()
    await User.create({ name, email, imageUrl, role, provider })
    return NextResponse.json({ message: 'User Registered' }, { status: 201 })
}