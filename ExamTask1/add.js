const myMongoClient = require("./myMongo").myMongoClient;

const addTaskHandler = argv => {
  const author = argv.author;
  const quote = argv.quote;
  const tag = argv.tag;

  if (!author) {
    console.log("Enter quote author!");
    return;
  }

  if (!quote) {
    console.log("Enter quote!");
    return;
  }

  if (tag === "") {
    console.log("Enter tag!");
    return;
  }

  const data = { author: author, quote: quote, tag: tag || "" };

  myMongoClient(data, insertQuote);
};

const insertQuote = async (collection, data) => {
  const result = await collection.insertOne(data);

  // Wypisujemy utworzony rekord
  console.log(result.ops[0]);
};

const builderHandler = yargs => {
  return yargs
    .option("author", {
      demandOption: true, // Parametr wymagany
      describe: "Author of the quote",
      type: "string",
      group: "Add options",
      requiresArg: true // Parametr musi mieć wartość po nazwie
    })
    .option("quote", {
      demandOption: true, // Parametr wymagany
      describe: "Quote to be added",
      type: "string",
      group: "Add options",
      requiresArg: true // Parametr musi mieć wartość po nazwie
    })
    .option("tag", {
      demandOption: false, // Parametr opcjonalny
      describe: "Quote tag",
      type: "string",
      group: "Add options",
      requiresArg: true // Parametr musi mieć wartość po nazwie
    });
};

module.exports = {
  command: "add",
  describe: "Adding quote to database",
  builder: builderHandler,
  handler: addTaskHandler,
  aliases: ["a"]
};

// const insertQuote = async (author, quote, tag) => {
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

//     const result = await collection.insertOne(data);

//     // Wypisujemy utworzony rekord
//     console.log(result.ops[0]);
//   } catch (error) {
//     console.log(error.message);
//   }

//   if (client) {
//     client.close();
//   }
// };
