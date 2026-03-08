import { motion } from 'framer-motion';
import {
  Sun,
  Moon,
  Calendar,
  Clock,
  Compass,
  Star,
  Info,
  Search,
  Heart,
  Baby,
  BookOpen
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useTranslation } from 'react-i18next';

const baseInfoItems = [
  {
    id: 'guide-melahirkan',
    icon: Baby,
    color: 'from-rose-500 to-red-500',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
  },
  {
    id: 'guide-pawiwahan',
    icon: Heart,
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
  },
  {
    id: 'guide-search',
    icon: Search,
    color: 'from-sky-400 to-blue-500',
    bgColor: 'bg-sky-50',
    borderColor: 'border-sky-200',
  },
  {
    id: 'purnama-tilem',
    icon: Sun,
    color: 'from-yellow-400 to-brand-700',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
  },
  {
    id: 'wuku',
    icon: Calendar,
    color: 'from-emerald-400 to-teal-500',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
  },
  {
    id: 'sasih',
    icon: Moon,
    color: 'from-indigo-400 to-purple-500',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
  },
  {
    id: 'wewaran',
    icon: Clock,
    color: 'from-rose-400 to-pink-500',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
  },
  {
    id: 'urip',
    icon: Star,
    color: 'from-brand-400 to-yellow-500',
    bgColor: 'bg-brand-50',
    borderColor: 'border-brand-200',
  },
  {
    id: 'dewata',
    icon: Compass,
    color: 'from-cyan-400 to-blue-500',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
  }
];

export function InfoSection() {
  const { t } = useTranslation();

  const infoItems = baseInfoItems.map(item => ({
    ...item,
    title: t(`info_section.items.${item.id}.title`),
    content: t(`info_section.items.${item.id}.content`)
  }));

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
            <span className="text-sm font-medium text-stone-600">{t('info_section.subtitle')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-800 mb-3">
            {t('info_section.title')}
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            {t('info_section.intro_1')} <br /><br />
            <strong>KalenderBali.id</strong> {t('info_section.intro_2')} <a href="https://nusaheritage.id" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:text-brand-700 font-semibold hover:underline">NusaHeritage.id</a>.
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
              {t('info_section.quote')}
            </p>
          </blockquote>
        </motion.div>

        {/* References Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 pt-10 border-t border-stone-200"
        >
          <div className="flex items-center justify-center gap-2 mb-8">
            <BookOpen className="w-5 h-5 text-stone-500" />
            <h3 className="text-xl font-bold text-stone-800">{t('info_section.reference_title')}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-stone-50 rounded-xl p-5 border border-stone-200">
              <h4 className="font-semibold text-brand-700 mb-2">{t('info_section.expert_title')}</h4>
              <p className="text-stone-600 text-sm leading-relaxed mb-3">
                {t('info_section.expert_desc').split('Ida Bagus Ngurah Semara')[0]}
                <a href="https://semaraibm.blogspot.com/" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:text-brand-700 hover:underline font-semibold">Ida Bagus Ngurah Semara</a>
                {t('info_section.expert_desc').split('Ida Bagus Ngurah Semara')[1] || ', Griya Kawan Manuaba Apuan Bangli.'}
              </p>
              <h4 className="font-semibold text-brand-700 mb-2 mt-4">{t('info_section.standard_title')}</h4>
              <p className="text-stone-600 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: t('info_section.standard_desc').replace('Alm. I Ketut Bangbang Gde Rawi', '<strong>Alm. I Ketut Bangbang Gde Rawi</strong>') }} />
            </div>

            <div className="bg-stone-50 rounded-xl p-5 border border-stone-200">
              <h4 className="font-semibold text-brand-700 mb-3">{t('info_section.biblio_title')}</h4>
              <div className="text-stone-600 text-sm leading-relaxed space-y-2">
                <p>1. Kusuma, Sri Rsi Ananda. <em>Wariga Dewasa</em>. Morodadi: Denpasar. 1979.</p>
                <p>2. Ardhana, I.B.Suparta. <em>Pokok-pokok Wariga</em>. Surabaya: Paramitha. 2009.</p>
                <p>3. Rini, Ayu. <em>Astrologi Hindu</em>. Denpasar: Burat Wangi. 2012.</p>
                <p>4. Aryana, I.B.Putra Manik. <em>Tenung Wariga-Kunci Ramalan Astrologi Bali</em>. Surabaya: Paramitha. 2010.</p>
                <p>5. Arwati, Ni Made Sri. <em>Ramalan Terhadap Hari Kelahiran Manusia</em>. Denpasar. 2010.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

