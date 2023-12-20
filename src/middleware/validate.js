const Joi = require("joi");
const enums = require("../json/enums.json");

const pick = (object, keys) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key];
    }
    return obj;
  }, {});

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ["params", "query", "body"]);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" }, abortEarly: false })
    .validate(object);

  if (error) {
    const message = error.details.map((details) => details.message).join(", ");
    return res.status(enums.HTTP_CODES.UNAUTHORIZED).json({ error: message });
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;
