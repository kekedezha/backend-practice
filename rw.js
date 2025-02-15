// Read/Write function file
import fs from "fs";

export const readData = () => {
  const data = fs.readFileSync("./data.json", "utf8");
  return JSON.parse(data);
};

export const writeData = (data) => {
  fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
};
