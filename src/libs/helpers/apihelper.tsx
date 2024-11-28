import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const bcryptPassword = (password: string) => {
  var salt = bcrypt.genSaltSync(10);
  var hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
};

export const comparePassword = async (
  bcryptpassword: string,
  password: string
) => {
  try {
    const isMatch = await bcrypt.compare(password, bcryptpassword);
    return isMatch;
  } catch (error) {
    console.log("error", error);
  }
};

export const assignJwtToken = (email: string, password: string) => {
  var token = jwt.sign(
    { email, password },
    process.env.JWT_SCRET_KEY || "usamakhan",
    { expiresIn: "1h" }
  );
  return token;
};
