import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
    try {
        await dbConnect();
        const users = await User.find({}).sort({ registeredAt: -1 });

        return NextResponse.json({
            success: true,
            users
        });

    } catch (error: any) {
        console.error('Fetch Users Error:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch users'
        }, { status: 500 });
    }
}
