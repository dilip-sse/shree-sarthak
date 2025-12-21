import { NavItem } from '@/types';

export const SUCCESS_MESSAGE = 'You have been logged in successfully!';

export const WELCOME_PREFIX = 'Welcome';
export const WELCOME_QUOTE = '"Thank You for joining our Journey! Ton can create a better future, Explore, and be a part of something meaningful."';

export const SIDEBAR_NAV: NavItem[] = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'My Account', href: '/my-account' },
    { label: 'Joining & Upgrade', href: '#' },
    { label: 'My Network', href: '/dashboard/network' },
    { label: 'My Team Income', href: '#' },
    { label: 'Help & Support', href: '#' },
];

export const TOP_NAV: NavItem[] = [
    { label: 'Malaysia', href: '#malaysia' },
    { label: 'Singapore', href: '#singapore' },
    { label: 'Dubai', href: '#dubai' },
];

export const REWARD_RANK_LABEL = 'Reward Rank:';
export const NEW_MEMBER = 'New Member';
export const REWARD_SP_LABEL = 'Reward SP';
export const LEFT_SP_LABEL = 'Left SP';
export const RIGHT_SP_LABEL = 'Right SP';

export const ORG_LINK_PREFIX = 'http://www.myriyansh.com/r/g';
export const COPY_ORG1_BTN = 'Copy Org 1 Link';
export const COPY_ORG2_BTN = 'Copy Org 2 Link';

export const ACCOUNTING_STATUS_TITLE = 'Accounting Status';
export const ACCOUNTING_LABELS = {
    productFund: 'Product Fund Balance :',
    conOffer: 'Con. Offer Balance :',
    grossIncome: 'Gross Income',
};

export const SP_DETAILS_TITLE = 'SP Details L/R';
export const SP_LABELS = {
    fresh: 'Fresh :',
    cf: 'CF',
    directSP: 'Direct SP',
    selfSP: 'Self SP',
};

export const ID_STATUS_TITLE = "ID's Status";
export const ID_LABELS = {
    status: 'Active :',
    doi: 'DOI:',
    doa: 'DOA :',
    validityDate: 'Validity Date :',
};

export const DISTRIBUTOR_TITLE = 'Distributor Details';
export const DISTRIBUTOR_LABELS = {
    name: 'Distributor Name:',
    sponsor: 'Sponsor ID:',
};
