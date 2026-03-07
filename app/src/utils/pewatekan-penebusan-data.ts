export interface WatakEntry {
    wewaranName: string; // e.g. "Ekawara", "Dwiwara"
    category: string; // e.g. "Luang", "Menga"
    watak: string; // The character description
}

export interface Pewatekan {
    ekawara?: WatakEntry;
    dwiwara?: WatakEntry;
    triwara?: WatakEntry;
    caturwara?: WatakEntry;
    pancawara?: WatakEntry;
    sadwara?: WatakEntry;
    saptawara?: WatakEntry;
    astawara?: WatakEntry;
    sangawara?: WatakEntry;
    dasawara?: WatakEntry;
}

export interface BantenPenebusan {
    title: string;
    description: string;
    bantenList: string[];
    isWajib: boolean;
}

export interface BantenPenebusanAPI extends BantenPenebusan {
    conditionWuku?: string | null;
    conditionAstawara?: string | null;
    conditionDasawara?: string | null;
}

export let dynamicBantenPenebusan: BantenPenebusanAPI[] | null = null;

export const PEWATEKAN_DATA = {
    ekawara: {
        Luang: "Sulit ditebak, terkesan peragu atau bimbang karena terlalu banyak pertimbangan, namun mudah menyerap hal-hal baru."
    },
    dwiwara: {
        Menga: "Sifatnya terbuka, terang, asimilatif. Cenderung sulit menyimpan rahasia karena sifatnya yang blak-blakan.",
        Pepet: "Sifatnya tertutup, menyimpan misteri, seperti malam hari/gelap. Pendiam namun observan."
    },
    triwara: {
        Pasah: "Suka bercakap-cakap, periang, gemar bepergian, dan bersenda gurau.",
        Beteng: "Spiritualis, taat beribadah, memiliki pikiran yang subur/berkembang, rejekinya baik.",
        Kajeng: "Wataknya tajam, berani, royal/boros, terkadang suka menyusahkan diri sendiri demi orang lain atau prinsipnya."
    },
    caturwara: {
        Sri: "Cerdas, banyak ide, pengasih, berwatak damai, menyukai kebersihan dan keindahan. Memiliki pola pikir kesejahteraan.",
        Laba: "Pekerja keras, waspada, pikirannya visioner, punya etos kerja tinggi meski terkadang cerewet.",
        Jaya: "Kuat, ambisius, gembira, namun memiliki kecenderungan sifat iri hati jika tidak dikendalikan.",
        Menala: "Suka bertualang dan menjelajah. Beberapa referensi menyebutkan perlu waspada terhadap umur panjang jika tidak dijaga karma perbuatannya."
    },
    pancawara: {
        Umanis: "Sifatnya seperti Kucing/Tikus: Jinak, periang, waspada, peka. Hati-hati karena bisa pendendam jika disakiti.",
        Paing: "Sifatnya seperti Harimau: Mandiri, idealis, kuat menahan lapar, rajin tapi keras hati dan banyak rintangan musuh.",
        Pon: "Sifatnya seperti Kambing: Tidak terlalu jauh bepergian tanpa tujuan jelas, suka bergaul, bergurau, manis tutur katanya, dan suka pamer.",
        Wage: "Sifatnya seperti Sapi: Sabar, rajin, teguh pendirian, terkadang keras kepala, manja, dan suka berkelit jika disalahkan.",
        Kliwon: "Sifatnya seperti Kera/Anjing: Pintar wicara, tajam ingatan, galak, sangat setia pada kelompoknya, pandai memanjat (ambisius)."
    },
    sadwara: {
        Tungleh: "Tidak tetap pendirian, mudah goyah, terkadang arogan atau mudah malu.",
        Aryang: "Pekerja keras (ulet) dengan potensi sukses tinggi, namun cenderung pelupa.",
        Urukung: "Sering lupa, kurang fokus pada satu hal.",
        Paniron: "Setia pada janji dan komitmen (melengkapi sifat Sadwara lainnya).",
        Was: "Pendiam, tenang, tidak banyak tingkah.",
        Maulu: "Sensitif, sangat peka terhadap lingkungan sekitarnya."
    },
    saptawara: {
        Redite: "Berjiwa pemimpin, bijaksana, pertimbangan matang. Rawan sombong dan terlena jika terlalu banyak dipuji.",
        Soma: "Sangat berhati-hati bersikap/berucap, sabar, jujur, namun pasangannya sering khawatir atau cemburu.",
        Anggara: "Kurang sabar, angkuh, pemarah. Membutuhkan pengendalian diri yang kuat untuk mencegah kegagalan.",
        Buda: "Tenang, teliti, problem solver yang baik, rutenya jalan menuju kesuksesan.",
        Wraspati: "Bijaksana, menghargai milik orang lain, pendiam, jika diarahkan dengan baik akan menjadi orang baik.",
        Sukra: "Kurang sabar, agak angkuh, tapi amat menyukai kebersihan lahir batin.",
        Saniscara: "Keras hati, pemarah, butuh waktu lama untuk memaafkan jika marah."
    },
    astawara: {
        Sri: "Rupawan, mempesona, disukai lawan jenis (disegani perempuan).",
        Indra: "Berwibawa, tegas, dan cerdas.",
        Guru: "Cerdik, pandai menceramahi, disegani orang banyak.",
        Yama: "Penuh dinamika suka dan duka dalam perjalanannya.",
        Rudra: "Sering ditimpa hambatan, rawan kesedihan, atau gagal (memerlukan ketabahan ekstra).",
        Brahma: "Berjiwa seni tinggi, memiliki emosi batin yang menyala-nyala.",
        Kala: "Identik dengan masalah, penderitaan (Disarankan melakukan penebusan/Mebayuh).",
        Uma: "Tekun, penurut, pendiam."
    },
    sangawara: {
        Dangu: "Diam, keras, berat pendiriannya seperti batu.",
        Jangur: "Kuat, awas, sigap, luwes seperti harimau.",
        Gigis: "Sederhana, memelihara.",
        Nohan: "Gembira, mujur, mempesona seperti bulan.",
        Ogan: "Sering ragu, bingung, dan diidentikkan dengan dikaruniai banyak anak.",
        Erangan: "Hangat, cemerlang, namun menyimpan dendam seperti matahari menyengat.",
        Urungan: "Garang dan panas perasaannya (api).",
        Tulus: "Berbudi luhur, teduh, mendinginkan suasana (air).",
        Dadi: "Ergonomis, bermanfaat, menopang kehidupan (kayu)."
    },
    dasawara: {
        Pandita: "Bijaksana, religius, cerdik, condong pada kesucian.",
        Pati: "Dinamis, teliti, namun terkadang sulit merestui suatu hal.",
        Suka: "Gembira, riang, penuh gairah mencintai dan dicintai.",
        Duka: "Penuh penderitaan, sedih, malang (Sangat disarankan melakukan ritual penebusan dosa masa lalu/Mebayuh).",
        Sri: "Pemikir kesejahteraan, penolong, rupawan.",
        Manuh: "Cenderung polos, penurut, tekun, dan sering lupa tanggung jawab jika tidak diingatkan.",
        Manusa: "Manusiawi, rasa kemanusiaan tinggi, jiwa sosial kental (harus selektif menolong agar tidak dimanfaatkan).",
        Raja: "Cerdik, pandai, berwibawa, pemimpin sukses yang disegani.",
        Dewa: "Berbudi luhur, cerdas, bawaan sukses, membawa kesejahteraan bagi sekitarnya.",
        Raksasa: "Rawan sifat serakah, keras, bengis. Butuh pengendalian diri (Bharata) kuat untuk menekan sifat ini."
    }
};

