const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

const url = "mongodb://localhost:27017/QuotesDB";
const collectionName = "Quotes";
const connectOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true
};

const myMongoClient = async (callbackData, operation) => {
  let client;

  try {
    client = await MongoClient.connect(url, connectOptions);

    const collection = await client.db().collection(collectionName);

    await operation(collection, callbackData);
  } catch (error) {
    console.log(error.message);
  }

  if (client) {
    client.close();
  }
};

module.exports = { myMongoClient, ObjectID };
