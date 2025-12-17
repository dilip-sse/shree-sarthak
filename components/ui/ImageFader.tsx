'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ImageFaderProps {
    images: string[];
    interval?: number;
    className?: string;
    alt?: string;
}

export default function ImageFader({
    images,
    interval = 5000,
    className = '',
    alt = 'Slideshow image'
}: ImageFaderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        if (images.length <= 1) return;

        const timer = setInterval(() => {
            setIsTransitioning(true);

            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % images.length);
                setIsTransitioning(false);
            }, 1500); // Fade duration
        }, interval);

        return () => clearInterval(timer);
    }, [images.length, interval]);

    if (!images || images.length === 0) return null;

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-[1500ms] ${index === currentIndex && !isTransitioning
                            ? 'opacity-100'
                            : 'opacity-0'
                        }`}
                >
                    <Image
                        src={image}
                        alt={`${alt} ${index + 1}`}
                        fill
                        className="object-cover"
                        priority={index === 0}
                    />
                </div>
            ))}
        </div>
    );
}
