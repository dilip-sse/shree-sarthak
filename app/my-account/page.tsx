'use client';

import Header from '@/components/landing/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import { COMPANY_NAME, CONTACT_INFO } from '@/constants';

// Mock user data
const USER_DATA = {
    name: 'Santosh Walanj',
    email: 'santosh.walanj@example.com',
    memberId: 'RM5064752',
    memberSince: 'December 2025',
    phone: '+91 98765 43210',
    address: 'Room No: 1085,953 Shree Ganesh Nagar Goan, Dive Mandi Road',
    city: 'Mirahrhra 421301',
    status: 'Active',
    rewardRank: 'New Member',
    joinedDate: '12-07-2025',
};

export default function MyAccount() {
    return (
        <div className="min-h-screen bg-amber-50 flex flex-col">
            {/* Fixed Header */}
            <Header />

            {/* Main Content - Full height with flex */}
            <div className="flex flex-col md:flex-row flex-1 min-h-0">
                <Sidebar />

                <main className="flex-1 p-6 md:p-10 overflow-y-auto">
                    {/* Page Header */}
                    <div className="mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-amber-950 mb-4">
                            My Account
                        </h1>
                        <p className="text-amber-800 text-base md:text-lg">View and manage your account information</p>
                    </div>

                    {/* User Profile Card */}
                    <div className="bg-white rounded-lg shadow-md p-6 md:p-10 mb-8">
                        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8 mb-8">
                            {/* Profile Avatar */}
                            <div className="w-24 h-24 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                                {USER_DATA.name.split(' ').map(n => n[0]).join('')}
                            </div>

                            {/* User Info */}
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-amber-950 mb-2">
                                    {USER_DATA.name}
                                </h2>
                                <div className="space-y-1 text-amber-900">
                                    <p className="flex items-center gap-2">
                                        <span className="text-lg">📧</span>
                                        <span>{USER_DATA.email}</span>
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="text-lg">📱</span>
                                        <span>{USER_DATA.phone}</span>
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="text-lg">🆔</span>
                                        <span className="font-semibold">Member ID: {USER_DATA.memberId}</span>
                                    </p>
                                </div>
                            </div>

                            {/* Status Badge */}
                            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                                {USER_DATA.status}
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t-2 border-amber-100 my-8"></div>

                        {/* Account Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            {/* Membership Info */}
                            <div className="bg-amber-50 p-4 rounded-lg">
                                <h3 className="font-bold text-amber-950 mb-3 text-lg">Membership Information</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-amber-800">Reward Rank:</span>
                                        <span className="font-semibold text-amber-950">{USER_DATA.rewardRank}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-amber-800">Joined Date:</span>
                                        <span className="font-semibold text-amber-950">{USER_DATA.joinedDate}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-amber-800">Member Since:</span>
                                        <span className="font-semibold text-amber-950">{USER_DATA.memberSince}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="bg-amber-50 p-4 rounded-lg">
                                <h3 className="font-bold text-amber-950 mb-3 text-lg">Contact Information</h3>
                                <div className="space-y-2 text-sm">
                                    <div>
                                        <span className="text-amber-800 block">Address:</span>
                                        <span className="font-semibold text-amber-950">{USER_DATA.address}</span>
                                    </div>
                                    <div>
                                        <span className="text-amber-800 block">City:</span>
                                        <span className="font-semibold text-amber-950">{USER_DATA.city}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Organization Links */}
                    <div className="mb-8">
                        <h3 className="text-xl md:text-2xl font-bold text-amber-950 mb-6">Organization Links</h3>
                        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                            <div className="flex-1 flex gap-2">
                                <input
                                    type="text"
                                    value="http://www.myriyansh.com/r/gr"
                                    readOnly
                                    className="flex-1 px-4 py-2 border-2 border-amber-900/20 rounded-lg bg-white text-amber-950"
                                />
                                <button className="bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors whitespace-nowrap">
                                    Copy Org 1 Link
                                </button>
                            </div>
                            <div className="flex-1 flex gap-2">
                                <input
                                    type="text"
                                    value="http://www.myriyansh.com/r/gg"
                                    readOnly
                                    className="flex-1 px-4 py-2 border-2 border-amber-900/20 rounded-lg bg-white text-amber-950"
                                />
                                <button className="bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors whitespace-nowrap">
                                    Copy Org 2 Link
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Status Cards Grid */}
                    <div className="mb-10">
                        <h3 className="text-xl md:text-2xl font-bold text-amber-950 mb-6">Account Status</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            {/* Accounting Status */}
                            <div className="bg-amber-50 rounded-lg p-6 md:p-8 shadow-sm border-2 border-amber-900/20">
                                <h4 className="text-lg font-bold text-amber-950 mb-4 pb-2 border-b-2 border-amber-900/30">
                                    Accounting Status
                                </h4>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-amber-900">Product Fund Balance :</span>
                                        <span className="font-semibold text-amber-950">0.00</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="text-amber-900">Con. Offer Balance :</div>
                                            <div className="text-amber-900">Gross Income</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-semibold text-amber-950">0.00</div>
                                            <div className="font-semibold text-amber-950">0.00</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* SP Details */}
                            <div className="bg-amber-50 rounded-lg p-6 md:p-8 shadow-sm border-2 border-amber-900/20">
                                <h4 className="text-lg font-bold text-amber-950 mb-4 pb-2 border-b-2 border-amber-900/30">
                                    SP Details L/R
                                </h4>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-amber-900">Fresh :</span>
                                        <div className="flex gap-4">
                                            <span className="font-semibold text-amber-950">0.00/0.0</span>
                                            <span className="font-semibold text-amber-950">0.00</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-amber-900">CF</span>
                                        <span className="font-semibold text-amber-950">25 /0</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-amber-900">Direct SP</span>
                                        <span className="font-semibold text-amber-950">15 /0</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-amber-900">Self SP</span>
                                        <span className="font-semibold text-amber-950">0.00</span>
                                    </div>
                                </div>
                            </div>

                            {/* ID Status */}
                            <div className="bg-amber-50 rounded-lg p-6 md:p-8 shadow-sm border-2 border-amber-900/20">
                                <h4 className="text-lg font-bold text-amber-950 mb-4 pb-2 border-b-2 border-amber-900/30">
                                    ID&apos;s Status
                                </h4>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between items-center">
                                        <span className="text-amber-900">Active :</span>
                                        <span className="font-semibold">
                                            <span className="text-green-700">Active</span> <span className="text-red-600">Inactive</span>
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-amber-900">DOI:</span>
                                        <span className="font-semibold text-amber-950">12-07-2025 09:27:05 AM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-amber-900">DOA :</span>
                                        <span className="font-semibold text-amber-950"></span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-amber-900">Validity Date :</span>
                                        <span className="font-semibold text-red-600">00-00-0000</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        <button className="bg-amber-900 text-white p-4 rounded-lg font-semibold hover:bg-amber-800 transition-colors flex items-center justify-center gap-2">
                            <span className="text-xl">✏️</span>
                            Edit Profile
                        </button>
                        <button className="bg-amber-900 text-white p-4 rounded-lg font-semibold hover:bg-amber-800 transition-colors flex items-center justify-center gap-2">
                            <span className="text-xl">🔒</span>
                            Change Password
                        </button>
                        <button className="bg-red-600 text-white p-4 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                            <span className="text-xl">🚪</span>
                            Logout
                        </button>
                    </div>
                </main>
            </div>

            {/* Footer */}
            <footer className="bg-amber-900 text-white py-6 px-4 md:px-8 mt-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-xl">📞</span>
                        <span className="font-semibold">
                            {CONTACT_INFO.text} {CONTACT_INFO.year}
                        </span>
                    </div>

                    <div className="text-center md:text-left text-sm">
                        <p>{CONTACT_INFO.address}</p>
                        <p>{CONTACT_INFO.address2}</p>
                    </div>

                    <div className="text-3xl">✨</div>
                </div>
            </footer>
        </div>
    );
}
