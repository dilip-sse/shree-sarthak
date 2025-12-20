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
    email: {
        type: String,
        required: false,
    },
    mobileNumber: {
        type: String,
        required: [true, 'Please provide a mobile number'],
    },
    status: {
        type: String,
        default: 'Active',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default models.User || model('User', UserSchema);
