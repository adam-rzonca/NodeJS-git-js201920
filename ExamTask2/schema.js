const Joi = require("joi");

const myJoiUsername = Joi.string();
const myJoiCategory = Joi.string();
const myJoiCategories = Joi.array();
const myJoiText = Joi.string();
const myJoiPrice = Joi.number().greater(0).precision(2);
const myJoiDate = Joi.date();

const adPostSchema = Joi.object().keys({
  username: myJoiUsername.required(),
  categories: myJoiCategories.items(myJoiCategory.required()),
  text: myJoiText.required(),
  price: myJoiPrice,
});

const adPutSchema = Joi.object().keys({
  categories: myJoiCategories.items(myJoiCategory.required()),
  text: myJoiText.required(),
  price: myJoiPrice,
});

const adQuerySchema = Joi.object().keys({
  username: myJoiUsername,
  categories: myJoiCategories.items(myJoiCategory),
  text: myJoiText.max(50), // max 50 znaków
  price: myJoiPrice,
  add_time: myJoiDate, // data
});

module.exports = { adPostSchema, adPutSchema, adQuerySchema };
