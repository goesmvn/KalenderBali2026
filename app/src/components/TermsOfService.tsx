import { FileText, Scale, AlertTriangle, BookOpen, AlertCircle } from 'lucide-react';

export function TermsOfService() {
    return (
        <div className="w-full bg-stone-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
                <div className="bg-[#c1121f] p-8 text-white relative overflow-hidden text-center sm:text-left">
                    <Scale className="absolute -right-6 -bottom-6 w-48 h-48 opacity-10" />
                    <h1 className="text-3xl font-bold tracking-tight relative z-10 flex items-center justify-center sm:justify-start gap-3">
                        <FileText className="w-8 h-8" />
                        Syarat & Ketentuan Layanan
                    </h1>
                    <p className="mt-2 text-red-100 relative z-10 max-w-2xl text-sm sm:text-base">
                        Sebuah ikatan pengguna layanan, hak cipta materi, serta batasan tanggung jawab fungsional situs.
                    </p>
                </div>

                <div className="p-6 sm:p-10 text-stone-700 space-y-8 leading-relaxed text-sm sm:text-base">
                    <section>
                        <h2 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-[#c1121f]" />
                            1. Kesepakatan Latar
                        </h2>
                        <p className="mb-4">
                            Pengaksesan, penelusuran, dan pengunduhan informasi dari situs web <strong>KalenderBali.id</strong> (serta *Widget Embed* di pihak ketiga) tunduk sepenuhnya pada Syarat dan Ketentuan berikut, yang diselaraskan dengan Undang-Undang Informasi dan Transaksi Elektronik (UU ITE). Apabila Anda secara fundamental tidak setuju dengan poin-poin yang tertera di bawah, harap hentikan penggunaan peranti lunak ini.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-[#c1121f]" />
                            2. Disklaimer Akurasi Ramalan (Batasan Tanggung Jawab)
                        </h2>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li><strong>KalenderBali.id</strong> dikembangkan merujuk pada teks-teks Lontar Wariga (seperti <em>Wariga Dewasa</em> oleh Sri Rsi Ananda Kusuma, <em>Pokok-pokok Wariga</em> oleh I.B. Suparta Ardhana, dll.) menggunakan perhitungan astronomis Bali. Meski diusahakan dengan keilmuan presisi tingkat tinggi, hasil perhitungan <em>Otonan</em>, <em>Hari Baik (Dewasa Ayu)</em>, <em>Pawiwahan</em>, maupun <em>Skor Kecocokan (Urip)</em> pada fitur Lahir Sesar <strong>bukan jaminan kepastian takdir mutlak.</strong></li>
                            <li>Aplikasi ini hanya dapat berperan sebagai parameter <strong>saran pendukung</strong> untuk aktivitas budaya dan spritual, tidak dapat dijadikan substitusi mutlak atas petunjuk resmi/agama dari pemuka adat, pendeta/Sulinggih, atau dokter ahli kandungan.</li>
                            <li>Segala konsekuensi materiil, riil, fisik, mapun non-fisik akibat bertindak atas (atau mengabaikan) hasil PDF KalenderBali.id, tidak dapat digugat sebagai ganti rugi terhadap Yayasan NusaHeritage selaku pengembang peranti.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
                            <Scale className="w-5 h-5 text-[#c1121f]" />
                            3. Hak Kekayaan Intelektual (HAKI)
                        </h2>
                        <p className="mb-4">
                            Seluruh antarmuka (UI/UX), tata letak (layout), grafik, algoritma penghitungan tanggalan Saka yang bersifat proprietary, serta output Dokumen Cetak (File PDF Eksport) merupakan Hak Kekayaan Intelektual NusaHeritage, dilindungi oleh konstitusi kekayaan intelektual Indonesia.
                        </p>
                        <p className="mb-4">
                            Pengguna diberikan **lisensi non-eksklusif, bebas royalti** untuk mengunduh PDF secara gratis bagi kepentingan perorangan atau edukasi masyarakat umum. Modifikasi kode injeksi pada platform (*Reverse Engineering*), memperjualbelikan dokumen ekstrak PDF (hasil perhitungan mesin KalenderBali), atau menutupi logo (watermark/atribusi *Footer*) pada penyematan Widget tanpa konsensus tertulis adalah bentuk penemuan pelanggaran Hak Cipta perangkat lunak.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-[#c1121f]" />
                            4. Ketersediaan dan Pembaruan Sistem
                        </h2>
                        <p className="mb-4">
                            Kami berusaha menjaga jam aktif <em>uptime</em> di kisaran ~99%. Namun, aksesibilitas pada layanan ini disediakan dalam frasa "Apa Adanya" (<em>As Is</em>). Akses sewaktu-waktu dapat dijedakan untuk proses <em>maintenance</em> server, perbaikan celah aplikasi, atau penyesuaian korektif rumus kalender dari hasil *Pesamuan Agung*. Aturan ketentuan ini berhak berubah setiap kuartal tanpa diseminasi surel individu apabila pembaruan teramat wajar.
                        </p>
                    </section>

                    <div className="border-t border-stone-200 pt-6 mt-8">
                        <p className="text-sm text-stone-500 text-center">
                            Kami berhak menyunting Syarat Ketentuan ini berdasarkan interpretasi dinamika hukum. <br />
                            Terbitan: Maret 2026.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
