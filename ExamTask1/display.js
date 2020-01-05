const myMongoClient = require("./myMongo").myMongoClient;

const addTaskHandler = argv => {
  const id = argv.id;
  const tag = argv.tag;

  if (id === "") {
    console.log("Enter quote id!");
    return;
  }

  if (tag === "") {
    console.log("Enter quotes tag!");
    return;
  }

  if (id) {
    myMongoClient({ _id: id }, displayData);
  } else if (tag) {
    myMongoClient({ tag: tag }, displayData);
  } else {
    myMongoClient({}, displayData);
  }
};

const displayData = async (collection, filter) => {
  const result = await collection.find(filter);

  const count = await result.count();

  if (!count) {
    console.log("Data not found!");
    return;
  }

  result.forEach(quote => {
    console.log(quote);
  });
};

const builderHandler = yargs => {
  return yargs
    .option("id", {
      demandOption: false, // Parametr opcjonalny
      describe: "Displayed quote id",
      type: "string",
      group: "Display options",
      requiresArg: true, // Parametr musi mieć wartość po nazwie
      conflicts: ["all", "tag"] // Jeśli ten parametr jest ustawiony, to nie może być pozostałych
    })
    .option("all", {
      demandOption: false, // Parametr opcjonalny
      describe: "Display all quotes from database [default]",
      type: "string",
      group: "Display options",
      requiresArg: false,
      conflicts: ["id", "tag"] // Jeśli ten parametr jest ustawiony, to nie może być pozostałych
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
