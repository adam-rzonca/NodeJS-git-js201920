const addCommand = require("./add");
const randomCommand = require("./random");
const displayCommand = require("./display");

require("yargs")
  .usage("Usage: $0 <command>")
  .command(addCommand)
  .command(randomCommand)
  .command(displayCommand)
  .demandCommand() // Jeśli nie podamy żadnej komendy, wyświetli nam Usage i Help
  .strict() // Nie dopuszczamy parametrów innych, niż wymagane przez komendę
  .help().argv;
