import otp from "otp-generator";
import nodemailer from "nodemailer";
import expressAsyncHandler from "express-async-handler";

// Generate OTP
const generateOTP = () => {
  const OTP = otp.generate(4, {
    specialChars: false,
    upperCaseAlphabets: true,
    lowerCaseAlphabets: true,
  });
  return OTP;
};

// Nodemailer transporter
let transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "ahmadmayallo02@gmail.com", // Your email
    pass: "abcd-efgh-ijkl-mnop", // App-specific password
  },
});

// Send Email Function
export const sendEmail = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const OTP = generateOTP(); // Generate OTP
  let mailOptions = {
    from: "ahmadmayallo02@gmail.com",
    to: email,
    subject: "OTP From Me",
    text: `Your OTP is: ${OTP}`, // Use generated OTP
  };

  transport.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: "Failed to send email" });
    } else {
      console.log("Email Sent Successfully");
      return res
        .status(200)
        .json({ message: "Email sent successfully", otp: OTP }); // Respond with OTP for verification purposes
    }
  });
});
