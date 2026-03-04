import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

interface FooterProps {
    onNavigate: (page: 'home' | 'about' | 'privacy' | 'terms') => void;
}

export function Footer({ onNavigate }: FooterProps) {
    return (
        <footer className="bg-white border-t border-stone-200 py-12">
            <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand Column */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-xl font-bold tracking-tight text-stone-800">KalenderBali</span>
                            <span className="text-xl font-bold tracking-tight text-[#c1121f]">.id</span>
                        </div>
                        <p className="text-stone-500 text-sm mb-6 max-w-sm">
                            Mempertahankan warisan budaya dan spiritualitas leluhur Bali melalui platform penanggalan digital. <br /><br />
                            <strong>KalenderBali.id</strong> merupakan bagian dari inisiatif <a href="https://nusaheritage.id" target="_blank" rel="noopener noreferrer" className="text-[#c1121f] hover:underline font-semibold">NusaHeritage.id</a>.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://nusaheritage.id" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:bg-[#c1121f] hover:text-white transition-colors">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="https://nusaheritage.id" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:bg-[#c1121f] hover:text-white transition-colors">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="https://nusaheritage.id" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:bg-[#c1121f] hover:text-white transition-colors">
                                <Twitter className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links Column */}
                    <div>
                        <h3 className="font-semibold text-stone-800 mb-4">Akses Cepat</h3>
                        <ul className="space-y-3">
                            <li><button onClick={() => onNavigate('about')} className="text-sm text-stone-500 hover:text-[#c1121f] transition-colors">Tentang Kami</button></li>
                            <li><a href="https://nusaheritage.id/warisan-budaya-berwujud" target="_blank" rel="noopener noreferrer" className="text-sm text-stone-500 hover:text-[#c1121f] transition-colors">Warisan Budaya Benda</a></li>
                            <li><a href="https://nusaheritage.id/warisan-budaya-tak-berwujud" target="_blank" rel="noopener noreferrer" className="text-sm text-stone-500 hover:text-[#c1121f] transition-colors">Warisan Tak Benda</a></li>
                            <li><a href="https://metemu.nusaheritage.id" target="_blank" rel="noopener noreferrer" className="text-sm text-stone-500 hover:text-[#c1121f] transition-colors">Ramalan & Perjodohan</a></li>
                            <li><a href="https://nusaheritage.id/virtualtour" target="_blank" rel="noopener noreferrer" className="text-sm text-stone-500 hover:text-[#c1121f] transition-colors">VR Tours</a></li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h3 className="font-semibold text-stone-800 mb-4">Kontak</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-stone-400 mt-0.5 shrink-0" />
                                <span className="text-sm text-stone-500">Denpasar, Bali, Indonesia 80111</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-stone-400 shrink-0" />
                                <span className="text-sm text-stone-500">+62 812 3456 7890</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-stone-400 shrink-0" />
                                <span className="text-sm text-stone-500">info@kalenderbali.id</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-stone-100 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-stone-400 text-center md:text-left">
                        © {new Date().getFullYear()} KalenderBali.id. Dibuat dengan ❤️ untuk pelestarian budaya.
                    </div>
                    <div className="flex gap-4 text-xs text-stone-400">
                        <button onClick={() => onNavigate('privacy')} className="hover:text-stone-600 transition-colors">Kebijakan Privasi</button>
                        <button onClick={() => onNavigate('terms')} className="hover:text-stone-600 transition-colors">Syarat & Ketentuan</button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
