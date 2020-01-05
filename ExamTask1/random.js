const myMongoClient = require("./myMongo").myMongoClient;

const randomTaskHandler = argv => {
  const data = {};

  myMongoClient(data, randomQuote);
};

const randomQuote = async collection => {
  const count = await collection.countDocuments();

  const skipCount = Math.floor(Math.random() * count);

  // Bierzemy pierwszy element z tablic jednoelementowej
  const [quote] = await collection
    .find()
    .limit(1)
    .skip(skipCount)
    .toArray();

  console.log(quote);
};

module.exports = {
  command: "random",
  describe: "Display random quote from database",
  handler: randomTaskHandler,
  aliases: ["r"]
};

// const randomQuote = async () => {
//   const url = "mongodb://localhost:27017/QuotesDB";
//   const dbName = "Quotes";
//   const connectOptions = {
//     useUnifiedTopology: true,
//     useNewUrlParser: true
//   };

//   let client;

//   try {
//     client = await MongoClient.connect(url, connectOptions);

//     const collection = await client.db().collection(dbName);

//     const count = await collection.countDocuments();

//     const skipCount = Math.floor(Math.random() * count);

//     // Bierzemy pierwszy element z tablic jednoelementowej
//     const [quote] = await collection
//       .find()
//       .limit(1)
//       .skip(skipCount)
//       .toArray();

//     console.log(quote);
//   } catch (error) {
//     console.log(error.message);
//   }

//   if (client) {
//     client.close();
//   }
// };
