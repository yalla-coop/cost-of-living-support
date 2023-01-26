import { translate } from './../services/translation/translation-api'
import { languageCodes } from '../constants/data-type';

const values = (original, translation) => {
  const updated = Object.values(translation);
  return Object.entries(original).map(([key, value], index) => [
    original,
    key,
    value,
    updated[index],
  ]);
};

const replaceValues = (original, translation) => {
  values(original, translation).forEach(
    ([_original, key, origValue, transValue]) => {
      typeof origValue === "object"
        ? replaceValues(origValue, transValue)
        : (_original[key] = transValue);
    },
  );
  return original;
};

describe("tranlated object", () => {
  const sourceLang = "en";
  const original = {
    buttons: {
      readMore: "Read more",
      seeAdvice: "See advice",
      goBack: "Go back",
      stuckTalkToSomeOne: "Stuck? Talk to someone",
      accessibility: "Accessibility",
      decreaseTextSize: "- Decrease text size",
      increaseTextSize: "+ Increase text size",
      seeMore: "See more",
      seeLess: "See less",
      addATip: "Add a tip",
      addAnotherTip: "Add another tip",
      addColourOverlay: "Add colour overlay",
    },
    words: { and: "and" },
    placeholders: { select: "Select..." },
    heading: {
      costOfLivingHelper: "Cost of Living Helper",
      shareThisPage: "Share this page",
      helpfulResources: "Helpful resources",
    },
    section: {
      subSection: {
        description:
          "So we can show you the best information, which one of these best describes you?",
      },
      changeLanguage: {
        title: "Change language",
        placeholder: "Search",
      },
    },
  };

  const languages = Object.entries(languageCodes).map(([country, code]) => [country, code])

  languages.forEach(([country, code]) => {
    it(`should return an object with the original keys intact --> ${country}`, async () => {
      const translation = await translate({
        json: original,
        target: [code],
        source: sourceLang,
        id: '2B42DEBB-53AC-4B59-83CC-4EE835363AAF'
      });

      const _translation = replaceValues(structuredClone(original), translation.content)
      expect(Object.keys(_translation)).toEqual(Object.keys(original))
    })
  })

  // it('should return an object with the original keys intact --- ARABIC', async () => {
  //   const translation = await translate({
  //     json: original,
  //     target: ['ar'],
  //     source: sourceLang,
  //     id: '2B42DEBB-53AC-4B59-83CC-4EE835363AAF'
  //   });

  //   const _translation = replaceValues(structuredClone(original), translation.content)
  //   expect(Object.keys(_translation)).toEqual(Object.keys(original))
  // })

  // it('should return an object with the original keys intact --- ARABIC', async () => {
  //   const translation = await translate({
  //     json: original,
  //     target: ['ar'],
  //     source: sourceLang,
  //     id: '2B42DEBB-53AC-4B59-83CC-4EE835363AAF'
  //   });

  //   const _translation = replaceValues(structuredClone(original), translation.content)
  //   expect(Object.keys(_translation)).toEqual(Object.keys(original))
  // })
})
