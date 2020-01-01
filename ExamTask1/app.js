const addCommand = require("./add");

require("yargs")
  .usage("Usage: $0 <command>")
  .command(addCommand)
  .demandCommand() // Jeśli nie podamy żadnej komendy, wyświetli nam Usage i Help
  .strict() // Nie dopuszczamy parametrów innych, niż wymagane przez komendę
  .help().argv;
