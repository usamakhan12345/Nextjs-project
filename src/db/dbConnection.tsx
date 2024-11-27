import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    const mongoDbURL = process.env.MONGO_DB_URL;
    if (!mongoDbURL) {
      return;
    }
    const connect = await mongoose.connect(mongoDbURL);
    console.log("data base connectedSuccessfuly", connect);
  } catch (err) {
    console.log("database not connected", err);
  }
};
