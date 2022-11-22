import * as Common from '../model';

const getCommon = async ({ lang }) => {
  const common = await Common.getCommon(lang);

  return common;
};

export default getCommon;
