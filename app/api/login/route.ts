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

        // Check password if it exists on the user record
        // Check password logic:
        // 1. If user has a specific password set, check against that
        // 2. Also allow global fallbacks '123456' and 'password123' as requested
        const validPasswords = [user.password, '123456', 'password123'].filter(Boolean);

        if (!validPasswords.includes(password)) {
            return NextResponse.json({
                success: false,
                error: 'Invalid password'
            }, { status: 401 });
        }

        // If user has no password (legacy), we might want to allow them or force reset.
        // For now, if no password is in DB, we'll allow login (backward compatibility)
        // unless you want to enforce it.
        // But since we added a default to the schema, new fetches should have it.

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
