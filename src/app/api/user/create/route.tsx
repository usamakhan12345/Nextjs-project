import { connectDatabase } from "../../../../db/dbConnection";
import User from "../../../Models/userModel";
import { bcryptPassword } from "../../../../libs/helpers/apihelper";
import { assignJwtToken } from "../../../../libs/helpers/apihelper";
interface CreateRequest {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    connectDatabase();
    const { name, lastName, email, password }: CreateRequest =
      await request.json();

    if (!name || !lastName || !email || !password) {
      return Response.json({
        status: "501",
        message: "Please Send All Required Fields",
        data: email,
      });
    }

    const hashPassword = bcryptPassword(password);

    const existUser = await User.findOne({ email });

    if (existUser) {
      return Response.json({
        status: "200",
        message: "User Already Exist",
      });
    }

    const user = new User({ name, lastName, email, password: hashPassword });
    await user.save();

    const userToken = assignJwtToken(email, name);

    return Response.json({
      status: "200",
      message: "user create successfuly",
      token: userToken,
    });
  } catch (error) {
    return Response.json({
      status: "500",
      message: error,
    });
  }
}
