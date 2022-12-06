import translateAPI from './translation-api';

const translateSections = async ({ lng, sections }) => {
  try {
    return await Promise.all(
      sections.map(async (section) => {
        const { title, languageCode, id } = section;
        if (languageCode === lng || lng === 'en') {
          return {
            ...section,
            languageCode: lng,
            isTranslated: true,
          };
        }
        const res = await translateAPI({
          source: 'en',
          target: [lng],
          json: { title },
          id,
        });

        return { ...section, title: res.content.title, languageCode: lng };
      }),
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Section error: ${lng} cannot be translated`, error);
    return sections;
  }
};

export default translateSections;
