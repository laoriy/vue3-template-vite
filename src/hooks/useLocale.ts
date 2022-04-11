import { LOCALE_VAR, getLang } from 'uc-lib';
import { computed, ref } from 'vue';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import en from 'element-plus/lib/locale/lang/en';

const localeString = ref(getLang() || LOCALE_VAR.ZH);
/**
 * 修改elementPlus语言
 * @param lang string
 */
export const changeElPlusLanguage = (lang: string) => {
    localeString.value = lang;
};

export const locale = computed(() => {
    if (localeString.value === LOCALE_VAR.EN) {
        return en;
    }
    return zhCn;
});
