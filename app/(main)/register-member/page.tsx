'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { generateUserId } from '@/lib/registration';
import { getCurrentUser } from '@/lib/auth';
import type { RegistrationFormData } from '@/types/registration';
import { Loader2, CheckCircle2 } from 'lucide-react';

const INDIAN_STATES = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

export default function InternalRegistrationPage() {
    const router = useRouter();
    const currentUser = getCurrentUser();

    const [formData, setFormData] = useState<RegistrationFormData>({
        applicantName: '',
        dateOfBirth: '',
        mobileNumber: '',
        pinCode: '',
        state: '',
        sponsorId: currentUser?.userId || '',
        enterpriseName: '',
        gender: undefined,
        city: '',
        address: '',
    });

    const [submitted, setSubmitted] = useState(false);
    const [generatedUserId, setGeneratedUserId] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Ensure sponsor ID is set to current user if not manually changed
    useEffect(() => {
        if (currentUser?.userId && !formData.sponsorId) {
            setFormData(prev => ({ ...prev, sponsorId: currentUser.userId }));
        }
    }, [currentUser]);

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
        setIsLoading(true);

        const userId = generateUserId(formData.dateOfBirth);

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, userId }),
            });

            const result = await response.json();

            if (result.success) {
                setGeneratedUserId(userId);
                setSubmitted(true);
            } else {
                alert(result.error || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration failed:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="flex items-center justify-center p-6 h-full">
                <div className="bg-white rounded-3xl shadow-xl p-12 max-w-lg w-full text-center border border-amber-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-600 to-orange-700"></div>

                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce-slow">
                        <CheckCircle2 className="w-12 h-12 text-green-600" />
                    </div>

                    <h2 className="text-3xl font-bold text-amber-950 mb-2">New Member Added!</h2>
                    <p className="text-amber-800/70 mb-8">Registration completed successfully.</p>

                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
                        <p className="text-xs uppercase tracking-wider text-amber-700 font-semibold mb-2">New User ID</p>
                        <p className="text-3xl font-mono font-bold text-amber-900 tracking-wider select-all">
                            {generatedUserId}
                        </p>
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={() => {
                                setSubmitted(false);
                                setFormData(prev => ({ ...prev, applicantName: '', mobileNumber: '' })); // Reset key fields
                                setGeneratedUserId('');
                            }}
                            className="w-full bg-amber-900 text-white px-8 py-3 rounded-xl font-semibold hover:bg-amber-800 transition-all shadow-lg shadow-amber-200"
                        >
                            Register Another Member
                        </button>
                        <button
                            onClick={() => router.push('/dashboard')}
                            className="w-full bg-white text-amber-900 border border-amber-200 px-8 py-3 rounded-xl font-semibold hover:bg-amber-50 transition-all"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 lg:p-8 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-amber-950">Register New Member</h1>
                    <p className="text-sm text-amber-700/70">Add a new downline member to your network.</p>
                </div>
            </div>

            {/* Main Form Card */}
            <form onSubmit={handleSubmit} className="bg-[#FFFBF7] rounded-2xl shadow-[0_4px_20px_-4px_rgba(45,27,14,0.08)] overflow-hidden border border-[#E6DCCF]">
                <div className="p-6 md:p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-6">

                        {/* Left Column */}
                        <div className="space-y-5">
                            <h3 className="text-xs font-bold text-amber-900/50 uppercase tracking-widest border-b border-amber-100 pb-2 mb-4">
                                Personal Identity
                            </h3>

                            <InputField
                                label="Applicant's Name"
                                name="applicantName"
                                value={formData.applicantName}
                                onChange={handleInputChange}
                                required
                                placeholder="Full Name as per ID"
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <InputField
                                    label="Date of Birth"
                                    name="dateOfBirth"
                                    type="date"
                                    value={formData.dateOfBirth}
                                    onChange={handleInputChange}
                                    required
                                />
                                <div>
                                    <label className="block text-sm font-medium text-amber-900 mb-1.5">Gender <span className="text-red-500">*</span></label>
                                    <div className="flex bg-amber-50 p-1 rounded-lg border border-amber-200/50">
                                        {['Male', 'Female'].map((option) => (
                                            <button
                                                key={option}
                                                type="button"
                                                onClick={() => handleGenderChange(option as any)}
                                                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${formData.gender === option
                                                    ? 'bg-white text-amber-900 shadow-sm border border-amber-100'
                                                    : 'text-amber-700/60 hover:text-amber-800'
                                                    }`}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-xs font-bold text-amber-900/50 uppercase tracking-widest border-b border-amber-100 pb-2 mb-4 mt-8">
                                Contact Information
                            </h3>

                            <div className="w-full">
                                <InputField
                                    label="Mobile Number"
                                    name="mobileNumber"
                                    type="tel"
                                    value={formData.mobileNumber}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Mobile No."
                                />
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-5">
                            <h3 className="text-xs font-bold text-amber-900/50 uppercase tracking-widest border-b border-amber-100 pb-2 mb-4">
                                Address Details
                            </h3>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <div className="w-full">
                                        <label className="block text-sm font-medium text-amber-900 mb-1.5">
                                            Full Address <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            placeholder="House No, Street, Area..."
                                            rows={2}
                                            className="w-full px-3 py-2.5 bg-amber-50/50 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition-all text-amber-950 placeholder:text-amber-400/70 text-sm resize-none"
                                        />
                                    </div>
                                </div>
                                <InputField
                                    label="City"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    required
                                />
                                <InputField
                                    label="PIN Code"
                                    name="pinCode"
                                    value={formData.pinCode}
                                    onChange={handleInputChange}
                                    required
                                />
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-amber-900 mb-1.5">State <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <select
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full appearance-none px-3 py-2.5 bg-amber-50/50 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition-all text-amber-950 cursor-pointer text-sm"
                                        >
                                            <option value="">Select State</option>
                                            {INDIAN_STATES.map(state => (
                                                <option key={state} value={state}>{state}</option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-amber-600">
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-xs font-bold text-amber-900/50 uppercase tracking-widest border-b border-amber-100 pb-2 mb-4 mt-8">
                                Placement Info
                            </h3>

                            <div className="grid grid-cols-2 gap-4">
                                <InputField
                                    label="Sponsor ID"
                                    name="sponsorId"
                                    value={formData.sponsorId}
                                    onChange={handleInputChange}
                                    required
                                    readOnly // Sponsor is fixed (you are adding) or editable? Usually fixed if you add.
                                    helperText="Autofilled with your ID"
                                />
                                <InputField
                                    label="Enterprise Name"
                                    name="enterpriseName"
                                    value={formData.enterpriseName}
                                    onChange={handleInputChange}
                                    placeholder="Optional"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer / Submit */}
                <div className="bg-[#F9F3EA] px-6 py-5 md:px-8 border-t border-[#E6DCCF] flex items-center justify-end">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-orange-900/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 ${isLoading
                            ? 'bg-amber-400 cursor-not-allowed text-white'
                            : 'bg-gradient-to-r from-[#8B4513] to-[#2D1B0E] hover:from-[#A0522D] hover:to-[#1E1108] text-white ring-1 ring-white/20'
                            }`}
                    >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                        {isLoading ? 'Processing...' : 'Register Member'}
                    </button>
                </div>
            </form>
        </div>
    );
}

// Reusable Input Component
function InputField({ label, helperText, ...props }: any) {
    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-[#4A3728] mb-1.5">
                {label} {props.required && <span className="text-red-500">*</span>}
            </label>
            <input
                {...props}
                className="w-full px-4 py-2.5 bg-white border border-[#E6DCCF] rounded-lg focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all text-[#2D1B0E] placeholder:text-amber-900/30 text-sm read-only:bg-[#F2EBE3] read-only:text-amber-900/60 shadow-sm"
            />
            {helperText && <p className="text-[10px] text-amber-500/80 mt-1 font-medium">{helperText}</p>}
        </div>
    );
}
