import express from "express";
import { createContact } from "../../controller/contact/contact.controller.js";
const router = express.Router();



router.post("/send", createContact);


export default router;
