import OtpModel from "../../../Models/opt-model";
export async function POST(request: Request) {
  try {
    const { email, verifyCode } = await request.json();

    const existOtp = await OtpModel.findOne({ email });

    if (existOtp) {
      console.log("otpCode", existOtp);
      if (existOtp.otpCode === verifyCode) {
        await OtpModel.findOneAndDelete({ email });

        return Response.json({
          status: "200",
          message: "Otp Successfuly Verified",
        });
      } else {
        return Response.json({
          status: "200",
          message: "Wrong Otp",
        });
      }
    } else {
      return Response.json({
        status: "200",
        message: "Otp not found on this Email",
      });
    }
  } catch (error) {
    return Response.json({
      status: "500",
      message: "error",
    });
  }
}
