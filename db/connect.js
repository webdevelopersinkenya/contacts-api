const { MongoClient } = require("mongodb");

let db;
let client;

const connectDB = async (uri) => {
  try {
    client = new MongoClient(uri);
    await client.connect();

    db = client.db("contactsDB");

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

const getDB = () => {
  if (!db) {
    throw new Error("Database not initialized");
  }
  return db;
};

const closeDB = async () => {
  if (client) {
    await client.close();
    console.log("MongoDB connection closed");
  }
};

module.exports = { connectDB, getDB, closeDB };