// Utility functions

export function cn(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ');
}

export function copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text);
}
