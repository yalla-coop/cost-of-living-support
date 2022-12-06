import * as Translation from '../model';
import translateContent from '../../../services/translation/translate-content';

const getCommon = async ({ lng }) => {
  const common = await Translation.getCommon(lng);

  const commonT = await translateContent({
    lng,
    contentArray: common,
  });

  await Promise.all(
    commonT.map((c) => {
      if (!c.isTranslated) {
        return Translation.createCommonI18n({
          commonId: c.id,
          languageCode: c.languageCode,
          content: c.content,
        });
      }
      return Promise.resolve();
    }),
  );

  return commonT;
};

export default getCommon;
