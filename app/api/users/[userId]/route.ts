import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(
    request: Request,
    { params }: { params: { userId: string } }
) {
    try {
        await dbConnect();
        const { userId } = params;

        const user = await User.findOne({ userId });

        if (!user) {
            return NextResponse.json({
                success: false,
                error: 'User not found'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            user
        });

    } catch (error: any) {
        console.error('Fetch User Error:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch user data'
        }, { status: 500 });
    }
}
