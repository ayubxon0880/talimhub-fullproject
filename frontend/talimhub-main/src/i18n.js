import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend'
const lang = localStorage.getItem('i18nextLng')
i18next
    .use(LanguageDetector)
    .use(initReactI18next).use(Backend)
    .init({
        debug: false,
        returnObjects: true,
        fallbackLng: lang ? lang : 'en',
        lng: lang ? lang : 'en',
    });