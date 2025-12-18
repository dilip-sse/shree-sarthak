// Authentication utilities for login system

const CURRENT_USER_KEY = 'current_user';
const USERS_KEY = 'registered_users';

export interface LoginCredentials {
    username: string; // UserID
    password: string; // Any password accepted for now
}

export interface CurrentUser {
    userId: string;
    applicantName: string;
    email?: string;
    mobileNumber: string;
    loginAt: string;
}

// Login with UserID validation
export function login(credentials: LoginCredentials): { success: boolean; user?: any; error?: string } {
    if (typeof window === 'undefined') {
        return { success: false, error: 'Not in browser environment' };
    }

    const { password } = credentials;
    const username = credentials.username.trim();

    // Validate username exists
    if (!username || !password) {
        return { success: false, error: 'Username and password are required' };
    }

    // Get all registered users
    const usersData = localStorage.getItem(USERS_KEY);
    if (!usersData) {
        return { success: false, error: 'No registered users found' };
    }

    const users = JSON.parse(usersData);

    // Find user by UserID (username)
    const user = users.find((u: any) => u.userId === username);

    if (!user) {
        return { success: false, error: 'Invalid username. User ID not found.' };
    }

    // Password validation (accept any password for now, just check it's not empty)
    if (!password) {
        return { success: false, error: 'Password is required' };
    }

    // Create current user session
    const currentUser: CurrentUser = {
        userId: user.userId,
        applicantName: user.applicantName,
        email: user.email,
        mobileNumber: user.mobileNumber,
        loginAt: new Date().toISOString(),
    };

    // Save to localStorage
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));

    return { success: true, user: currentUser };
}

// Get current logged-in user
export function getCurrentUser(): CurrentUser | null {
    if (typeof window === 'undefined') return null;

    const userData = localStorage.getItem(CURRENT_USER_KEY);
    return userData ? JSON.parse(userData) : null;
}

// Logout
export function logout(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(CURRENT_USER_KEY);
}

// Check if user is logged in
export function isLoggedIn(): boolean {
    return getCurrentUser() !== null;
}

// Get user full data from registered users
export function getUserData(userId: string): any | null {
    if (typeof window === 'undefined') return null;

    const usersData = localStorage.getItem(USERS_KEY);
    if (!usersData) return null;

    const users = JSON.parse(usersData);
    return users.find((u: any) => u.userId === userId) || null;
}
