import translateAPI from './translation-api';

const translateContent = async ({ lng, contentArray }) => {
  try {
    return Promise.all(
      contentArray.map(({ content, languageCode, id }) => {
        if (languageCode === lng || lng === 'en') {
          return {
            id,
            content: { ...content },
            languageCode: lng,
            isTranslated: true,
          };
        }
        try {
          return translateAPI({
            source: 'en',
            target: [lng],
            json: content,
            id,
          });
        } catch (e) {
          // eslint-disable-next-line no-console
          console.warn(
            `translate-content use case: Could not translate ${content} to ${lng}`,
            e,
          );
          throw e;
        }
      }),
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Content error: ${lng} cannot be translated`, error);
    return contentArray;
  }
};

export default translateContent;
