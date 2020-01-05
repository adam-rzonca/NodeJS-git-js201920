const myMongoClient = require("./myMongo").myMongoClient;
const ObjectID = require("./myMongo").ObjectID;

const addTaskHandler = argv => {
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

  const filter = { _id: id };

  myMongoClient(filter, removeData);
};

const removeData = async (collection, filter) => {
  const result = await collection.find(filter);

  const count = await result.count();

  if (!count) {
    console.log("Data not found!");
    return;
  }

  await collection.deleteOne(filter);

  await console.log("1 record deleted!");
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
  handler: addTaskHandler,
  aliases: ["rm"]
};
