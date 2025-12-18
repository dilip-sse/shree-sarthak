'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { SIDEBAR_NAV, COMPANY_NAME, TAGLINE } from '@/constants';
import { cn } from '@/lib/utils';

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-full md:w-64 bg-gradient-to-b from-amber-900 to-amber-950 text-white flex-shrink-0 md:min-h-screen md:sticky md:top-0 md:self-start overflow-y-auto">
            {/* Logo Section */}
            <div className="p-6 border-b border-white/20">
                {/* <div className="flex items-center gap-3">
                    <Image
                        src="/images/logo.png"
                        alt="Logo"
                        width={100}
                        height={100}
                        className="w-24 h-24"
                    />
                    <div className="text-sm leading-tight">
                        <div className="font-bold">{COMPANY_NAME}</div>
                        <div className="text-xs text-amber-200">{TAGLINE}</div>
                    </div>
                </div> */}
            </div>

            {/* Navigation */}
            <nav className="py-4">
                {SIDEBAR_NAV.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-3 px-6 py-3 transition-colors',
                                isActive
                                    ? 'bg-orange-600 text-white'
                                    : 'hover:bg-amber-800 text-amber-100'
                            )}
                        >
                            <span className="text-xl">
                                {item.label === 'My Account' && '👤'}
                                {item.label === 'Dashboard' && '📊'}
                                {item.label === 'Joining & Upgrade' && '👥'}
                                {item.label === 'My Network' && '🌐'}
                                {item.label === 'My Team Income' && '💰'}
                                {item.label === 'Help & Support' && '🎁'}
                            </span>
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
