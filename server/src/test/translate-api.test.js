import getCommon from '../modules/translations/use-cases/get-common'
import { content } from '../constants/data-type'
import { Router } from 'express';

import { translateText, translateJSON, translate } from './../services/translation/translation-api'

describe("translateText", () => {
  const text = "hello"
  const sourceLang = "en";

  it("should correctly translate the string of the input into French", async () => {
    const translatedObj = await translateText({
      text,
      targetLang: 'fr',
      sourceLang
    });

    expect(translatedObj).toEqual('bonjour')
  });

  it("should correctly translate the string of the input into German", async () => {
    const translatedObj = await translateText({
      text,
      targetLang: 'de',
      sourceLang
    });

    expect(translatedObj).toEqual('hallo')
  });

});

describe("translateJSON", () => {
  const obj = {
    key1: "Hello",
    key2: {
      subKey1: "World",
      subKey2: "Goodbye"
    }
  };
  const sourceLang = "en";

  it("should correctly translate the object input into French", async () => {
    const targetLang = 'fr'
    const translatedObj = await translateJSON({
      obj,
      targetLang,
      sourceLang
    });

    expect(translatedObj[targetLang].key1).toEqual('Bonjour')
    expect(translatedObj[targetLang].key2.subKey1).toEqual('Monde')
    expect(translatedObj[targetLang].key2.subKey2).toEqual('Au revoir')
  });

  it("should correctly translate the object input into German", async () => {
    const targetLang = 'de'
    const translatedObj = await translateJSON({
      obj,
      targetLang,
      sourceLang
    });

    expect(translatedObj[targetLang].key1).toEqual('Hallo')
    expect(translatedObj[targetLang].key2.subKey1).toEqual('Welt')
    expect(translatedObj[targetLang].key2.subKey2).toEqual('Auf Wiedersehen')
  });

});
describe("translate", () => {
  const obj = {
    key1: "Hello",
    key2: {
      subKey1: "World",
      subKey2: "Goodbye"
    }
  };
  const sourceLang = "en";

  it("should correctly translate the object input into French", async () => {
    const targetLang = 'fr'
    const translatedObj = await translate({
      id: 1,
      json: obj,
      target: [targetLang],
      source: sourceLang
    });

    expect(translatedObj.content.key1).toEqual('Bonjour')
    expect(translatedObj.content.key2.subKey1).toEqual('Monde')
    expect(translatedObj.content.key2.subKey2).toEqual('Au revoir')
  });

  it("should correctly translate the object input into German", async () => {
    const targetLang = 'de'
    const translatedObj = await translate({
      id: 2,
      json: obj,
      target: [targetLang],
      source: sourceLang
    });

    expect(translatedObj.content.key1).toEqual('Hallo')
    expect(translatedObj.content.key2.subKey1).toEqual('Welt')
    expect(translatedObj.content.key2.subKey2).toEqual('Auf Wiedersehen')
  });
});

const router = Router();

test('Fetch common texts and compare with static object', async () => {
  const response = await getCommon({ lng: 'en' });
  const { content: _content } = response[0]
  expect(_content).toEqual(content);
});
