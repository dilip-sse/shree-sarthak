// ID Generation Utility
export function generateUserId(dateOfBirth: string): string {
    // Expected format: YYYY-MM-DD or DD-MM-YYYY or DD/MM/YYYY
    // Convert to DDMMYYYY format

    let day = '';
    let month = '';
    let year = '';

    // Try to parse different date formats
    if (dateOfBirth.includes('-')) {
        const parts = dateOfBirth.split('-');
        if (parts[0].length === 4) {
            // YYYY-MM-DD format
            year = parts[0];
            month = parts[1];
            day = parts[2];
        } else {
            // DD-MM-YYYY format
            day = parts[0];
            month = parts[1];
            year = parts[2];
        }
    } else if (dateOfBirth.includes('/')) {
        const parts = dateOfBirth.split('/');
        day = parts[0];
        month = parts[1];
        year = parts[2];
    }

    // Format: SSE-DDMMYYYY
    const formattedDate = `${day.padStart(2, '0')}${month.padStart(2, '0')}${year}`;
    return `SSE-${formattedDate}`;
}

// LocalStorage utilities
const USERS_KEY = 'registered_users';

export function saveUserToLocalStorage(user: any): void {
    const users = getUsersFromLocalStorage();
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getUsersFromLocalStorage(): any[] {
    if (typeof window === 'undefined') return [];
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
}

export function getUserById(userId: string): any | null {
    const users = getUsersFromLocalStorage();
    return users.find((user: any) => user.userId === userId) || null;
}
