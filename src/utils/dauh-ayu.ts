export interface DauhAyuTime {
    period: 'Siang' | 'Malam';
    ranges: string[];
}

export interface DauhAyuResult {
    saptawara: string;
    siang: string[];
    malam: string[];
}

// Data Dauh Ayu berdasarkan Saptawara (kalenderbali.org / saringan asta & panca dawuh)
// Format jam menggunakan waktu setempat pembagian Dauh.
const dauhData: Record<string, { siang: string[], malam: string[] }> = {
    'Redite': {
        siang: ['07.00 - 07.54', '10.18 - 12.42'],
        malam: ['22.18 - 24.42', '03.06 - 04.00']
    },
    'Soma': {
        siang: ['07.54 - 10.18'],
        malam: ['24.42 - 03.06']
    },
    'Anggara': {
        siang: ['10.00 - 11.30', '13.00 - 15.06'],
        malam: ['19.54 - 22.00', '23.30 - 01.00']
    },
    'Buda': {
        siang: ['07.54 - 08.30', '11.30 - 12.42'],
        malam: ['22.18 - 23.30', '02.30 - 03.06']
    },
    'Wraspati': {
        siang: ['05.30 - 07.54', '12.42 - 14.30'],
        malam: ['20.30 - 22.18', '03.06 - 05.30']
    },
    'Sukra': {
        siang: ['08.30 - 10.18', '16.00 - 17.30'],
        malam: ['17.30 - 19.00', '24.42 - 02.30']
    },
    'Saniscara': {
        siang: ['11.30 - 12.42'],
        malam: ['22.18 - 23.30']
    }
};

/**
 * Mendapatkan Jam Baik (Dauh Ayu) berdasarkan nama Saptawara
 */
export function calculateDauhAyu(saptawaraName: string): DauhAyuResult | null {
    // saptawara name pattern typically "Soma (Indu)", so extract the first word.
    const name = saptawaraName.split(' ')[0];

    if (dauhData[name]) {
        return {
            saptawara: name,
            ...dauhData[name]
        };
    }

    return null;
}
