import { translate } from './translationApi';

const translateContent = async ({ lng, contentArray }) => {
  const translations = await Promise.all(
    contentArray.map(({ content, languageCode, id }) => {
      if (languageCode === lng || lng === 'en') {
        console.log(` ========= ${lng} EXISTS IN DATABASE ========= `);
        return {
          id,
          content: { ...content },
          languageCode: lng,
          isTranslated: true,
        };
      }
      console.log(` ========= TRANSLATING ${lng}... ========= `);
      console.log(content, '======== DATA ========');
      return translate({ source: 'en', target: [lng], json: content, id });
    }),
  );

  return translations;
};

export default translateContent;
