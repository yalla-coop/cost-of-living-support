import { AWSTranslateJSON } from 'aws-translate-json';
import config from '../../config';
import { removeNullsAndEmptyArraysAndObjects } from '../../helpers';

const { awsAccessKeyId, awsSecretAccessKey, awsRegion } = config.aws;

const awsConfig = {
  accessKeyId: awsAccessKeyId,
  secretAccessKey: awsSecretAccessKey,
  region: awsRegion,
};

const translateAPI = async ({ source, target, json, id }) => {
  const { translateJSON } = new AWSTranslateJSON(awsConfig, source, target);
  const value = await translateJSON(removeNullsAndEmptyArraysAndObjects(json));
  return { id, content: { ...value[target] }, languageCode: target[0] };
};

export default translateAPI;
