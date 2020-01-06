const addCommand = require("./add");
const randomCommand = require("./random");
const displayCommand = require("./display");
const removeCommand = require("./remove");
const editCommand = require("./edit");
const getCommand = require("./get");

require("yargs")
  .usage("Usage: $0 <command>")
  .command(addCommand)
  .command(displayCommand)
  .command(editCommand)
  .command(getCommand)
  .command(randomCommand)
  .command(removeCommand)
  .demandCommand() // Jeśli nie podamy żadnej komendy, wyświetli nam Usage i Help
  .strict() // Nie dopuszczamy parametrów innych, niż wymagane przez komendę
  .help().argv;
