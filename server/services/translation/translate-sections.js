import { translate } from './translation-api';

const translateSections = async ({ lng, sections }) => {
  const translations = await Promise.all(
    sections.map(async ({ title, languageCode, id }) => {
      if (languageCode === lng || lng === 'en') {
        return {
          id,
          title,
          languageCode: lng,
          isTranslated: true,
        };
      }
      const res = await translate({
        source: 'en',
        target: [lng],
        json: { title },
        id,
      });

      return { ...res, title: res.content.title };
    }),
  );

  return translations;
};

export default translateSections;
