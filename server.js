require("dotenv").config();

const app = require("./src/app");
const { connectDB } = require("./src/config/db");

const startServer = async () => {
  try {
    await connectDB();

    app.listen(process.env.port, () => {
      console.log(`Server is running on port ${process.env.port}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startServer();
