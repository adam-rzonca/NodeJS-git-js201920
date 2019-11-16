// const fs = require("fs");
// const os = require("os");

// let fileName, userName;

// fileName = "./output.txt";
// userName = os.userInfo().username;
// console.log("Logged user:", userName);
const fs = require("fs");

let userName = process.argv[2] || "";
let outputResult = "Hello " + userName + "!";

console.log(outputResult);
fs.writeFileSync("./output.txt", outputResult);
