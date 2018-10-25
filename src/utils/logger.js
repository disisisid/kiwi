import { createWriteStream } from "fs";
import path from "path";

const createWriteStreamAsync = (dest, info) =>
  new Promise((resolve, reject) => {
    const ws = createWriteStream(dest, { flags: "a" });
    ws.write(JSON.stringify(info));
    ws.on("error", err => reject(err));
    ws.on("finish", () => ws.end(), resolve(dest));
  });

const logEmail = ({ template, hacker, success }) => {
  const dest = path.resolve(`src/logs/${template}.log`);
  const info = { hacker: hacker.email, email_template: template, success };

  Promise.resolve(createWriteStreamAsync(dest, info));
};

export { logEmail };
