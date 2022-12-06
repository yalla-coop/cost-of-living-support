import { AWSTranslateJSON } from 'aws-translate-json';
import config from '../../config';
import { removeNullsAndEmptyArraysAndObjects } from '../../helpers';

const { awsAccessKeyId, awsSecretAccessKey, awsRegion } = config.aws;

const awsConfig = {
  accessKeyId: awsAccessKeyId,
  secretAccessKey: awsSecretAccessKey,
  region: awsRegion,
};

const translate = async ({ source, target, json, id }) => {
  if (!source || !target || !json || !id) {
    throw new Error('translation api: missing parameters');
  }
  console.log('translation API target :>> ', target);
  console.log('translation API json :>> ', json);
  console.log(
    'translate API removeNullsAndEmptyArraysAndObjects(json) :>> ',
    removeNullsAndEmptyArraysAndObjects(json),
  );
  const AWSTranslateJSONInst = new AWSTranslateJSON(awsConfig, source, target);

  if (AWSTranslateJSONInst && AWSTranslateJSONInst.translateJSON) {
    const value = await AWSTranslateJSONInst.translateJSON(
      removeNullsAndEmptyArraysAndObjects(json),
    );
    console.log('translation API value :>> ', value);
    const res = { id, content: { ...value[target] }, languageCode: target[0] };
    return res;
  }
  throw new Error('translation api: could no success calling AWSTranslateJSON');

  // log error
  // find a wait/retry strategy
  // error handling for not letting the app crash
};

export { translate };
