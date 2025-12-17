'use client';

import Image from 'next/image';
import Link from 'next/link';
import Sidebar from '@/components/dashboard/Sidebar';
import AccountingStatus from '@/components/dashboard/AccountingStatus';
import SPDetails from '@/components/dashboard/SPDetails';
import IDStatus from '@/components/dashboard/IDStatus';
import DistributorDetails from '@/components/dashboard/DistributorDetails';
import {
    SUCCESS_MESSAGE,
    WELCOME_PREFIX,
    WELCOME_QUOTE,
    TOP_NAV,
    REWARD_RANK_LABEL,
    NEW_MEMBER,
    REWARD_SP_LABEL,
    LEFT_SP_LABEL,
    RIGHT_SP_LABEL,
    ORG_LINK_PREFIX,
    COPY_ORG1_BTN,
    COPY_ORG2_BTN,
    COMPANY_NAME,
    LOGIN_BUTTON_TEXT,
    CONTACT_INFO,
} from '@/constants';
import { copyToClipboard } from '@/lib/utils';

// Mock data - in real app this would come from API
const mockDashboardData = {
    user: {
        name: 'Santosh Walanj',
        rewardRank: NEW_MEMBER,
        rewardSP: '0.00',
        leftSP: '0.00',
        rightSP: '0.00',
    },
    accounting: {
        productFundBalance: '0.00',
        conOfferBalance: '0.00',
        grossIncome: '0.00',
    },
    spDetails: {
        fresh: '0.00/0.0',
        cf: '25 /0',
        directSP: '15 /0',
        selfSP: '0.00',
    },
    idStatus: {
        status: 'Active' as const,
        doi: '12-07-2025 09:27:05 AM',
        doa: '',
        validityDate: '00-00-0000',
    },
    distributor: {
        name: 'Santosh Walanj',
        sponsorId: 'RM5064752',
    },
};

export default function Dashboard() {
    const handleCopyLink = (linkNumber: number) => {
        const link = `${ORG_LINK_PREFIX}${linkNumber === 1 ? 'r' : 'g'}`;
        copyToClipboard(link);
    };

    return (
        <div className="min-h-screen bg-amber-50 flex flex-col">
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
                        <div className="text-xs text-amber-800">TOUR AND TRAVELS</div>
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

                <Link
                    href="/"
                    className="bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                >
                    {LOGIN_BUTTON_TEXT}
                </Link>
            </header>

            {/* Main Content - Full height with flex */}
            <div className="flex flex-col md:flex-row flex-1 min-h-0">
                <Sidebar />

                <main className="flex-1 p-6 md:p-10 overflow-y-auto">
                    {/* Welcome Section */}
                    <div className="mb-10">
                        <h1 className="text-2xl md:text-3xl font-bold text-amber-950 mb-6">
                            {WELCOME_PREFIX} &apos;{mockDashboardData.user.name}
                        </h1>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <div className="text-sm text-amber-900">{REWARD_RANK_LABEL}</div>
                                <div className="font-semibold text-amber-950">
                                    {mockDashboardData.user.rewardRank}
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <div className="text-sm text-amber-900">{LEFT_SP_LABEL}</div>
                                <div className="font-semibold text-amber-950">
                                    {mockDashboardData.user.leftSP}
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <div className="text-sm text-amber-900">{RIGHT_SP_LABEL}</div>
                                <div className="font-semibold text-amber-950">
                                    {mockDashboardData.user.rightSP}
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-amber-900 to-amber-950 text-white p-8 rounded-lg mb-8">
                            <p className="italic text-lg">{WELCOME_QUOTE}</p>
                        </div>

                        {/* Organization Links */}
                        <div className="flex flex-col md:flex-row gap-6 mb-8">
                            <div className="flex-1 flex gap-2">
                                <input
                                    type="text"
                                    value={`${ORG_LINK_PREFIX}r`}
                                    readOnly
                                    className="flex-1 px-4 py-2 border-2 border-amber-900/20 rounded-lg bg-white text-amber-950"
                                />
                                <button
                                    onClick={() => handleCopyLink(1)}
                                    className="bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors whitespace-nowrap"
                                >
                                    {COPY_ORG1_BTN}
                                </button>
                            </div>
                            <div className="flex-1 flex gap-2">
                                <input
                                    type="text"
                                    value={`${ORG_LINK_PREFIX}g`}
                                    readOnly
                                    className="flex-1 px-4 py-2 border-2 border-amber-900/20 rounded-lg bg-white text-amber-950"
                                />
                                <button
                                    onClick={() => handleCopyLink(2)}
                                    className="bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors whitespace-nowrap"
                                >
                                    {COPY_ORG2_BTN}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Dashboard Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                        <AccountingStatus data={mockDashboardData.accounting} />
                        <SPDetails data={mockDashboardData.spDetails} />
                        <IDStatus data={mockDashboardData.idStatus} />
                    </div>

                    {/* Distributor Details */}
                    <DistributorDetails data={mockDashboardData.distributor} />
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
