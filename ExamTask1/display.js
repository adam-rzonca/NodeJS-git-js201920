const myMongoClient = require("./myMongo").myMongoClient;
const ObjectID = require("./myMongo").ObjectID;

const addTaskHandler = argv => {
  let id = argv.id;
  const tag = argv.tag;
  let filter;

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

    filter = { _id: id };
  } else if ("tag" in argv) {
    filter = { tag: tag };
  } else {
    filter = {};
  }

  myMongoClient(filter, displayData);
};

const displayData = async (collection, filter) => {
  const result = await collection.find(filter);

  const count = await result.count();

  if (!count) {
    console.log("Data not found!");
    return;
  }

  await result.forEach(quote => {
    console.log(quote);
  });

  await console.log(count, count === 1 ? "record" : "records", "found!");
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
  handler: addTaskHandler,
  aliases: ["d"]
};