export const BANTEN_PENEBUSAN_DATA = {
    wukuWayang: {
        title: "Banten Bayuh Oton Sapuh Leger",
        description: "DIWAJIBKAN: Kelahiran pada Wuku Wayang dianggap 'Salah Wadi' (rentan gangguan Batara Kala). Membutuhkan ritual Bayuh Oton skala besar yang dipuput oleh Dalang Sapuh Leger beserta tirta khusus pelukatan wayang.",
        bantenList: [
            "Banten Tumpeng Lima (Otonan Lengkap)",
            "Banten Pratista, Durmengala, dan Biokala",
            "Banten Pejati Sapuh Leger",
            "Tirta Sapuh Leger dari Dalang (Lakon Wayang Sapuh Leger)"
        ],
        isWajib: true
    },
    otonanStandar: {
        title: "Banten Penebusan Watek (Otonan)",
        description: "Berdasarkan pedoman Wariga, setiap hari kelahiran memiliki banten penebusan standar untuk mengharmoniskan watek/karakter bawaan dari siklus wewaran.",
        bantenList: [
            "Banten Prayascita & Durmengala",
            "Banten Pengambeyan, Dapetan, Peras, Pejati",
            "Banten Sesayut",
            "Segehan"
        ],
        isWajib: false
    },
    kalaDuka: {
        title: "Banten Penebusan Mebayuh Oton",
        description: "DISARANKAN: Kelahiran dengan pertemuan wewaran Astawara Kala atau Dasawara Duka rawan mengalami penderitaan, hambatan, atau kesedihan bawaan.",
        bantenList: [
            "Banten Otonan Standar (Pengambeyan, Dapetan, Peras, Pejati)",
            "Banten Sesayut Pageh Tuwuh (Penguat Umur)",
            "Banten Sesayut Dirgayusa"
        ],
        isWajib: false
    }
};

