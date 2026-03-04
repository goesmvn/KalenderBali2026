import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Wewaran } from '@/types/bali-calendar';
import { Compass, Sun, User, ChevronDown } from 'lucide-react';

interface WewaranCardProps {
  title: string;
  wewaran: Wewaran | null;
  delay?: number;
  highlight?: boolean;
}

export function WewaranCard({ title, wewaran, delay = 0, highlight = false }: WewaranCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!wewaran) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.3 }}
        className="bg-white/50 rounded-xl p-4 border border-stone-200/60"
      >
        <p className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-1">{title}</p>
        <p className="text-stone-400 italic">-</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      onClick={() => setIsExpanded(!isExpanded)}
      className={`rounded-xl p-4 border transition-all duration-300 cursor-pointer ${highlight
          ? 'bg-gradient-to-br from-brand-50 to-stone-50 border-brand-200 shadow-md hover:shadow-lg'
          : 'bg-white/80 border-stone-200/60 hover:border-brand-300 hover:shadow-md group'
        }`}
    >
      <div className="flex justify-between items-start mb-2">
        <p className="text-xs font-medium text-stone-500 uppercase tracking-wider">{title}</p>
        <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''} ${highlight ? '' : 'group-hover:text-brand-600'}`} />
      </div>
      <h4 className={`text-lg font-semibold mb-2 ${highlight ? 'text-brand-900' : 'text-stone-800'}`}>
        {wewaran.name}
      </h4>

      <div className="space-y-1.5 text-sm">
        <div className="flex items-center gap-2 text-stone-600">
          <Sun className="w-3.5 h-3.5 text-brand-600" />
          <span>Urip: <span className="font-medium">{wewaran.urip}</span></span>
        </div>
        <div className="flex items-center gap-2 text-stone-600">
          <User className="w-3.5 h-3.5 text-indigo-500" />
          <span className={isExpanded ? "" : "truncate"}>{wewaran.dewata}</span>
        </div>
        <div className="flex items-center gap-2 text-stone-600">
          <Compass className="w-3.5 h-3.5 text-emerald-500" />
          <span className={isExpanded ? "" : "truncate"}>{wewaran.letak}</span>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && wewaran.description && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="mt-3 text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-2">
              {wewaran.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
