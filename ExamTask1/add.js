const addTaskHandler = argv => {
  //console.log(argv);
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

  console.log(author, quote, tag);
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
      demandOption: true,
      describe: "Quote to be added",
      type: "string",
      group: "Add options",
      requiresArg: true
    })
    .option("tag", {
      demandOption: false, // Parametr opcjonalny
      describe: "Quote tag",
      type: "string",
      group: "Add options",
      requiresArg: true
    });
};

module.exports = {
  command: "add",
  describe: "Adding quote to database",
  builder: builderHandler,
  handler: addTaskHandler,
  aliases: ["a"]
};