export function getPewatekan(
    ekawara?: string,
    dwiwara?: string,
    triwara?: string,
    caturwara?: string,
    pancawara?: string,
    sadwara?: string,
    saptawara?: string,
    astawara?: string,
    sangawara?: string,
    dasawara?: string
): Pewatekan {
    return {
        ...(ekawara && PEWATEKAN_DATA.ekawara[ekawara as keyof typeof PEWATEKAN_DATA.ekawara] && { ekawara: { wewaranName: 'Ekawara', category: ekawara, watak: PEWATEKAN_DATA.ekawara[ekawara as keyof typeof PEWATEKAN_DATA.ekawara] } }),
        ...(dwiwara && PEWATEKAN_DATA.dwiwara[dwiwara as keyof typeof PEWATEKAN_DATA.dwiwara] && { dwiwara: { wewaranName: 'Dwiwara', category: dwiwara, watak: PEWATEKAN_DATA.dwiwara[dwiwara as keyof typeof PEWATEKAN_DATA.dwiwara] } }),
        ...(triwara && PEWATEKAN_DATA.triwara[triwara as keyof typeof PEWATEKAN_DATA.triwara] && { triwara: { wewaranName: 'Triwara', category: triwara, watak: PEWATEKAN_DATA.triwara[triwara as keyof typeof PEWATEKAN_DATA.triwara] } }),
        ...(caturwara && PEWATEKAN_DATA.caturwara[caturwara as keyof typeof PEWATEKAN_DATA.caturwara] && { caturwara: { wewaranName: 'Caturwara', category: caturwara, watak: PEWATEKAN_DATA.caturwara[caturwara as keyof typeof PEWATEKAN_DATA.caturwara] } }),
        ...(pancawara && PEWATEKAN_DATA.pancawara[pancawara as keyof typeof PEWATEKAN_DATA.pancawara] && { pancawara: { wewaranName: 'Pancawara', category: pancawara, watak: PEWATEKAN_DATA.pancawara[pancawara as keyof typeof PEWATEKAN_DATA.pancawara] } }),
        ...(sadwara && PEWATEKAN_DATA.sadwara[sadwara as keyof typeof PEWATEKAN_DATA.sadwara] && { sadwara: { wewaranName: 'Sadwara', category: sadwara, watak: PEWATEKAN_DATA.sadwara[sadwara as keyof typeof PEWATEKAN_DATA.sadwara] } }),
        ...(saptawara && PEWATEKAN_DATA.saptawara[saptawara as keyof typeof PEWATEKAN_DATA.saptawara] && { saptawara: { wewaranName: 'Saptawara', category: saptawara, watak: PEWATEKAN_DATA.saptawara[saptawara as keyof typeof PEWATEKAN_DATA.saptawara] } }),
        ...(astawara && PEWATEKAN_DATA.astawara[astawara as keyof typeof PEWATEKAN_DATA.astawara] && { astawara: { wewaranName: 'Astawara', category: astawara, watak: PEWATEKAN_DATA.astawara[astawara as keyof typeof PEWATEKAN_DATA.astawara] } }),
        ...(sangawara && PEWATEKAN_DATA.sangawara[sangawara as keyof typeof PEWATEKAN_DATA.sangawara] && { sangawara: { wewaranName: 'Sangawara', category: sangawara, watak: PEWATEKAN_DATA.sangawara[sangawara as keyof typeof PEWATEKAN_DATA.sangawara] } }),
        ...(dasawara && PEWATEKAN_DATA.dasawara[dasawara as keyof typeof PEWATEKAN_DATA.dasawara] && { dasawara: { wewaranName: 'Dasawara', category: dasawara, watak: PEWATEKAN_DATA.dasawara[dasawara as keyof typeof PEWATEKAN_DATA.dasawara] } })
    };
}

