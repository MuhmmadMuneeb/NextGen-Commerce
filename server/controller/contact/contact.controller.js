import { sendEmail } from "../../utils/mail/nodeMailer.js";

export const createContact = async (req, res) => {
    try {
        const { name, email, message, subject } = req.body;

        // validation
        if (!name || !email || !message || !subject) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        await sendEmail(name, subject, message, email);

        // ✅ VERY IMPORTANT (you missed this)
        return res.status(200).json({
            success: true,
            message: "Email sent successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};