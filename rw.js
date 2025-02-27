// Read/Write function file
import fs from "fs";

export const readData = () => {
  try {
    const data = fs.readFileSync("./data.json", "utf8");
    console.log(data);
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading data:", error);
    return { messages: {} };
  }
};

export const appendNewMessage = (newData) => {
  const data = readData();
  data.messages[newData.id] = newData;
  fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
};

export const appendNewUser = (newData) => {
  const data = readData();
  data.users[newData.id] = newData;
  fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
};
