import * as Sections from '../use-cases';

const getSections = async (req, res, next) => {
  try {
    const { uniqueSlug, forPublic } = req.query;
    const sections = await Sections.getSections({ uniqueSlug, forPublic });

    res.json(sections);
  } catch (error) {
    next(error);
  }
};

export default getSections;
