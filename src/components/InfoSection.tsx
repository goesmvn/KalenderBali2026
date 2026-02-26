import { motion } from 'framer-motion';
import { 
  Sun, 
  Moon, 
  Calendar, 
  Clock, 
  Compass, 
  Star,
  Info
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const infoItems = [
  {
    id: 'purnama-tilem',
    icon: Sun,
    title: 'Purnama & Tilem',
    color: 'from-yellow-400 to-brand-700',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    content: `Purnama (bulan purna) dan Tilem (bulan mati) adalah dua fase penting dalam siklus bulan kalender Bali.
    
• <strong>Purnama</strong>: Bulan penuh, saat bulan berada pada posisi paling terang. Waktu yang dianggap sangat baik untuk upacara keagamaan dan meditasi.

• <strong>Tilem</strong>: Bulan gelap, saat bulan tidak terlihat. Masa untuk introspeksi, membersihkan diri, dan mempersiapkan diri untuk siklus baru.

Kedua fase ini menandai perubahan energi alam dan sering digunakan sebagai patokan untuk berbagai upacara adat dan keagamaan di Bali.`
  },
  {
    id: 'wuku',
    icon: Calendar,
    title: 'Wuku (30 Siklus Minggu)',
    color: 'from-emerald-400 to-teal-500',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    content: `Wuku adalah siklus minggu dalam kalender Bali yang terdiri dari 30 nama, masing-masing memiliki karakteristik dan dewata penguasa.

Setiap wuku memiliki:
• <strong>Nama unik</strong>: Dari Sinta sampai Watugunung
• <strong>Urip (angka hidup)</strong>: Energi numerik 1-9
• <strong>Dewata penguasa</strong>: Dewa yang melindungi wuku tersebut
• <strong>Arah letak</strong>: Arah mata angin yang berpengaruh

Wuku digunakan untuk menentukan hari baik (dewasa ayu), membaca karakter kelahiran, dan penentuan upacara.`
  },
  {
    id: 'sasih',
    icon: Moon,
    title: 'Sasih (12 Bulan)',
    color: 'from-indigo-400 to-purple-500',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    content: `Sasih adalah sistem bulan dalam kalender Saka Bali yang terdiri dari 12 bulan, dimulai dari Sasih Kasa (Juli).

Daftar Sasih:
• <strong>Sasih Kasa</strong> (Juli) - Dewi Sri
• <strong>Sasih Karo</strong> (Agustus) - Dewa Ganga
• <strong>Sasih Katiga</strong> (September) - Dewa Wisnu
• <strong>Sasih Kapat</strong> (Oktober) - Dewa Brahma
• <strong>Sasih Kalima</strong> (November) - Dewa Iswara
• <strong>Sasih Kanem</strong> (Desember) - Dewa Durgha
• <strong>Sasih Kapitu</strong> (Januari) - Bhatara Guru/Siwa
• <strong>Sasih Kawolu</strong> (Februari) - Dewa Parameswara
• <strong>Sasih Kasanga</strong> (Maret) - Dewi Uma
• <strong>Sasih Kadasa</strong> (April) - Dewa Sangkara
• <strong>Sasih Desta</strong> (Mei) - Dewa Sambu
• <strong>Sasih Sada</strong> (Juni) - Dewa Anantaboga`
  },
  {
    id: 'wewaran',
    icon: Clock,
    title: 'Wewaran (Siklus Hari)',
    color: 'from-rose-400 to-pink-500',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
    content: `Wewaran adalah sistem siklus hari dalam kalender Bali yang terdiri dari beberapa tingkatan:

• <strong>Ekawara</strong> (1 hari): Luang - kehampaan
• <strong>Dwiwara</strong> (2 hari): Menga & Pepet - terbuka/tertutup
• <strong>Triwara</strong> (3 hari): Pasah, Beteng, Kajeng - dinamika energi
• <strong>Caturwara</strong> (4 hari): Sri, Laba, Jaya, Menala - hasil dan kesejahteraan
• <strong>Pancawara</strong> (5 hari): Umanis, Paing, Pon, Wage, Kliwon - siklus harian
• <strong>Sadwara</strong> (6 hari): Tungleh, Aryang, Urukung, Paniron, Was, Maulu - kondisi batin
• <strong>Saptawara</strong> (7 hari): Redite sampai Saniscara - hari dalam seminggu
• <strong>Astawara</strong> (8 hari): Sri, Indra, Guru, Yama, Ludra, Brahma, Kala, Uma - prinsip kehidupan
• <strong>Sangawara</strong> (9 hari): Dangu sampai Dadi - sifat alam dan manusia
• <strong>Dasawara</strong> (10 hari): Pandita sampai Raksasa - kekuatan hidup`
  },
  {
    id: 'urip',
    icon: Star,
    title: 'Urip (Angka Hidup)',
    color: 'from-brand-400 to-yellow-500',
    bgColor: 'bg-brand-50',
    borderColor: 'border-brand-200',
    content: `Urip adalah nilai numerik (1-10) yang melekat pada setiap wewaran, wuku, dan elemen kalender lainnya.

Fungsi Urip:
• Menentukan <strong>dewasa ayu</strong> (hari baik/buruk)
• Membaca <strong>karakter kelahiran</strong>
• Menghitung <strong>kecocokan</strong> dalam pernikahan
• Penentuan <strong>upacara adat</strong>

Cara perhitungan:
Urip dari berbagai elemen (Saptawara + Pancawara + Wuku) dijumlahkan dan dimodulus untuk mendapatkan hasil akhir yang menentukan kualitas hari tersebut.`
  },
  {
    id: 'dewata',
    icon: Compass,
    title: 'Dewata & Arah',
    color: 'from-cyan-400 to-blue-500',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
    content: `Setiap elemen kalender Bali memiliki dewata penguasa dan arah letak (paling) yang memberikan karakter spiritual.

<strong>Arah Letak:</strong>
• <strong>Tengah</strong>: Pusat kekuatan spiritual
• <strong>Timur</strong>: Matahari terbit, awal, kehidupan
• <strong>Selatan</strong>: Kekuatan, kematian, transformasi
• <strong>Barat</strong>: Matahari terbenam, akhir, pembaruan
• <strong>Utara</strong>: Keberuntungan, kemakmuran
• <strong>Timur Laut</strong>: Kesucian, kebajikan
• <strong>Tenggara</strong>: Kekuatan, perlindungan
• <strong>Barat Daya</strong>: Ketenangan, stabilitas
• <strong>Barat Laut</strong>: Kebijaksanaan, pengetahuan

Dewata-dewata ini dipuja dalam berbagai upacara untuk memohon berkah dan perlindungan.`
  }
];

export function InfoSection() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 rounded-full mb-4">
            <Info className="w-4 h-4 text-stone-500" />
            <span className="text-sm font-medium text-stone-600">Pelajari Lebih Lanjut</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-800 mb-3">
            Memahami Kalender Bali
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Sistem penanggalan Bali kaya akan filosofi dan spiritualitas. 
            Pelajari elemen-elemen penting yang membentuk kalender ini.
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {infoItems.map((item) => (
              <AccordionItem 
                key={item.id} 
                value={item.id}
                className={`border rounded-xl overflow-hidden ${item.borderColor} ${item.bgColor}`}
              >
                <AccordionTrigger className="px-4 sm:px-6 py-4 hover:no-underline group">
                  <div className="flex items-center gap-3 sm:gap-4 text-left">
                    <div className={`p-2 sm:p-2.5 rounded-lg bg-gradient-to-br ${item.color} text-white shadow-sm`}>
                      <item.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="font-semibold text-stone-800 text-sm sm:text-base">{item.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 sm:px-6 pb-4">
                  <div 
                    className="pt-2 text-sm sm:text-base text-stone-600 leading-relaxed whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <blockquote className="relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-6xl text-brand-200 font-serif">"</div>
            <p className="text-stone-600 italic text-sm sm:text-base max-w-xl mx-auto relative z-10">
              Pemahaman mengenai wewaran, urip, dewata, uku, dan sasih bukan hanya menjadi bagian dari warisan leluhur, 
              tetapi juga digunakan dalam berbagai aspek kehidupan masyarakat Bali.
            </p>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
