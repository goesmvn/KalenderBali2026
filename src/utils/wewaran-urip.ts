// Urip values for Saptawara (7 days)
export const SAPTAWARA_URIP: Record<string, number> = {
    'Redite': 5,
    'Soma': 4,
    'Anggara': 3,
    'Buda': 7,
    'Wraspati': 8,
    'Sukra': 6,
    'Saniscara': 9,
};

// Urip values for Pancawara (5 days)
export const PANCAWARA_URIP: Record<string, number> = {
    'Umanis': 5,
    'Paing': 9,
    'Pon': 7,
    'Wage': 4,
    'Kliwon': 8,
};

// Helper function to calculate total Urip of a given day
export function calculatePadewasanUrip(saptawara: string, pancawara: string): number {
    const saptaUrip = SAPTAWARA_URIP[saptawara] || 0;
    const pancaUrip = PANCAWARA_URIP[pancawara] || 0;
    return saptaUrip + pancaUrip;
}
