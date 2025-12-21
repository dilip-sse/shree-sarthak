import Image from 'next/image';
import { TOUR_CATEGORIES } from '@/constants';

export default function TourCategories({ compact = false }: { compact?: boolean }) {
    return (
        <section className={`${compact ? 'py-4 px-0' : 'bg-amber-900 py-16 md:py-20 px-6 md:px-12'} mb-0`}>
            <div className={compact ? 'w-full' : 'max-w-7xl mx-auto'}>
                <div className={`grid ${compact ? 'grid-cols-2 md:grid-cols-3 gap-4' : 'grid-cols-1 md:grid-cols-3 gap-8 md:gap-10'}`}>
                    {TOUR_CATEGORIES.map((category) => (
                        <div
                            key={category.id}
                            className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
                        >
                            <div className={`relative ${compact ? 'h-32 md:h-36' : 'h-64 md:h-72'} overflow-hidden`}>
                                <Image
                                    src={category.image}
                                    alt={category.alt}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 p-2 rounded">
                                    <div className="w-8 h-8 flex items-center justify-center">
                                        <span className="text-2xl">🔒</span>
                                    </div>
                                </div>
                            </div>
                            <div className="py-4 px-6 bg-gradient-to-r from-amber-50 to-white">
                                <h3 className="text-center text-amber-950 font-bold text-lg md:text-xl">
                                    {category.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
