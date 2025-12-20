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
        required: [true, 'Please select a gender'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email address'],
    },
    city: {
        type: String,
        required: [true, 'Please provide a city'],
    },
    address: {
        type: String,
        required: [true, 'Please provide an address'],
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
