const myMongoClient = require("./myMongo").myMongoClient;
const ObjectID = require("./myMongo").ObjectID;

const editTaskHandler = argv => {
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
  const author = argv.author;
  const quote = argv.quote;
  const tag = argv.tag;

  let newValues = {};
  if (author) newValues.author = author;
  if (quote) newValues.quote = quote;
  if (tag) newValues.tag = tag;

  console.log(newValues);

  const data = { query: query, newValues: newValues };

  myMongoClient(data, editData);
};

const editData = async (collection, data) => {
  let result = collection.find(data.query);

  let count = await result.count();

  if (!count) {
    console.log("Data not found!");
    return;
  }

  result = await collection.updateOne(data.query, { $set: data.newValues });
  count = result.modifiedCount;

  console.log(count, count === 1 ? "record" : "records", "modified!");
};

const builderHandler = yargs => {
  return yargs
    .option("id", {
      demandOption: true, // Parametr wymagany
      describe: "Quote id for edit",
      type: "string",
      group: "Edit options",
      requiresArg: true // Parametr musi mieć wartość po nazwie
    })
    .option("author", {
      demandOption: false, // Parametr opcjonalny
      describe: "New author of the quote",
      type: "string",
      group: "Edit options",
      requiresArg: true // Parametr musi mieć wartość po nazwie
    })
    .option("quote", {
      demandOption: false, // Parametr opcjonalny
      describe: "Quote to be edited",
      type: "string",
      group: "Edit options",
      requiresArg: true // Parametr musi mieć wartość po nazwie
    })
    .option("tag", {
      demandOption: false, // Parametr opcjonalny
      describe: "New quote tag",
      type: "string",
      group: "Edit options",
      requiresArg: true // Parametr musi mieć wartość po nazwie
    });
};

module.exports = {
  command: "edit",
  describe: "Edit quote",
  builder: builderHandler,
  handler: editTaskHandler,
  aliases: ["e"]
};
