import { createI18n } from 'vue-i18n'; // https://vue-i18n.intlify.dev/
// 项目语言变量
import localeEn from '@/locale/lang/en';
import localeZh from '@/locale/lang/zh';
import { LOCALE_VAR, getLang } from 'uc-lib';

const messages = {
    [LOCALE_VAR.EN]: {
        ...localeEn,
    },
    [LOCALE_VAR.ZH]: {
        ...localeZh,
    },
};

const i18n = createI18n({
    legacy: false,
    locale: getLang() || LOCALE_VAR.ZH,
    messages,
    fallbackLocale: LOCALE_VAR.ZH,
    globalInjection: true,
});

export default i18n;
