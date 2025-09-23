import i18n from 'i18next';
import { initReactI18next }  from 'react-i18next';
import pt from './locales/pt-br.json';
import en from './locales/en-us.json';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    'en-US': {translation: en},
    'pt-BR': {translation: pt}
};

i18n    
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en-US',
        detection: {
        order: ['navigator'],
        caches: ['localStorage', 'cookie']
        },
        interpolation: {
            escapeValue: false
        }
    }).then(() => {
    document.documentElement.lang = i18n.language;

    i18n.on('languageChanged', (lng) => {
      document.documentElement.lang = lng;
    });
  });

window.i18n = i18n;

export default i18n;