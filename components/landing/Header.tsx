'use client';

import Link from 'next/link';
import Image from 'next/image';
import { NAV_ITEMS, LOGIN_BUTTON_TEXT } from '@/constants';
import { useState } from 'react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 bg-amber-50 px-6 md:px-12 py-6 flex items-center justify-between shadow-md z-50">
            {/* Logo */}
            <div className="flex items-center gap-4">
                <Image
                    src="/images/logo.png"
                    alt="Shree Sarthak Enterprises Logo"
                    width={160}
                    height={160}
                    className="w-32 h-32 md:w-40 md:h-40"
                />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
                {NAV_ITEMS.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className="text-amber-950 hover:text-amber-700 font-medium text-lg transition-colors"
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>

            {/* Login Button */}
            <Link
                href="/dashboard"
                className="hidden md:block bg-slate-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors"
            >
                {LOGIN_BUTTON_TEXT}
            </Link>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden flex flex-col gap-1.5 p-2"
                aria-label="Toggle menu"
            >
                <span className="w-6 h-0.5 bg-amber-950 block"></span>
                <span className="w-6 h-0.5 bg-amber-950 block"></span>
                <span className="w-6 h-0.5 bg-amber-950 block"></span>
            </button>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-amber-50 shadow-lg md:hidden">
                    <nav className="flex flex-col p-4 gap-4">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="text-amber-950 hover:text-amber-700 font-medium text-lg py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link
                            href="/dashboard"
                            className="bg-slate-800 text-white px-6 py-3 rounded-lg font-semibold text-center mt-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {LOGIN_BUTTON_TEXT}
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
