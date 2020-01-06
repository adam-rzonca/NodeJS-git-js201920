const myMongoClient = require("./myMongo").myMongoClient;
const ObjectID = require("./myMongo").ObjectID;

const randomTaskHandler = argv => {
  const data = {};

  myMongoClient(data, randomQuote);
};

const randomQuote = async collection => {
  let count = await collection.countDocuments();

  const skipCount = Math.floor(Math.random() * count);

  // Bierzemy pierwszy element z tablic jednoelementowej
  const [quote] = await collection
    .find()
    .limit(1)
    .skip(skipCount)
    .toArray();

  if (!quote) {
    console.log("Data not found!");
    return;
  }

  const id = ObjectID(quote._id);
  const randomDisplayCount = quote.randomDisplayCount + 1;

  const query = { _id: id };
  const data = { randomDisplayCount: randomDisplayCount };

  // Aktualizujemy licznik randomowych wyświetleń
  let result = await collection.updateOne(query, { $set: data });

  // I dopiero wyświetlamy
  result = await collection.findOne(query);

  console.log(result);
};

module.exports = {
  command: "random",
  describe: "Display random quote from database",
  handler: randomTaskHandler,
  aliases: ["r"]
};
