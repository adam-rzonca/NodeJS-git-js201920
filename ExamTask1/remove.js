const myMongoClient = require("./myMongo").myMongoClient;
const ObjectID = require("./myMongo").ObjectID;

const removeTaskHandler = argv => {
  let id = argv.id;

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

  const query = { _id: id };

  myMongoClient(query, removeData);
};

const removeData = async (collection, query) => {
  let result = collection.find(query);

  let count = await result.count();

  if (!count) {
    console.log("Data not found!");
    return;
  }

  result = await collection.deleteOne(query);
  count = result.deletedCount;

  console.log(count, count === 1 ? "record" : "records", "deleted!");
};

const builderHandler = yargs => {
  return yargs.option("id", {
    demandOption: true, // Parametr wymagany
    describe: "Quote id for remove",
    type: "string",
    group: "Remove options",
    requiresArg: true // Parametr musi mieć wartość po nazwie
  });
};

module.exports = {
  command: "remove",
  describe: "Remove quote from database",
  builder: builderHandler,
  handler: removeTaskHandler,
  aliases: ["rm"]
};
