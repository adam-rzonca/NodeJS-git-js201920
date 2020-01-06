const myMongoClient = require("./myMongo").myMongoClient;
const ObjectID = require("./myMongo").ObjectID;

const displayTaskHandler = argv => {
  let id = argv.id;
  const tag = argv.tag;
  let query;

  if ("id" in argv) {
    if (id === "") {
      console.log("Enter quote id!");
      return;
    }

    // Sprawdzamy, czy id ma odpowiedni format
    try {
      id = ObjectID(id);
    } catch (error) {
      console.log(error.message);
      return;
    }

    query = { _id: id };
  } else if ("tag" in argv) {
    query = { tag: tag };
  } else {
    query = {};
  }

  myMongoClient(query, displayData);
};

const displayData = async (collection, query) => {
  const result = collection.find(query);

  const count = await result.count();

  if (!count) {
    console.log("Data not found!");
    return;
  }

  await result.forEach(quote => {
    console.log(quote);
  });

  console.log(count, count === 1 ? "record" : "records", "found!");

  // const result = await collection.find(query);

  // const count = await result.count();

  // if (!count) {
  //   console.log("Data not found!");
  //   return;
  // }

  // await result.forEach(quote => {
  //   console.log(quote);
  // });

  // console.log(count, count === 1 ? "record" : "records", "found!");
};

const builderHandler = yargs => {
  return yargs
    .option("all", {
      demandOption: false, // Parametr opcjonalny
      describe: "Display all quotes from database [default]",
      type: "string",
      group: "Display options",
      requiresArg: false,
      conflicts: ["id", "tag"] // Jeśli ten parametr jest ustawiony, to nie może być pozostałych
    })
    .option("id", {
      demandOption: false, // Parametr opcjonalny
      describe: "Displayed quote id",
      type: "string",
      group: "Display options",
      requiresArg: true, // Parametr musi mieć wartość po nazwie
      conflicts: ["all", "tag"] // Jeśli ten parametr jest ustawiony, to nie może być pozostałych
    })
    .option("tag", {
      demandOption: false, // Parametr opcjonalny
      describe: "Display quotes with tag",
      type: "string",
      group: "Display options",
      requiresArg: true, // Parametr musi mieć wartość po nazwie
      conflicts: ["id", "all"] // Jeśli ten parametr jest ustawiony, to nie może być pozostałych
    });
};

module.exports = {
  command: "display",
  describe: "Display quote from database",
  builder: builderHandler,
  handler: displayTaskHandler,
  aliases: ["d"]
};
