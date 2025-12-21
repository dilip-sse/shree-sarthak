import ImageFader from '@/components/ui/ImageFader';
import { COMPANY_NAME, TAGLINE, HERO_IMAGES } from '@/constants';

export default function HeroSection({ compact = false }: { compact?: boolean }) {
    return (
        <section className={`relative ${compact ? 'mb-6' : 'mb-12'}`}>
            {/* Image Fader Background */}
            <ImageFader
                images={HERO_IMAGES}
                interval={5000}
                className={`w-full ${compact ? 'h-[200px] md:h-[300px]' : 'h-[400px] md:h-[600px]'}`}
                alt="Hero banner"
            />

            {/* Overlay with Company Info */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60 flex items-center justify-center">
                <div className="text-center text-white px-4">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2 drop-shadow-lg">
                        {COMPANY_NAME}
                    </h1>
                    <p className="text-xl md:text-3xl lg:text-4xl font-semibold drop-shadow-md">
                        {TAGLINE}
                    </p>
                </div>
            </div>
        </section>
    );
}
