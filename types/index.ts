// Type definitions for the application

export interface NavItem {
    label: string;
    href: string;
}

export interface TourCategory {
    id: string;
    title: string;
    image: string;
    alt: string;
}

export interface SocialLink {
    platform: string;
    href: string;
    icon: string;
}

export interface UserData {
    name: string;
    rewardRank: string;
    rewardSP: string;
    leftSP: string;
    rightSP: string;
}

export interface AccountingStatus {
    productFundBalance: string;
    conOfferBalance: string;
    grossIncome: string;
}

export interface SPDetails {
    fresh: string;
    cf: string;
    directSP: string;
    selfSP: string;
}

export interface IDStatus {
    status: 'Active' | 'Inactive';
    doi: string;
    doa: string;
    validityDate: string;
}

export interface DistributorInfo {
    name: string;
    sponsorId: string;
}

export interface DashboardData {
    user: UserData;
    accounting: AccountingStatus;
    spDetails: SPDetails;
    idStatus: IDStatus;
    distributor: DistributorInfo;
}
