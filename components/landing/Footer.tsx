import { CONTACT_INFO, SOCIAL_LINKS } from '@/constants';

export default function Footer() {
    return (
        <footer className="bg-amber-900 text-white py-10 md:py-12 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                {/* Top Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
                    {/* Left: Copyright */}
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">📞</span>
                        <span className="font-semibold text-lg">
                            {CONTACT_INFO.text} {CONTACT_INFO.year}
                        </span>
                    </div>

                    {/* Right: Social Icons */}
                    <div className="flex items-center gap-4">
                        <a
                            href="#instagram"
                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                            aria-label="Instagram"
                        >
                            <span className="text-amber-900">📷</span>
                        </a>
                        <a
                            href="#next"
                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                            aria-label="Next"
                        >
                            <span className="text-amber-900">▶️</span>
                        </a>
                    </div>
                </div>

                {/* Bottom Section: Address */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-white/30">
                    <div className="text-center md:text-left">
                        <p className="text-sm md:text-base">{CONTACT_INFO.address}</p>
                        <p className="text-sm md:text-base">{CONTACT_INFO.address2}</p>
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex gap-4">
                        {SOCIAL_LINKS.map((social) => (
                            <a
                                key={social.platform}
                                href={social.href}
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                                aria-label={social.platform}
                            >
                                <span className="text-amber-900">
                                    {social.icon === 'twitter' && '🐦'}
                                    {social.icon === 'facebook' && '👤'}
                                    {social.icon === 'instagram' && '📸'}
                                </span>
                            </a>
                        ))}
                    </div>

                    {/* Decorative Star */}
                    <div className="text-4xl">✨</div>
                </div>
            </div>
        </footer>
    );
}
