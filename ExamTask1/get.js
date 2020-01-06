const myMongoClient = require("./myMongo").myMongoClient;
const axios = require("axios");
const url =
  "http://ec2-18-217-240-10.us-east-2.compute.amazonaws.com/node/quotes.php";

const getTaskHandler = argv => {
  let data = { add: "add" in argv };

  myMongoClient(data, getData);
};

const getData = async (collection, data) => {
  const quote = {};
  const response = await axios.get(url);

  quote.author = response.data.author;
  quote.quote = response.data.quote;

  if (!data.add) {
    // Tylko wyświetlamy w konsoli
    console.log(quote);
  } else {
    // Dodajemy do bazy
    quote.tag = "";
    quote.randomDisplayCount = 0;

    const result = await collection.insertOne(quote);

    // Wypisujemy utworzony rekord
    console.log(result.ops[0]);
  }
};

const builderHandler = yargs => {
  return yargs.option("add", {
    demandOption: false, // Parametr opcjonalny
    describe: "Add quote to database",
    type: "string",
    group: "Get options",
    requiresArg: false // Parametr nie musi mieć wartości po nazwie
  });
};

module.exports = {
  command: "get",
  describe: "Ger random quote from endpoint",
  builder: builderHandler,
  handler: getTaskHandler,
  aliases: ["g"]
};
