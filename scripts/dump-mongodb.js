const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://dilipsse_db_user:fGrZZTPqI3CwpaE1@cluster0.dxnpfxe.mongodb.net/';

const dummdyUsers = [
    {
        userId: 'SSE-20121985',
        applicantName: 'Dilip Kumar',
        email: 'dilip@example.com',
        mobileNumber: '9876543210',
        dateOfBirth: '1985-12-20',
        gender: 'Male',
        sponsorId: 'CORP-001',
        pinCode: '400001',
        state: 'Maharashtra',
        city: 'Mumbai',
        address: 'Flat 101, Building A, Mumbai, Maharashtra',
        status: 'Active',
        registeredAt: new Date('2025-12-19T10:00:00')
    },
    {
        userId: 'SSE-15051990',
        applicantName: 'Sarthak Sharma',
        email: 'sarthak@example.com',
        mobileNumber: '9123456789',
        dateOfBirth: '1990-05-15',
        gender: 'Male',
        sponsorId: 'SSE-20121985',
        pinCode: '110001',
        state: 'Delhi',
        city: 'New Delhi',
        address: 'H No 123, Street 4, New Delhi',
        status: 'Active',
        registeredAt: new Date('2025-12-20T11:00:00')
    },
    {
        userId: 'SSE-01012000',
        applicantName: 'Rahul Verma',
        email: 'rahul@example.com',
        mobileNumber: '9988776655',
        dateOfBirth: '2000-01-01',
        gender: 'Male',
        sponsorId: 'SSE-15051990',
        pinCode: '560001',
        state: 'Karnataka',
        city: 'Bengaluru',
        address: 'Apt 4B, Green Residency, Bengaluru',
        status: 'Pending',
        registeredAt: new Date('2025-12-20T12:00:00')
    },
    {
        userId: 'SSE-10101988',
        applicantName: 'Anjali Gupta',
        email: 'anjali@example.com',
        mobileNumber: '9898989898',
        dateOfBirth: '1988-10-10',
        gender: 'Female',
        sponsorId: 'SSE-20121985',
        pinCode: '700001',
        state: 'West Bengal',
        city: 'Kolkata',
        address: '56A, Park Street, Kolkata',
        status: 'Active',
        registeredAt: new Date('2025-12-20T13:00:00')
    },
    {
        userId: 'SSE-25121995',
        applicantName: 'Vikram Singh',
        email: 'vikram@example.com',
        mobileNumber: '9765432109',
        dateOfBirth: '1995-12-25',
        gender: 'Male',
        sponsorId: 'SSE-10101988',
        pinCode: '600001',
        state: 'Tamil Nadu',
        city: 'Chennai',
        address: '789 Marina Beach Road, Chennai',
        status: 'Inactive',
        registeredAt: new Date('2025-12-20T14:00:00')
    }
];

async function dumpData() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected successfully!');

        // Define schema and model inline for the script
        const UserSchema = new mongoose.Schema({
            userId: String,
            applicantName: String,
            email: String,
            mobileNumber: String,
            dateOfBirth: String,
            gender: String,
            sponsorId: String,
            pinCode: String,
            state: String,
            city: String,
            address: String,
            status: String,
            registeredAt: Date,
            createdAt: { type: Date, default: Date.now }
        });

        const User = mongoose.models.User || mongoose.model('User', UserSchema);

        console.log('Cleaning existing data...');
        await User.deleteMany({});

        console.log('Inserting complete dummy data...');
        await User.insertMany(dummyUsers);

        console.log('Data dumped successfully!');
        console.log(`Inserted ${dummyUsers.length} users with full profiles.`);

        process.exit(0);
    } catch (error) {
        console.error('Error dumping data:', error);
        process.exit(1);
    }
}

dumpData();