export function checkBantenPenebusan(wukuName?: string, astawara?: string, dasawara?: string): BantenPenebusan[] {
    const penebusan: BantenPenebusan[] = [];

    if (dynamicBantenPenebusan && dynamicBantenPenebusan.length > 0) {
        dynamicBantenPenebusan.forEach(rule => {
            let match = false;
            // Jika semua condition kosong, berarti berlaku umum (standar otonan)
            if (!rule.conditionWuku && !rule.conditionAstawara && !rule.conditionDasawara) {
                match = true;
            } else {
                if (rule.conditionWuku && wukuName === rule.conditionWuku) match = true;
                if (rule.conditionAstawara && astawara === rule.conditionAstawara) match = true;
                if (rule.conditionDasawara && dasawara === rule.conditionDasawara) match = true;
            }
            if (match) {
                penebusan.push({
                    title: rule.title,
                    description: rule.description,
                    bantenList: rule.bantenList,
                    isWajib: rule.isWajib
                });
            }
        });
        return penebusan;
    }

    // Fallback to local hardcoded logic
    penebusan.push(BANTEN_PENEBUSAN_DATA.otonanStandar);

    if (wukuName === 'Wayang') {
        penebusan.push(BANTEN_PENEBUSAN_DATA.wukuWayang);
    }

    if (astawara === 'Kala' || dasawara === 'Duka') {
        penebusan.push(BANTEN_PENEBUSAN_DATA.kalaDuka);
    }

    return penebusan;
}

export async function loadPewatekanData() {
    try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
        const res = await fetch(`${API_URL}/master/pewatekan`);
        if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
                // Clear the object properties safely for the fallbacks
                for (const key in PEWATEKAN_DATA) {
                    (PEWATEKAN_DATA as any)[key] = {};
                }
                
                data.forEach((item: any) => {
                    const ti = item.wewaranTipe as keyof typeof PEWATEKAN_DATA;
                    // Because the object structure initialized dynamically above
                    if (PEWATEKAN_DATA[ti] !== undefined) {
                        (PEWATEKAN_DATA[ti] as any)[item.category] = item.watak;
                    }
                });
                console.log(`[KalenderBali] Loaded ${data.length} Pewatekan rules from API`);
            }
        }
    } catch (err) {
        console.warn('[KalenderBali] Failed to fetch Pewatekan, using fallback data', err);
    }
}

export async function loadBantenPenebusanData() {
    try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
        const res = await fetch(`${API_URL}/master/banten`);
        if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
                dynamicBantenPenebusan = data.map((item: any) => ({
                    title: item.title,
                    description: item.description,
                    conditionWuku: item.conditionWuku,
                    conditionAstawara: item.conditionAstawara,
                    conditionDasawara: item.conditionDasawara,
                    bantenList: typeof item.bantenList === 'string' ? JSON.parse(item.bantenList) : item.bantenList,
                    isWajib: Boolean(item.isWajib)
                }));
                console.log(`[KalenderBali] Loaded ${dynamicBantenPenebusan.length} Banten Penebusan rules from API`);
            }
        }
    } catch (err) {
        console.warn('[KalenderBali] Failed to fetch Banten Penebusan, using fallback data', err);
    }
}
