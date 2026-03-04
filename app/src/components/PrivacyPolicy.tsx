import { Shield, FileText, Lock, Globe, Server, UserCheck } from 'lucide-react';

export function PrivacyPolicy() {
    return (
        <div className="w-full bg-stone-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
                <div className="bg-[#c1121f] p-8 text-white relative overflow-hidden text-center sm:text-left">
                    <Shield className="absolute -right-6 -bottom-6 w-48 h-48 opacity-10" />
                    <h1 className="text-3xl font-bold tracking-tight relative z-10 flex items-center justify-center sm:justify-start gap-3">
                        <Lock className="w-8 h-8" />
                        Kebijakan Privasi
                    </h1>
                    <p className="mt-2 text-red-100 relative z-10 max-w-2xl text-sm sm:text-base">
                        Komitmen kami dalam melindungi data pribadi Anda sesuai dengan Undang-Undang Perlindungan Data Pribadi (UU PDP) Republik Indonesia.
                    </p>
                </div>

                <div className="p-6 sm:p-10 text-stone-700 space-y-8 leading-relaxed text-sm sm:text-base">
                    <section>
                        <h2 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-[#c1121f]" />
                            1. Pendahuluan
                        </h2>
                        <p className="mb-4">
                            Selamat datang di <strong>KalenderBali.id</strong> (bagian dari inisiatif NusaHeritage). Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, mengungkapkan, dan mengamankan informasi saat Anda mengakses layanan kami, baik secara langsung maupun melalui <em>widget</em> pihak ketiga.
                        </p>
                        <p>
                            Penggunaan layanan ini mengindikasikan bahwa Anda telah membaca, memahami, dan menyetujui praktik penanganan data yang dijelaskan di halaman ini, sesuai dengan ketentuan hukum yang berlaku di Indonesia, termasuk UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi (UU PDP).
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
                            <Server className="w-5 h-5 text-[#c1121f]" />
                            2. Data yang Kami Kumpulkan
                        </h2>
                        <p className="mb-4">
                            Untuk menjaga optimalitas layanan yang tidak mengharuskan pengguna mendaftar (login), kami **tidak** mengumpulkan identitas pribadi spesifik pengguna seperti nama lengkap, NIK, alamat email, atau nomor telepon.
                        </p>
                        <p className="mb-2 font-semibold">Data teknis yang mungkin terekam dan bersifat anonim meliputi:</p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li><strong>Informasi Log (Telemetri):</strong> Alamat IP tersamar, tipe <em>browser</em>, waktu akses, serta riwayat halaman kalender/fitur yang dilihat untuk tujuan analitik internal.</li>
                            <li><strong>Data Rujukan (Referrer):</strong> Jika Anda berinteraksi dengan layanan KalenderBali.id yang ditanamkan (<em>embedded widget</em>) pada website pihak ketiga, sistem kami menerima informasi domain rujukan tempat widget tersebut dimuat untuk keperluan agregasi trafik.</li>
                            <li><strong>Parameter Pencarian:</strong> Tanggal Masehi atau fitur (seperti Pawiwahan, Hari Baik, dan Otonan) yang dieksekusi secara lokal pada sisi klien. Data input (seperti nama Otonan Ayah/Ibu di fitur PDF) hanya diproses dari sisi peramban pengguna (<em>client-side</em>) dan <strong>tidak pernah</strong> dikirim apalagi disimpan permanen di server NusaHeritage.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
                            <Globe className="w-5 h-5 text-[#c1121f]" />
                            3. Penggunaan dan Cookie
                        </h2>
                        <p className="mb-4">
                            Sistem kami mungkin menggunakan teknologi <em>Local Storage</em> dan <em>Cookies</em> minimum demi mengoptimalkan *user experience* (misalnya: mengingat bulan atau tahun kalender terakhir yang Anda lihat agar pencarian terasa cepat).
                        </p>
                        <p>
                            Anda memiliki hak penuh untuk menonaktifkan fitur <em>cookies</em> melalui peramban (browser) yang Anda gunakan, meski hal tersebut dapat berdampak pada kinerja responsif beberapa fitur aplikasi.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
                            <UserCheck className="w-5 h-5 text-[#c1121f]" />
                            4. Keamanan Informasi & Pihak Ketiga
                        </h2>
                        <p className="mb-4">
                            Kami menerapkan pelindungan data dengan langkah rasional berdasarkan standar industri. Kami <strong>tidak pernah menjual, menyewakan, atau mendistribusikan data pengunjung</strong> kepada pihak ketiga mana pun untuk tujuan komersil.
                        </p>
                        <p>
                            KalenderBali.id berisi tautan rujukan keluar menuju layanan utama NusaHeritage.id atau pihak terkait. Apabila Anda menekan tautan tersebut, pemrosesan data tunduk pada kebijakan privasi platform pihak ketiga.
                        </p>
                    </section>

                    <div className="border-t border-stone-200 pt-6 mt-8">
                        <p className="text-sm text-stone-500 text-center">
                            <strong>Terakhir Diperbarui:</strong> Maret 2026<br />
                            Untuk pertanyaan atau kekhawatiran terkait data, silakan hubungi kami di <a href="mailto:info@kalenderbali.id" className="text-[#c1121f] hover:underline">info@kalenderbali.id</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
