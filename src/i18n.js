import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          title: 'Page generation',
          formTitle: 'QRcode informations',
          preview: 'Preview',
          previewHelp: 'The page preview will appear here once you add a qrcode image',
          downloadCta: 'Download',
          upperTextLabel: 'Upper text',
          image: {
            label: 'QRcode image',
            description: 'Click or drag-and-drop an image here',
            deleteCta: 'Delete', 
          },
          lowerText: {
            label: 'Lower text', 
          },
          nbPerLine: {
            label: 'Blocks per line: {{nbPerLine}}',
          },
          nbLines: {
            label: 'Number of lines: {{nbLines}}',
          },
        }
      },
      fr: {
        translation: {
          title: 'Génération de page',
          formTitle: 'Informations du QRcode',
          preview: 'Prévisualisation',
          previewHelp: 'La prévisualation de la page apparaîtra ici lorsqu\'une image aura été ajoutée',
          downloadCta: 'Télécharger',
          upperText: {
            label: 'Texte en haut du QRcode',
          },
          image: {
            label: 'Image du QRcode',
            description: 'Cliquez ou glisser-déposer une image sur la zone',
            deleteCta: 'Supprimer', 
          },
          lowerText: {
            label: 'Text en bas du QRcode', 
          },
          nbPerLine: {
            label: 'Nombre par ligne: {{nbPerLine}}',
          },
          nbLines: {
            label: 'Nombre de lignes: {{nbLines}}',
          },
        }
      }
    }
  });

export default i18n;