import { optGenerator } from "../../../../libs/helpers/apihelper";
import OtpModel from "../../../Models/opt-model";
import { sentForgetPasswordMail } from "../../../../libs/helpers/sendEmail";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return Response.json({
        data: "200",
        message: "email is required",
      });
    }

    const otpCode = optGenerator("numeric", 6);

    console.log("otpCode ", otpCode);

    const existOtp = await OtpModel.find({ email });

    console.log("existOtp", existOtp);

    if (existOtp) {
      await OtpModel.updateOne({ email }, { otpCode });

      return Response.json({
        status: "200",
        message: "otp generate successfuly",
        otpCode: otpCode,
      });
    }
    const otpData = new OtpModel({ email, otpCode });
    await otpData.save();

    sentForgetPasswordMail(otpCode);

    return Response.json({
      status: "200",
      message: "otp generate successfuly",
      otpCode: otpCode,
    });
  } catch (error) {
    console.log("error", error);
    return Response.json({
      status: "500",
      message: error,
    });
  }
}
