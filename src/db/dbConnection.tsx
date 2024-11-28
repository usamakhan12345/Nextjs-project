import mongoose from "mongoose";
let isConnectDataBase = false;
export const connectDatabase = async () => {
  try {
    const mongoDbURL = process.env.MONGO_DB_URL;
    if (isConnectDataBase || !mongoDbURL) {
      return;
    }

    const connect = await mongoose.connect(mongoDbURL);
    if (connect) {
      isConnectDataBase = true;
    }
    console.log("data base connectedSuccessfuly");
  } catch (err) {
    console.log("database not connected", err);
  }
};
