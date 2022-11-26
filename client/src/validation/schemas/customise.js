import { fields, createSchema, validate as _validate } from '..';

const { requiredText, hexColor } = fields;

const schema = createSchema({
  logoFile: requiredText,
  primaryBgMain: hexColor,
  secondaryBgMain: hexColor,
  tertiaryBgMain: hexColor,
  quartenaryBgMain: hexColor,
  quinaryBgMain: hexColor,
  primaryTextMain: hexColor,
  secondaryTextMain: hexColor,
  tertiaryTextMain: hexColor,
  quartenaryTextMain: hexColor,
  quinaryTextMain: hexColor,
});

const validate = (data) => {
  return _validate(schema, data);
};

export default validate;
