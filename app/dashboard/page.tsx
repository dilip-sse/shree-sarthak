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

export default function Dashboard() {
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
                        {dashboardData.user.name.split(' ').map(n => n[0]).join('')}
                    </div>

                    {/* User Info */}
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-amber-950 mb-2">
                            {dashboardData.user.name}
                        </h2>
                        <div className="space-y-1 text-amber-900">
                            <p className="flex items-center gap-2">
                                <span className="text-lg">📧</span>
                                <span>{dashboardData.user.email}</span>
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="text-lg">📱</span>
                                <span>{dashboardData.user.phone}</span>
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="text-lg">🆔</span>
                                <span className="font-semibold">Member ID: {dashboardData.user.userId}</span>
                            </p>
                        </div>
                    </div>

                    {/* Status Badge */}
                    <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                        {dashboardData.user.status}
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t-2 border-amber-100 my-8"></div>

                {/* Account Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {/* Membership Info */}
                    <div className="bg-amber-50 p-6 rounded-lg">
                        <h3 className="font-bold text-amber-950 mb-4 text-lg">Membership Information</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-amber-800">Reward Rank:</span>
                                <span className="font-semibold text-amber-950">{dashboardData.user.rewardRank}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-amber-800">Joined Date:</span>
                                <span className="font-semibold text-amber-950">{dashboardData.user.registeredAt}</span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="bg-amber-50 p-6 rounded-lg">
                        <h3 className="font-bold text-amber-950 mb-4 text-lg">Contact Information</h3>
                        <div className="space-y-3 text-sm">
                            <div>
                                <span className="text-amber-800 block">Address:</span>
                                <span className="font-semibold text-amber-950">{dashboardData.address}</span>
                            </div>
                            <div>
                                <span className="text-amber-800 block">City:</span>
                                <span className="font-semibold text-amber-950">{dashboardData.city}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Banner */}
            <div className="bg-orange-600 text-white text-center py-3 px-4">
                <p className="font-semibold">{SUCCESS_MESSAGE}</p>
            </div>

            {/* Top Header - Sticky */}
            <header className="sticky top-0 bg-amber-50 px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-amber-200 z-50">
                <div className="flex items-center gap-4">
                    <Image
                        src="/images/logo.png"
                        alt="Logo"
                        width={120}
                        height={120}
                        className="w-24 h-24 md:w-28 md:h-28"
                    />
                    <div className="text-sm">
                        <div className="font-bold text-amber-950">{COMPANY_NAME}</div>
                        <div className="text-xs text-amber-800">{TAGLINE}</div>
                    </div>
                </div>

                <nav className="flex items-center gap-6">
                    {TOP_NAV.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="text-amber-950 hover:text-orange-600 font-medium border-b-2 border-transparent hover:border-orange-600 pb-1 transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <button
                    onClick={() => {
                        logout();
                        router.push('/login');
                    }}
                    className="bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                >
                    Logout
                </button>
            </header>

            {/* Main Content - Full height with flex */}
            <div className="flex flex-col md:flex-row flex-1 min-h-0">
                <Sidebar />

                <main className="flex-1 p-6 md:p-10 overflow-y-auto">
                    {/* Welcome Section */}
                    <div className="mb-10">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl md:text-3xl font-bold text-amber-950">
                                {WELCOME_PREFIX} '{dashboardData.user.name}'
                            </h1>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="text-sm text-amber-900 mb-2">{REWARD_RANK_LABEL}</div>
                                <div className="font-semibold text-amber-950">
                                    {dashboardData.user.rewardRank}
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="text-sm text-amber-900 mb-2">{LEFT_SP_LABEL}</div>
                                <div className="font-semibold text-amber-950">
                                    {dashboardData.user.leftSP}
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="text-sm text-amber-900 mb-2">{RIGHT_SP_LABEL}</div>
                                <div className="font-semibold text-amber-950">
                                    {dashboardData.user.rightSP}
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-amber-900 to-amber-950 text-white p-8 rounded-lg mb-8">
                            <p className="italic text-lg">{WELCOME_QUOTE}</p>
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
                    </div>

                    {/* Dashboard Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                        <AccountingStatus data={dashboardData.accounting} />
                        <SPDetails data={dashboardData.spDetails} />
                        <IDStatus data={dashboardData.idStatus} />
                    </div>

                    {/* Distributor Details */}
                    <DistributorDetails data={dashboardData.distributor} />
                </main>
            </div>

            {/* Footer */}
            <footer className="bg-amber-900 text-white py-6 px-4 md:px-8 mt-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                    <div className="flex items-center gap-2">
                        <span className="text-xl">📞</span>
                        <span className="font-semibold">
                            {CONTACT_INFO.text} {CONTACT_INFO.year}
                        </span>
                    </div>

                    <div className="text-sm">
                        <p>{CONTACT_INFO.address}</p>
                        <p>{CONTACT_INFO.address2}</p>
                    </div>

                    <div className="flex gap-4">
                        <a href="#instagram" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                            <span className="text-amber-900">📷</span>
                        </a>
                        <a href="#next" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                            <span className="text-amber-900">▶️</span>
                        </a>
                    </div>

                    <div className="text-3xl">✨</div>
                </div>
            </footer>
        </div>
    );
}
