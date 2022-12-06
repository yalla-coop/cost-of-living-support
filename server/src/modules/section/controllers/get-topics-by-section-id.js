import * as Sections from '../use-cases';

const getTopicsBySectionId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { lng, forPublic } = req.query;

    const topics = await Sections.getTopicsBySectionId({
      id,
      lng,
      forPublic: JSON.parse(forPublic || null),
    });

    res.json(topics);
  } catch (error) {
    console.log('Get topics by section id controller error:', error);
    next(error);
  }
};

export default getTopicsBySectionId;
