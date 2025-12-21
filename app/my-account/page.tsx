'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/landing/Header';
import AccountingStatus from '@/components/dashboard/AccountingStatus';
import SPDetails from '@/components/dashboard/SPDetails';
import IDStatus from '@/components/dashboard/IDStatus';
import DistributorDetails from '@/components/dashboard/DistributorDetails';
import {
    COMPANY_NAME,
    TAGLINE,
    LOGIN_BUTTON_TEXT,
    CONTACT_INFO,
} from '@/constants';
import {
    SUCCESS_MESSAGE,
    WELCOME_PREFIX,
    WELCOME_QUOTE,
    ORG_LINK_PREFIX,
    COPY_ORG1_BTN,
    COPY_ORG2_BTN,
    REWARD_RANK_LABEL,
    LEFT_SP_LABEL,
    RIGHT_SP_LABEL,
    TOP_NAV,
} from '@/constants/dashboard';
import { getCurrentUser, getUserData, isLoggedIn, logout } from '@/lib/auth';
import { copyToClipboard } from '@/lib/utils';

export default function MyAccount() {
    const router = useRouter();
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [copiedLink, setCopiedLink] = useState<number | null>(null);

    useEffect(() => {
        const initializeDashboard = async () => {
            // Check if user is logged in
            if (!isLoggedIn()) {
                router.push('/login');
                return;
            }

            // Get current user session
            const currentUser = getCurrentUser();
            if (currentUser) {
                try {
                    // Fetch full user data from MongoDB
                    const response = await fetch(`/api/users/${currentUser.userId}`);
                    const data = await response.json();

                    if (data.success) {
                        setUserData(data.user);
                    } else {
                        console.error('User data not found in MongoDB');
                    }
                } catch (error) {
                    console.error('Failed to fetch dashboard user data:', error);
                }
            }
            setLoading(false);
        };

        initializeDashboard();
    }, [router]);

    const handleCopyLink = (linkNumber: number) => {
        const link = typeof window !== 'undefined'
            ? `${window.location.origin}/registration/${userData?.userId}`
            : `https://shree-sarthak.vercel.app/registration/${userData?.userId}`;

        copyToClipboard(link);
        setCopiedLink(linkNumber);
        setTimeout(() => setCopiedLink(null), 2000);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-amber-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-4xl mb-4 text-amber-900">⏳</div>
                    <p className="text-amber-900 font-semibold">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="min-h-screen bg-amber-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-amber-900">User data not found. Please log in again.</p>
                    <Link href="/login" className="text-orange-600 underline mt-4 inline-block">Go to Login</Link>
                </div>
            </div>
        );
    }

    // Create dashboard data from user data
    const dashboardData = {
        user: {
            name: userData.applicantName || 'User',
            rewardRank: 'New Member',
            userId: userData.userId || 'User',
            email: userData.email || 'User',
            phone: userData.phone || 'User',
            status: userData.status || 'User',
            registeredAt: userData.registeredAt || 'User',
            address: userData.address || 'N/A',
            city: userData.city || 'N/A',
            leftSP: '0.0',
            rightSP: '0.0'
        },
        accounting: {
            productFundBalance: '0.00',
            conOfferBalance: '0.00',
            grossIncome: '0.00'
        },
        spDetails: {
            fresh: '0.00 / 0.0',
            cf: '0 / 0',
            directSP: '0 / 0',
            selfSP: '0.00'
        },
        idStatus: {
            status: 'Active' as const,
            doi: userData.registeredAt ? (
                new Date(userData.registeredAt).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                }) + ' ' + new Date(userData.registeredAt).toLocaleTimeString('en-IN')
            ) : 'N/A',
            doa: '',
            validityDate: '00-00-0000'
        },
        distributor: {
            // name: userData.applicantName || 'User',
            sponsorId: userData.sponsorId || 'N/A'
        }
    };

    const registrationLink = typeof window !== 'undefined'
        ? `${window.location.origin}/registration/${userData.userId}`
        : `https://shree-sarthak.vercel.app/registration/${userData.userId}`;

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
                    {/* User Profile Card */}
                    <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Column 1: Profile & Basic Info */}
                            <div className="flex flex-col items-start gap-4">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="w-20 h-20 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg flex-shrink-0">
                                        {dashboardData.user.name.split(' ').map((n: string) => n[0]).join('')}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-amber-950 leading-tight">
                                            {dashboardData.user.name}
                                        </h2>
                                        <div className="mt-1">
                                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold flex items-center gap-1 w-fit">
                                                <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse"></span>
                                                {dashboardData.user.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2 text-amber-900 text-sm w-full">
                                    <p className="flex items-center gap-2">
                                        <span className="text-lg w-6">�</span>
                                        <span className="truncate" title={dashboardData.user.email}>{dashboardData.user.email}</span>
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="text-lg w-6">📱</span>
                                        <span>{dashboardData.user.phone}</span>
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="text-lg w-6">🆔</span>
                                        <span className="font-semibold">ID: {dashboardData.user.userId}</span>
                                    </p>
                                </div>
                            </div>

                            {/* Column 2: Membership Info */}
                            <div className="bg-amber-50 p-5 rounded-lg h-full">
                                <h3 className="font-bold text-amber-950 mb-3 text-base border-b border-amber-200 pb-2">Membership Information</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between items-center">
                                        <span className="text-amber-800">Reward Rank:</span>
                                        <span className="font-semibold text-amber-950">{dashboardData.user.rewardRank}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-amber-800">Joined Date:</span>
                                        <span className="font-semibold text-amber-950 text-right">{dashboardData.idStatus.doi}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-amber-800">Member Since:</span>
                                        <span className="font-semibold text-amber-950 text-right">{dashboardData.idStatus.doi}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Column 3: Contact Info */}
                            <div className="bg-amber-50 p-5 rounded-lg h-full">
                                <h3 className="font-bold text-amber-950 mb-3 text-base border-b border-amber-200 pb-2">Contact Information</h3>
                                <div className="space-y-2 text-sm">
                                    <div>
                                        <span className="text-amber-800 block mb-1">Address:</span>
                                        <span className="font-semibold text-amber-950 block leading-snug">{dashboardData.user.address}</span>
                                    </div>
                                    <div className="mt-3">
                                        <span className="text-amber-800 block mb-1">City:</span>
                                        <span className="font-semibold text-amber-950 block">{dashboardData.user.city}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Organization Links */}
                    <div className="flex flex-col md:flex-row gap-6 mb-8">
                        <div className="flex-1 flex gap-4">
                            <input
                                type="text"
                                value={registrationLink}
                                readOnly
                                className="flex-1 px-4 py-3 border-2 border-amber-900/20 rounded-lg bg-white text-amber-950"
                            />
                            <button
                                onClick={() => handleCopyLink(1)}
                                className={`${copiedLink === 1 ? 'bg-green-600' : 'bg-orange-600'} text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-colors whitespace-nowrap`}
                            >
                                {copiedLink === 1 ? 'Copied!' : COPY_ORG1_BTN}
                            </button>
                        </div>
                        <div className="flex-1 flex gap-4">
                            <input
                                type="text"
                                value={registrationLink}
                                readOnly
                                className="flex-1 px-4 py-3 border-2 border-amber-900/20 rounded-lg bg-white text-amber-950"
                            />
                            <button
                                onClick={() => handleCopyLink(2)}
                                className={`${copiedLink === 2 ? 'bg-green-600' : 'bg-orange-600'} text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-colors whitespace-nowrap`}
                            >
                                {copiedLink === 2 ? 'Copied!' : COPY_ORG2_BTN}
                            </button>
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

                    {/* Distributor Details */}
                    <DistributorDetails data={dashboardData.distributor} />


                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

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
