import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationBG from './locales/bg/translation.json';
import translationEN from './locales/en/translation.json';


const resources = {
    bg: {
        translation: translationBG
    },
    en: {
        translation: translationEN
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en', // default language
        fallbackLng: 'bg', // fallback language
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });


export default i18n;