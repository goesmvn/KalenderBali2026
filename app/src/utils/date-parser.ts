/**
 * Utility to parse "YYYY-MM-DD" securely across all browsers.
 * Native new Date("YYYY-MM-DD") in Safari parses to UTC midnight, 
 * causing date offset based on timezone. Instead, explicitly parse to local midnight.
 */
export function parseLocalDate(dateStr: string): Date {
    if (!dateStr) return new Date();

    // Format check YYYY-MM-DD or YYYY-MM-D or YYYY-M-D
    const match = dateStr.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (match) {
        const year = parseInt(match[1], 10);
        const month = parseInt(match[2], 10) - 1; // 0-indexed month
        const day = parseInt(match[3], 10);
        return new Date(year, month, day);
    }

    // Fallback for full strings (like ISO datetime or other formats)
    const fallback = new Date(dateStr);

    // If it's pure UTC "T00:00:00.000Z", Safari handles ISO ok but localizing it
    // safely if needed is complex. Better to just return fallback date
    return fallback;
}
