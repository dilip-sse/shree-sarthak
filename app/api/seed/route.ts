import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

const dummyUsers = [
    {
        userId: 'SSE-20121985',
        applicantName: 'Dilip Kumar',
        email: 'dilip@example.com',
        mobileNumber: '9876543210',
        status: 'Active',
        password: 'password123',
    },
    {
        userId: 'SSE-15051990',
        applicantName: 'Sarthak Sharma',
        email: 'sarthak@example.com',
        mobileNumber: '9123456789',
        status: 'Active',
        password: 'password123',
    },
    {
        userId: 'SSE-01012000',
        applicantName: 'Rahul Verma',
        email: 'rahul@example.com',
        mobileNumber: '9988776655',
        status: 'Pending',
        password: 'password123',
    },
    {
        userId: 'SSE-10101988',
        applicantName: 'Anjali Gupta',
        email: 'anjali@example.com',
        mobileNumber: '9898989898',
        status: 'Active',
        password: 'password123',
    },
    {
        userId: 'SSE-25121995',
        applicantName: 'Vikram Singh',
        email: 'vikram@example.com',
        mobileNumber: '9765432109',
        status: 'Inactive',
        password: 'password123',
    }
];

export async function GET() {
    try {
        await dbConnect();

        // Check if users already exist to avoid duplicates
        const count = await User.countDocuments();
        if (count > 0) {
            return NextResponse.json({ message: 'Database already seeded', count });
        }

        await User.insertMany(dummyUsers);

        return NextResponse.json({ message: 'Database seeded successfully', count: dummyUsers.length });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
