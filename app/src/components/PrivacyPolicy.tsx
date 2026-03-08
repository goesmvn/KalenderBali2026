import { Shield, FileText, Lock, Globe, Server, UserCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function PrivacyPolicy() {
    const { t } = useTranslation();

    return (
        <div className="w-full bg-stone-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
                <div className="bg-[#c1121f] p-8 text-white relative overflow-hidden text-center sm:text-left">
                    <Shield className="absolute -right-6 -bottom-6 w-48 h-48 opacity-10" />
                    <h1 className="text-3xl font-bold tracking-tight relative z-10 flex items-center justify-center sm:justify-start gap-3">
                        <Lock className="w-8 h-8" />
                        {t('privacy.title')}
                    </h1>
                    <p className="mt-2 text-red-100 relative z-10 max-w-2xl text-sm sm:text-base">
                        {t('privacy.subtitle')}
                    </p>
                </div>

                <div className="p-6 sm:p-10 text-stone-700 space-y-8 leading-relaxed text-sm sm:text-base">
                    <section>
                        <h2 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-[#c1121f]" />
                            {t('privacy.sec1_title')}
                        </h2>
                        <p className="mb-4">
                            {t('privacy.sec1_desc1')}
                        </p>
                        <p>
                            {t('privacy.sec1_desc2')}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
                            <Server className="w-5 h-5 text-[#c1121f]" />
                            {t('privacy.sec2_title')}
                        </h2>
                        <p className="mb-4">
                            {t('privacy.sec2_desc1')}
                        </p>
                        <p className="mb-2 font-semibold">{t('privacy.sec2_sub')}</p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li>{t('privacy.sec2_list1')}</li>
                            <li>{t('privacy.sec2_list2')}</li>
                            <li>{t('privacy.sec2_list3')}</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
                            <Globe className="w-5 h-5 text-[#c1121f]" />
                            {t('privacy.sec3_title')}
                        </h2>
                        <p className="mb-4">
                            {t('privacy.sec3_desc1')}
                        </p>
                        <p>
                            {t('privacy.sec3_desc2')}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
                            <UserCheck className="w-5 h-5 text-[#c1121f]" />
                            {t('privacy.sec4_title')}
                        </h2>
                        <p className="mb-4">
                            {t('privacy.sec4_desc1')}
                        </p>
                        <p>
                            {t('privacy.sec4_desc2')}
                        </p>
                    </section>

                    <div className="border-t border-stone-200 pt-6 mt-8">
                        <p className="text-sm text-stone-500 text-center">
                            <strong>{t('privacy.updated')}</strong><br />
                            {t('privacy.contact')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
