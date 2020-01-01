const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/QuotesDB";

const randomTaskHandler = argv => {
  randomQuote();
};

const randomQuote = async () => {
  const client = await MongoClient.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }).catch(error => {
    console.log(error.message);
  });

  if (!client) {
    return;
  }

  try {
    const collection = await client.db().collection("Quotes");

    const count = await collection.countDocuments();

    const skipCount = Math.floor(Math.random() * count);

    // Bierzemy pierwszy element z tablic jednoelementowej
    const [quote] = await collection
      .find()
      .limit(1)
      .skip(skipCount)
      .toArray();

    console.log(quote);
  } catch (error) {
    console.log(error.message);
  } finally {
    client.close();
  }
};

module.exports = {
  command: "random",
  describe: "Display random quote from database",
  handler: randomTaskHandler,
  aliases: ["r"]
};
