import * as Sections from '../model';

const getSections = async ({ uniqueSlug, forPublic }) => {
  if (forPublic) {
    const sections = await Sections.getSectionsByOrgSlugForPublic(uniqueSlug);
    return sections;
  }
};

export default getSections;
