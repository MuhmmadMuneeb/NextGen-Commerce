import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendEmail = async (req,res,name, subject, message, email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Contact Form" <${process.env.EMAIL_USER}>`, 
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `New Contact: ${subject}`,
      html: `
        <h3>New Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

  

  } catch (err) {
    res.status(500).json({ error: "Failed to send email" });
  }
};