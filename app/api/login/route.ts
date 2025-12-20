import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request: Request) {
    try {
        await dbConnect();
        const { username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json({
                success: false,
                error: 'Username and password are required'
            }, { status: 400 });
        }

        // Find user by userId in MongoDB
        const user = await User.findOne({ userId: username });

        if (!user) {
            return NextResponse.json({
                success: false,
                error: 'Invalid username. User ID not found.'
            }, { status: 401 });
        }

        // Simple check: password is required but for now we accept any non-empty password
        // as per the requirement in lib/auth.ts (line 48)
        if (!password) {
            return NextResponse.json({
                success: false,
                error: 'Password is required'
            }, { status: 400 });
        }

        // Prepare session user data (similar to lib/auth.ts CurrentUser)
        const sessionUser = {
            userId: user.userId,
            applicantName: user.applicantName,
            email: user.email,
            mobileNumber: user.mobileNumber,
            loginAt: new Date().toISOString(),
        };

        return NextResponse.json({
            success: true,
            user: sessionUser
        });

    } catch (error: any) {
        console.error('Login Error:', error);
        return NextResponse.json({
            success: false,
            error: 'An error occurred during login'
        }, { status: 500 });
    }
}
