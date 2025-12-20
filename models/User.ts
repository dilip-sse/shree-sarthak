import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    userId: {
        type: String,
        required: [true, 'Please provide a User ID'],
        unique: true,
    },
    applicantName: {
        type: String,
        required: [true, 'Please provide an applicant name'],
    },
    dateOfBirth: {
        type: String,
        required: [true, 'Please provide a date of birth'],
    },
    mobileNumber: {
        type: String,
        required: [true, 'Please provide a mobile number'],
    },
    pinCode: {
        type: String,
        required: [true, 'Please provide a PIN code'],
    },
    state: {
        type: String,
        required: [true, 'Please provide a state'],
    },
    sponsorId: {
        type: String,
        required: [true, 'Please provide a sponsor ID'],
    },
    enterpriseName: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
    },
    email: {
        type: String,
    },
    city: {
        type: String,
    },
    address: {
        type: String,
    },
    status: {
        type: String,
        default: 'Active',
    },
    registeredAt: {
        type: Date,
        default: Date.now,
    },
});

export default models.User || model('User', UserSchema);
