/**
 * Utility function to conditionally join class names
 * @param classes - Array of class names (string or falsy values)
 * @returns A single class string with valid class names
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
    return classes.filter(Boolean).join(" ");
}
