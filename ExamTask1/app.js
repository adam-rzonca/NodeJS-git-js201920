const addCommand = require("./add");
const randomCommand = require("./random");

require("yargs")
  .usage("Usage: $0 <command>")
  .command(addCommand)
  .command(randomCommand)
  .demandCommand() // Jeśli nie podamy żadnej komendy, wyświetli nam Usage i Help
  .strict() // Nie dopuszczamy parametrów innych, niż wymagane przez komendę
  .help().argv;
