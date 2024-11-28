import User from "../../../Models/userModel";
import { comparePassword } from "../../../../libs/helpers/apihelper";
import { sentEmail } from "../../../../libs/helpers/sendEmail";
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json({
        status: "200",
        message: "All Fields are Required!",
      });
    }

    const existUser = await User.findOne({ email });
    if (!existUser) {
      return Response.json({
        status: "200",
        message: "user not found ",
      });
    }

    const matchPassword = await comparePassword(existUser.password, password);
    console.log("matchPassword", matchPassword);

    if (!matchPassword) {
      return Response.json({
        status: "200",
        message: "Wrong Password",
      });
    }
    sentEmail();
    return Response.json({
      status: "200",
      message: "User Login Successfuly ",
      data: existUser,
    });
  } catch (error) {
    return Response.json({
      status: "500",
      message: error,
    });
  }
}
