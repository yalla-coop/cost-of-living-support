import { AWSTranslateJSON } from 'aws-translate-json';

const awsConfig = {
  // accessKeyId: process.env.AWS_TRANSLATE_ACCESS_KEY_ID,
  // secretAccessKey: process.env.AWS_TRANSLATE_SECRET_ACCESS_KEY,
  // region: process.env.AWS_TRANSLATE_REGION,
};

const translate = async ({ source, target, json, id }) => {
  const { translateJSON } = new AWSTranslateJSON(awsConfig, source, target);
  const value = await translateJSON(json);
  const res = { id, content: { ...value[target] }, languageCode: target[0] };
  return res;
};

export { translate };
