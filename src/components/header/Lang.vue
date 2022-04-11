<script setup lang="ts">
import { getLang, setLang, LOCALE_VAR } from 'uc-lib';
import { isNil } from 'lodash-es';
import { language } from '@/settings';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { changeElPlusLanguage } from '@/hooks/useLocale';

const { locale } = useI18n({ useScope: 'global' });

const lang = ref(getLang() || LOCALE_VAR.ZH);
const currentLanguageText = computed(() => {
    const langConfig = language.find((item) => item.key === lang.value);
    return !isNil(langConfig) ? langConfig.text : '中文';
});

const toggleLang = (langType: string) => {
    locale.value = langType;
    lang.value = langType;
    changeElPlusLanguage(langType);
    setLang(langType);
};
</script>

<template>
    <el-dropdown>
        <span>{{ currentLanguageText }}</span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item v-for="la in language" :key="la.key" @click="toggleLang(la.key)">
                    {{ la.text }}
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>
