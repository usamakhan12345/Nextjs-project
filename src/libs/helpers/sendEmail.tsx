import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shehzadausamakhan@gmail.com",
    pass: process.env.GMAIL_VERIFICATION_PASSWORD,
  },
});

export async function sentEmail() {
  const info = await transporter.sendMail({
    from: 'Welcome to Our Project   👻" <shehzadausamakhan@gmail.com>',
    to: "m.osamakhan@technyxsystems.com",
    subject: "Hello ! Congratulations",
    text: "Your are successfuly Login ",
    // html: "<b>Hello world?</b>",
  });

  console.log("Message sent: %s", info.messageId);
}

sentEmail().catch(console.error);

export async function sentForgetPasswordMail(otpCode: string) {
  const info = await transporter.sendMail({
    from: 'Forget Password Otp Code!" <shehzadausamakhan@gmail.com>',
    to: "m.osamakhan@technyxsystems.com",
    subject: "OTP Verification Code",
    text: `Reset Password Otp Code  ${otpCode}`,
    // html: "<b>Hello world?</b>",
  });

  console.log("Message sent: %s", info.messageId);
}
const otpCode = "258369";
sentForgetPasswordMail(otpCode).catch(console.error);
