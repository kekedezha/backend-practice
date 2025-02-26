// Read/Write function file
import fs from "fs";

export const readData = () => {
  try {
    const data = fs.readFileSync("./data.json", "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading data:", error);
    return { messages: {} };
  }
};

export const writeData = (data) => {
  fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
};
