import { translate } from './translation-api';

const translateContent = async ({ lng, contentArray }) => {
  const translations = await Promise.all(
    contentArray.map(async ({ content, languageCode, id }) => {
      if (languageCode === lng || lng === 'en') {
        return {
          id,
          content: { ...content },
          languageCode: lng,
          isTranslated: true,
        };
      }
      const res = await translate({
        source: 'en',
        target: [lng],
        json: content,
        id,
      });

      if (res) {
        return res;
      }
      throw new Error(
        'translate content service: could not translate content',
        content,
      );
    }),
  );

  return translations;
};

export default translateContent;
