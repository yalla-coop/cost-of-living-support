import { AWSTranslateJSON } from 'aws-translate-json';

const awsConfig = {
  // config goes here
};

const translate = async ({ source, target, json, id }) => {
  console.log(json, 'JSON------');
  const { translateJSON } = new AWSTranslateJSON(awsConfig, source, target);
  const value = await translateJSON(json);
  const res = { id, content: { ...value[target] }, languageCode: target[0] };
  return res;
};

export { translate };
