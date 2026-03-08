import { FileText, Scale, AlertTriangle, BookOpen, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function TermsOfService() {
    const { t } = useTranslation();

    return (
        <div className="w-full bg-stone-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
                <div className="bg-[#c1121f] p-8 text-white relative overflow-hidden text-center sm:text-left">
                    <Scale className="absolute -right-6 -bottom-6 w-48 h-48 opacity-10" />
                    <h1 className="text-3xl font-bold tracking-tight relative z-10 flex items-center justify-center sm:justify-start gap-3">
                        <FileText className="w-8 h-8" />
                        {t('terms.title')}
                    </h1>
                    <p className="mt-2 text-red-100 relative z-10 max-w-2xl text-sm sm:text-base">
                        {t('terms.subtitle')}
                    </p>
                </div>

                <div className="p-6 sm:p-10 text-stone-700 space-y-8 leading-relaxed text-sm sm:text-base">
                    <section>
                        <h2 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-[#c1121f]" />
                            {t('terms.sec1_title')}
                        </h2>
                        <p className="mb-4">
                            <span dangerouslySetInnerHTML={{ __html: t('terms.sec1_desc') }} />
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-[#c1121f]" />
                            {t('terms.sec2_title')}
                        </h2>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li><span dangerouslySetInnerHTML={{ __html: t('terms.sec2_list1') }} /></li>
                            <li><span dangerouslySetInnerHTML={{ __html: t('terms.sec2_list2') }} /></li>
                            <li><span dangerouslySetInnerHTML={{ __html: t('terms.sec2_list3') }} /></li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
                            <Scale className="w-5 h-5 text-[#c1121f]" />
                            {t('terms.sec3_title')}
                        </h2>
                        <p className="mb-4">
                            {t('terms.sec3_desc1')}
                        </p>
                        <p className="mb-4">
                            {t('terms.sec3_desc2')}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-[#c1121f]" />
                            {t('terms.sec4_title')}
                        </h2>
                        <p className="mb-4">
                            {t('terms.sec4_desc')}
                        </p>
                    </section>

                    <div className="border-t border-stone-200 pt-6 mt-8">
                        <p className="text-sm text-stone-500 text-center">
                            {t('terms.updated')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
