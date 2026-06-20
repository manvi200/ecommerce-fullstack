const { MongoClient } = require("mongodb");

let db;

const connectDB = async () => {
  try {
    const client = new MongoClient(process.env.MONGO_URI);

    await client.connect();

    db = client.db(process.env.DB_NAME);

    console.log("✅ Connected to MongoDB Atlas");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    throw error;
  }
};

const getDb = () => db;

module.exports = { connectDB, getDb };
