import * as Sections from '../use-cases';

const getSection = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { lng = 'en', forPublic } = req.query;
    const { role } = req.user || {};
    const section = await Sections.getSection({
      id,
      forPublic: JSON.parse(forPublic || null),
      role,
      lng,
    });

    res.json(section);
  } catch (error) {
    next(error);
  }
};

export default getSection;
