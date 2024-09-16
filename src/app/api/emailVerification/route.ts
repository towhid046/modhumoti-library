import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const POST = async (req, res) => {
  const newUser = await req.json();

  if (!newUser.email) {
    return NextResponse.json({ message: "User email is required" });
  }

  const db = await connectDB();
  const usersCollection = db.collection("users");
  const user = await usersCollection.findOne({ email: newUser.email });

  if (!user) {
    return NextResponse.json({ message: "Invalid User" });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: process.env.NEXT_EMAIL_USER,
      pass: process.env.NEXT_EMAIL_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.NEXT_EMAIL_USER, // sender address
    to: user?.email, // list of receivers
    subject: "Email Verification E-Medicine",
    html: `
  <section style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px 20px; color: #333;">
    <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
      <h2 style="text-align: center; color: #4CAF50;">Verify Your Email Address</h2>
      <p style="font-size: 16px; color: #555;">Hi ${user?.name},</p>
      <p style="font-size: 16px; color: #555;">
        Thank you for registering with our E-Medicine! Please use the following verification code to complete your registration:
      </p>

      <div style="text-align: center; margin: 20px 0;">
        <p style="font-size: 24px; font-weight: bold; color: #000; border: 1px solid #ddd; display: inline-block; padding: 10px 20px; background-color: #f8f8f8;">
          ${user?.verificationCode}
        </p>
      </div>

      <p style="font-size: 16px; color: #555;">
        If you did not request this code, please ignore this email.
      </p>

      <p style="font-size: 16px; color: #555;">Best regards,</p>
      <p style="font-size: 16px; color: #555;"><strong>Your Company Team</strong></p>

      <div style="text-align: center; margin-top: 20px;">
        <a href="https://yourcompanywebsite.com" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: #fff; text-decoration: none; border-radius: 5px;">Visit Our Website</a>
      </div>
    </div>
  </section>
`,
  });

  return NextResponse.json(info);
};
