'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { generateUserId, saveUserToLocalStorage } from '@/lib/registration';
import type { RegistrationFormData, RegisteredUser } from '@/types/registration';

const INDIAN_STATES = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

export default function RegistrationPage() {
    const router = useRouter();
    const params = useParams();
    const sponsorId = (params?.id as string) || '';

    const [formData, setFormData] = useState<RegistrationFormData>({
        applicantName: '',
        dateOfBirth: '',
        mobileNumber: '',
        pinCode: '',
        state: '',
        sponsorId: '',
        enterpriseName: '',
        gender: undefined,
        email: '',
        city: '',
        address: '',
    });

    const [submitted, setSubmitted] = useState(false);
    const [generatedUserId, setGeneratedUserId] = useState('');

    // Set sponsor ID when component mounts or params change
    useEffect(() => {
        if (sponsorId) {
            setFormData(prev => ({ ...prev, sponsorId }));
        }
    }, [sponsorId]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleGenderChange = (gender: 'Male' | 'Female') => {
        setFormData(prev => ({ ...prev, gender }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Generate user ID from date of birth
        const userId = generateUserId(formData.dateOfBirth);

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    userId,
                }),
            });

            const result = await response.json();

            if (result.success) {
                // Show success
                setGeneratedUserId(userId);
                setSubmitted(true);
            } else {
                alert(result.error || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration failed:', error);
            alert('An error occurred during registration. Please try again.');
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-6">
                <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-5xl">✓</span>
                    </div>
                    <h2 className="text-3xl font-bold text-green-700 mb-4">Registration Successful!</h2>
                    <p className="text-amber-900 mb-3">Your User ID:</p>
                    <p className="text-2xl font-bold text-amber-950 bg-amber-50 py-4 px-6 rounded-lg mb-6">
                        {generatedUserId}
                    </p>
                    <p className="text-sm text-amber-800 mb-8">Please save this ID for future reference</p>
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="bg-amber-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-800 transition-colors w-full"
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10 relative">
                    <button
                        onClick={() => router.push('/')}
                        className="absolute left-0 top-0 text-amber-900 font-semibold hover:text-amber-700 transition-colors flex items-center gap-2"
                    >
                        <span>←</span> Back
                    </button>
                    <h1 className="text-4xl font-bold text-amber-950 mb-3">Registration Form</h1>
                    <p className="text-amber-800">Sponsor ID: <span className="font-semibold">{sponsorId || 'Loading...'}</span></p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div className="space-y-6">
                            {/* Applicant's Name */}
                            <div>
                                <label className="block text-amber-950 font-semibold mb-2">
                                    Applicant's Name<span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="applicantName"
                                    value={formData.applicantName}
                                    onChange={handleInputChange}
                                    placeholder="Enter Applicant's Name"
                                    required
                                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                                />
                            </div>

                            {/* Date of Birth */}
                            <div>
                                <label className="block text-amber-950 font-semibold mb-2">
                                    Date of Birth<span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                                />
                            </div>

                            {/* Mobile Number */}
                            <div>
                                <label className="block text-amber-950 font-semibold mb-2">
                                    Mobile Number<span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="mobileNumber"
                                    value={formData.mobileNumber}
                                    onChange={handleInputChange}
                                    placeholder="Enter Mobile Number"
                                    required
                                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                                />
                            </div>

                            {/* PIN Code */}
                            <div>
                                <label className="block text-amber-950 font-semibold mb-2">
                                    PIN Code<span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="pinCode"
                                    value={formData.pinCode}
                                    onChange={handleInputChange}
                                    placeholder="Enter PIN Code"
                                    required
                                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                                />
                            </div>

                            {/* State */}
                            <div>
                                <label className="block text-amber-950 font-semibold mb-2">
                                    State<span className="text-red-600">*</span>
                                </label>
                                <select
                                    name="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors bg-white"
                                >
                                    <option value="">Select State</option>
                                    {INDIAN_STATES.map(state => (
                                        <option key={state} value={state}>{state}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Sponsor ID */}
                            <div>
                                <label className="block text-amber-950 font-semibold mb-2">
                                    Sponsor ID<span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="sponsorId"
                                    value={formData.sponsorId}
                                    onChange={handleInputChange}
                                    placeholder="Enter Sponsor's ID"
                                    required
                                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg bg-amber-50 focus:border-amber-500 focus:outline-none transition-colors"
                                    readOnly
                                />
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* Enterprise Name */}
                            <div>
                                <label className="block text-amber-950 font-semibold mb-2">
                                    Enterprise Name
                                </label>
                                <input
                                    type="text"
                                    name="enterpriseName"
                                    value={formData.enterpriseName}
                                    onChange={handleInputChange}
                                    placeholder="Enter Enterprise Name"
                                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                                />
                            </div>

                            {/* Gender */}
                            <div>
                                <label className="block text-amber-950 font-semibold mb-3">
                                    Gender
                                </label>
                                <div className="flex gap-8">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="gender"
                                            checked={formData.gender === 'Male'}
                                            onChange={() => handleGenderChange('Male')}
                                            className="w-5 h-5 text-amber-600 focus:ring-amber-500"
                                        />
                                        <span className="text-amber-950">Male</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="gender"
                                            required
                                            checked={formData.gender === 'Female'}
                                            onChange={() => handleGenderChange('Female')}
                                            className="w-5 h-5 text-amber-600 focus:ring-amber-500"
                                        />
                                        <span className="text-amber-950">Female</span>
                                    </label>
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-amber-950 font-semibold mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter Email"
                                    required
                                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                                />
                            </div>

                            {/* City */}
                            <div>
                                <label className="block text-amber-950 font-semibold mb-2">
                                    City
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    placeholder="Enter City"
                                    required
                                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                                />
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-amber-950 font-semibold mb-2">
                                    Address<span className="text-red-600">*</span>
                                </label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder="Enter Address"
                                    rows={4}
                                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-10">
                        <button
                            type="submit"
                            className="w-full bg-amber-900 text-white py-4 rounded-lg font-bold text-lg hover:bg-amber-800 transition-colors shadow-lg hover:shadow-xl"
                        >
                            Register Now
                        </button>
                    </div>

                    {/* Required Fields Note */}
                    <p className="text-center text-sm text-amber-600 mt-6">
                        <span className="text-red-600">*</span> indicates required fields
                    </p>
                </form>
            </div>
        </div>
    );
}
