import { fields, createSchema, validate as _validate } from '..';

const { requiredText, topics, numberField } = fields;

const volunteer = createSchema({
  title: requiredText,
  topics: topics,
  themeKey: numberField,
});

const validate = (data) => _validate(volunteer, data);

export default validate;
