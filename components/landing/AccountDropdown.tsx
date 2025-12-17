'use client';

import { useState } from 'react';
import Link from 'next/link';

interface AccountMenuItem {
    label: string;
    href: string;
    icon?: string;
}

const ACCOUNT_MENU_ITEMS: AccountMenuItem[] = [
    { label: 'Dashboard', href: '/dashboard', icon: '📊' },
    { label: 'My Network', href: '/dashboard/netorik', icon: '🌐' },
    { label: 'My Team Income', href: '/dashboard/income', icon: '💰' },
    { label: 'Profile Settings', href: '/dashboard/profile', icon: '⚙️' },
    { label: 'Help & Support', href: '/dashboard/support', icon: '🎁' },
];

const DUMMY_USER_INFO = {
    name: 'Santosh Walanj',
    email: 'santosh.walanj@example.com',
    memberId: 'RM5064752',
    memberSince: 'Dec 2025',
};

export default function AccountDropdown() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-amber-950 hover:text-amber-700 font-medium text-lg transition-colors flex items-center gap-2"
            >
                My Account
                <span className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                    ▼
                </span>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <>
                    {/* Backdrop to close on click outside */}
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown Content */}
                    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-2xl border-2 border-amber-200 z-20 overflow-hidden">
                        {/* User Info Header */}
                        <div className="bg-gradient-to-r from-amber-900 to-amber-950 text-white p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-2xl">
                                    👤
                                </div>
                                <div>
                                    <div className="font-bold text-lg">{DUMMY_USER_INFO.name}</div>
                                    <div className="text-xs text-amber-200">{DUMMY_USER_INFO.email}</div>
                                </div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-white/20 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-amber-200">Member ID:</span>
                                    <span className="font-semibold">{DUMMY_USER_INFO.memberId}</span>
                                </div>
                                <div className="flex justify-between mt-1">
                                    <span className="text-amber-200">Member Since:</span>
                                    <span className="font-semibold">{DUMMY_USER_INFO.memberSince}</span>
                                </div>
                            </div>
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                            {ACCOUNT_MENU_ITEMS.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="flex items-center gap-3 px-4 py-3 hover:bg-amber-50 transition-colors text-amber-950"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <span className="text-xl">{item.icon}</span>
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            ))}
                        </div>

                        {/* Footer Actions */}
                        <div className="border-t border-amber-200 p-3 bg-amber-50">
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    // Add logout logic here
                                }}
                                className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                            >
                                <span>🚪</span>
                                Logout
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
