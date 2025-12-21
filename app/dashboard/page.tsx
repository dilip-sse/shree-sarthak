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
import HeroSection from '@/components/landing/HeroSection';
import TourCategories from '@/components/landing/TourCategories';
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
    const [showBanner, setShowBanner] = useState(true);

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

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowBanner(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

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
            name: 'N/A', // TODO: Fetch sponsor name
            sponsorId: userData.sponsorId || 'N/A'
        }
    };

    const registrationLink = typeof window !== 'undefined'
        ? `${window.location.origin}/registration/${userData.userId}`
        : `https://shree-sarthak.vercel.app/registration/${userData.userId}`;



    return (
        <div className="min-h-screen bg-amber-50 flex flex-col">
            {/* Success Banner */}
            {showBanner && (
                <div className="bg-orange-600 text-white text-center py-3 px-4 transition-all duration-500 ease-in-out">
                    <p className="font-semibold">{SUCCESS_MESSAGE}</p>
                </div>
            )}

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
                    className="bg-orange-600 text-white px-6 py-2  rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                >
                    Logout
                </button>
            </header>

            {/* Main Content - Full height with flex */}
            <div className="flex flex-col md:flex-row flex-1 min-h-0">
                <Sidebar />

                <main className="flex-1 p-8 md:p-12 overflow-y-auto bg-amber-50">
                    {/* Welcome Section */}
                    <div className="mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-amber-950">
                            {WELCOME_PREFIX} '{dashboardData.user.name}'
                        </h1>
                        <p className="text-amber-800 mt-2">Welcome back to your dashboard.</p>
                    </div>

                    {/* Reuse Landing Page Content */}
                    <div className="rounded-xl overflow-hidden shadow-sm mb-8">
                        <HeroSection compact={true} />
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-amber-950 mt-12 px-2">Our Tour Categories</h2>
                        <TourCategories compact={true} />
                    </div>
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
