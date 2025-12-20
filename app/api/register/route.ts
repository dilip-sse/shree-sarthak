import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request: Request) {
    try {
        await dbConnect();
        const data = await request.json();

        // Create new user in MongoDB
        const newUser = await User.create({
            ...data,
            registeredAt: new Date().toISOString(),
        });

        return NextResponse.json({
            success: true,
            message: 'User registered successfully',
            user: newUser
        }, { status: 201 });

    } catch (error: any) {
        console.error('Registration Error:', error);

        // Handle duplicate userId error
        if (error.code === 11000) {
            return NextResponse.json({
                success: false,
                error: 'User ID already exists'
            }, { status: 400 });
        }

        return NextResponse.json({
            success: false,
            error: error.message || 'Error occurred during registration'
        }, { status: 500 });
    }
}
