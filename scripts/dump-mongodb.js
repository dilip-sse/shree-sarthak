const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://dilipsse_db_user:fGrZZTPqI3CwpaE1@cluster0.dxnpfxe.mongodb.net/';

const dummyUsers = [
    {
        userId: 'SSE-20121985',
        applicantName: 'Dilip Kumar',
        email: 'dilip@example.com',
        mobileNumber: '55',
        status: 'Active',
        createdAt: new Date()
    },
    {
        userId: 'SSE-15051990',
        applicantName: 'Sarthak Sharma',
        email: 'sarthak@example.com',
        mobileNumber: '9123456789',
        status: 'Active',
        createdAt: new Date()
    },
    {
        userId: 'SSE-01012000',
        applicantName: 'Rahul Verma',
        email: 'rahul@example.com',
        mobileNumber: '9988776655',
        status: 'Pending',
        createdAt: new Date()
    },
    {
        userId: 'SSE-10101988',
        applicantName: 'Anjali Gupta',
        email: 'anjali@example.com',
        mobileNumber: '9898989898',
        status: 'Active',
        createdAt: new Date()
    },
    {
        userId: 'SSE-25121995',
        applicantName: 'Vikram Singh',
        email: 'vikram@example.com',
        mobileNumber: '9765432109',
        status: 'Inactive',
        createdAt: new Date()
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
            status: String,
            createdAt: Date
        });

        const User = mongoose.models.User || mongoose.model('User', UserSchema);

        console.log('Cleaning existing data...');
        await User.deleteMany({});

        console.log('Inserting dummy data...');
        await User.insertMany(dummyUsers);

        console.log('Data dumped successfully!');
        console.log(`Inserted ${dummyUsers.length} users.`);

        process.exit(0);
    } catch (error) {
        console.error('Error dumping data:', error);
        process.exit(1);
    }
}

dumpData();
