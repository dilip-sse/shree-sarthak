'use client';

import Link from 'next/link';
import Image from 'next/image';
import { NAV_ITEMS, LOGIN_BUTTON_TEXT } from '@/constants';
import { useState, useEffect } from 'react';
import { isLoggedIn, logout } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsAuth(isLoggedIn());
    }, []);

    const handleLogout = () => {
        logout();
        setIsAuth(false);
        router.push('/');
    };

    return (
        <header className="sticky top-0 bg-amber-50 px-6 md:px-12 h-[120px] flex items-center justify-between shadow-md z-50">
            {/* Logo */}
            <div className="flex items-center gap-4 h-full">
                <Image
                    src="/images/logo.png"
                    alt="Shree Sarthak Enterprises Logo"
                    width={120}
                    height={120}
                    className="w-auto h-3/4 object-contain"
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

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
                {!isAuth ? (
                    <>
                        <Link
                            href="/login"
                            className="bg-amber-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
                        >
                            Login
                        </Link>
                        <Link
                            href="/registration/new"
                            className="bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-500 transition-colors"
                        >
                            Registration
                        </Link>
                    </>
                ) : (
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-500 transition-colors"
                    >
                        Logout
                    </button>
                )}
            </div>

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
                        {!isAuth ? (
                            <>
                                <Link
                                    href="/login"
                                    className="bg-amber-800 text-white px-6 py-3 rounded-lg font-semibold text-center mt-2"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/registration/new"
                                    className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold text-center mt-2"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Registration
                                </Link>
                            </>
                        ) : (
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsMenuOpen(false);
                                }}
                                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold text-center mt-2"
                            >
                                Logout
                            </button>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
}
