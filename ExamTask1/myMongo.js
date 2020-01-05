const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/QuotesDB";
const dbName = "Quotes";
const connectOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true
};

const myMongoClient = async (data, operation) => {
  let client;

  try {
    client = await MongoClient.connect(url, connectOptions);

    const collection = await client.db().collection(dbName);

    await operation(collection, data);
  } catch (error) {
    console.log(error.message);
  }

  if (client) {
    client.close();
  }
};

module.exports = { myMongoClient };
