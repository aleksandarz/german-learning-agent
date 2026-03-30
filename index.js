import { learn } from "./src/commands/learn.js";
import { history } from "./src/commands/history.js";
import { quiz } from "./src/commands/quiz.js";
import { sentence } from "./src/commands/sentence.js";

const command = process.argv[2];
const __dirname = import.meta.dirname;
const filePath = (`${__dirname}/data/words.json`);

if (command === "learn") {
  await learn(filePath);
}
else if (command === "quiz") {
  await quiz(filePath);
}
else if (command === "sentence") {
  await sentence();
}
else if (command === "history") {
  await history(filePath);
}
else {
  console.log("Command not found" + command);
}
