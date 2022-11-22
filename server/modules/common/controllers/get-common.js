import * as Common from '../use-cases';

const getCommon = async (req, res, next) => {
  try {
    console.log('Common controller running');
    const { lang } = req.query;
    const common = await Common.getCommon({ lang });

    res.json(common);
  } catch (error) {
    next(error);
  }
};

export default getCommon;
