import { translateText, translateJSON } from './../services/translation/translation-api'
// import { languageCodes } from '../constants/data-type';

const transformString = (str, inputOrOutput) => {
  if (inputOrOutput === "input") {
    str = JSON.stringify(str);
    str = str.replace(/"/g, "!");
    str = str.replace(/,/g, "|");
    return str;
  } else {
    str = str.replace(/!/g, `"`);
    str = str.replaceAll("|", ",");
    str = str.slice(1, -1);
    str = JSON.parse("[" + str + "]");
    return str
  }
};

function extractValues(obj) {
  let values = [];
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === "object") {
        values = values.concat(extractValues(obj[key]));
      } else {
        values.push(obj[key]);
      }
    }
  }
  return values;
}

function reapplyValues(arr, obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === "object") {
        reapplyValues(arr, obj[key]);
      } else {
        obj[key] = arr.shift();
      }
    }
  }
  return obj;
}

describe("translated object", () => {
  const sourceLang = "en";
  const source = {
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


  // const languages = Object.entries(languageCodes).map(([country, code]) => [country, code])
  // languages.forEach(([country, code]) => {
  it(`should return an object with the original keys intact --> country`, async () => {
    const translatedObj = await translateJSON({
      obj : source,
      targetLang: 'ar',
      sourceLang
    });
    

    console.log(translatedObj, 'TranslateJSON Function $$$$$$$$$$$$$$$')
    let original = transformString(extractValues(source), "input");
    let translation = await translateText({
      text: original,
      targetLang: 'ar',
      sourceLang,
    });

    translation = transformString(translation)
    translation = translation.map((v) => v.slice(1))
    let _translation = reapplyValues(translation, source)
    console.log(_translation, 'New Function @@@@@@@@@@@@@@@@')
    expect(Object.keys(_translation)).toEqual(Object.keys(source))
    // expect(Object.keys(_translation)).toMatchObject(Object.keys(translatedObj['ar']))
    // expect(Object.values(_translation)).toMatchObject(Object.values(translatedObj['ar']))
  })
})
