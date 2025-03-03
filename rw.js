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

export const deleteUser = (userId) => {
  // Create empty object that will hold data after deleted user
  const after_deletion_JSON = {};
  // Read in data from data.json file
  const data = readData();

  // filter through object and delete user with specified id
  const after_deletion = Object.values(data.users).filter(
    (user) => user.id != userId
  );
  // transfer data stored in array to object
  after_deletion.forEach((item) => (after_deletion_JSON[item.id] = item));

  // overwrite users value to json object read in the beginning
  data.users = after_deletion_JSON;

  fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
};

export const deleteMessage = (messageId) => {
  // Create empty object that will hold data after deleted message
  const after_deletion_JSON = {};
  // Read in data from data.json file
  const data = readData();

  // filter through object and delete message with specified id
  const after_deletion = Object.values(data.messages).filter(
    (message) => message.id != messageId
  );
  // transfer data stored in array to object
  after_deletion.forEach((item) => (after_deletion_JSON[item.id] = item));

  // overwrite messages value to json object read in the beginning
  data.messages = after_deletion_JSON;

  fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
};

export const updateUser = (userId, newUsername) => {
  // Read in data from data.json file
  const data = readData();

  data.users[userId] = newUsername;
  fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
};

export const updateMessage = (messageId, newText = null, newUser = null) => {
  // Read in data from data.json file
  const data = readData();

  if (newText != null && newUser == null) {
    data.messages[messageId].text = newText;
  } else if (newText == null && newUser != null) {
    data.messages[messageId].userId = newUser;
  }

  fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
};
