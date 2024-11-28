import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  lastName: String,
  email: String,
  password: String,
});

const userModel = mongoose.models.Users || mongoose.model("Users", userSchema);

export default userModel;
