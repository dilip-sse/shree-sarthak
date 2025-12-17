import { NavItem, TourCategory, SocialLink } from '@/types';

export const COMPANY_NAME = 'SHREE SARTHAK ENTERPRISES';
export const TAGLINE = 'TOUR AND TRAVELS';

export const NAV_ITEMS: NavItem[] = [
    { label: 'My Account', href: '/my-account' },
    { label: 'Dands', href: '#dands' },
    { label: 'Dongi', href: '#dongi' },
];

export const TOUR_CATEGORIES: TourCategory[] = [
    {
        id: 'adventure',
        title: 'ADVENTURE TOURS',
        image: '/images/adventure.jpg',
        alt: 'Adventure Tours',
    },
    {
        id: 'beach',
        title: 'BEACH GETAWAYS',
        image: '/images/beach.jpg',
        alt: 'Beach Getaways',
    },
    {
        id: 'cultural',
        title: 'CULTURAL JOURNES',
        image: '/images/cultural.jpg',
        alt: 'Cultural Journes',
    },
];

export const HERO_IMAGES = [
    '/images/hero1.jpg',
    '/images/hero2.jpg',
];

export const CONTACT_INFO = {
    year: '2023',
    text: 'LOOG ADE',
    address: 'Room No: 1085,953 Shree Ganesh Nagar Goan,',
    address2: 'Dive Mandi Road,Mona Print, At Mirahrhra 421301',
};

export const SOCIAL_LINKS: SocialLink[] = [
    { platform: 'Twitter', href: '#', icon: 'twitter' },
    { platform: 'Facebook', href: '#', icon: 'facebook' },
    { platform: 'Instagram', href: '#', icon: 'instagram' },
];

export const LOGIN_BUTTON_TEXT = 'LOGIN / SIGNUP';
