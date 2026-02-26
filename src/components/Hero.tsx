import { motion } from 'framer-motion';
import { Calendar, Moon, Sun, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-brand-50 to-red-50">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 60, repeat: Infinity, ease: 'linear' },
            scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' }
          }}
          className="absolute -top-32 -right-32 w-64 h-64 border border-brand-200/50 rounded-full"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: { duration: 80, repeat: Infinity, ease: 'linear' },
            scale: { duration: 10, repeat: Infinity, ease: 'easeInOut' }
          }}
          className="absolute -bottom-48 -left-48 w-96 h-96 border border-brand-200/50 rounded-full"
        />
        <motion.div
          animate={{ 
            rotate: 360
          }}
          transition={{ 
            duration: 100, 
            repeat: Infinity, 
            ease: 'linear' 
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-red-100/30 rounded-full"
        />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-brand-200 shadow-sm mb-6"
          >
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span className="text-sm font-medium text-stone-700">Warisan Leluhur Bali</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-800 mb-4"
          >
            <span className="bg-gradient-to-r from-brand-700 via-brand-800 to-red-600 bg-clip-text text-transparent">
              Kalender Bali
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto mb-8"
          >
            Sistem penanggalan tradisional dengan perhitungan 
            <span className="font-medium text-brand-800"> Purnama</span>, 
            <span className="font-medium text-slate-700"> Tilem</span>, 
            <span className="font-medium text-emerald-700"> Wuku</span>, 
            <span className="font-medium text-indigo-700"> Sasih</span>, dan 
            <span className="font-medium text-rose-700"> Wewaran</span>
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 sm:gap-4"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg border border-brand-200/60">
              <Sun className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-stone-700">Purnama & Tilem</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg border border-emerald-200/60">
              <Calendar className="w-4 h-4 text-emerald-500" />
              <span className="text-sm text-stone-700">30 Wuku</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg border border-indigo-200/60">
              <Moon className="w-4 h-4 text-indigo-500" />
              <span className="text-sm text-stone-700">12 Sasih</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path 
            d="M0 60V30C240 10 480 0 720 0C960 0 1200 10 1440 30V60H0Z" 
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
}
