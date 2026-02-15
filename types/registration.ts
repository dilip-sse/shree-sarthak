// Registration form types
export interface RegistrationFormData {
    applicantName: string;
    dateOfBirth: string;
    mobileNumber: string;
    pinCode: string;
    state: string;
    sponsorId: string;
    enterpriseName?: string;
    gender?: 'Male' | 'Female';
    email?: string;
    city?: string;
    address: string;
    password?: string;
}

export interface RegisteredUser extends RegistrationFormData {
    userId: string;
    registeredAt: string;
}
