import express from "express";
import crypto from "crypto";
import uniqid from "uniqid";
import redisClient from "../redis-config";
import { getUserByEmail } from "../controllers/userController";
import nodemailer from "nodemailer"

const router = express.Router();

router.post("/", async (req, res, next) => {
  const { email } = req.body;
	console.log(email)
	async function main() {
		let testAccount = await nodemailer.createTestAccount();
	
		// let transporter = nodemailer.createTransport({
		// 	host: "smtp.ethereal.email",
		// 	port: 587,
		// 	secure: false, // true for 465, false for other ports
		// 	auth: {
		// 		user: 'laury.rohan20@ethereal.email', // generated ethereal user
		// 		pass: 'eP4QKJjDfpexQE9JBg', // generated ethereal password
		// 	},
		// });

		let transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: 'exitmap.jump@gmail.com',
				pass: 'kaylfjugkuehguye'
			}
		})
	
		let info = await transporter.sendMail({
			from: '"ExitMap" <exitmap.jump@gmail.com>', // sender address
			to: "jackson.boyett@gmail.com", // list of receivers
			subject: "This is a message from ExitMap", // Subject line
			text: "To change your passcode, please enter the following code: ######", // plain text body
			html: "<span>To change your passcode, please enter the following code: <b>######<b><span>", // html body
		});
	
		console.log("Message sent: %s", info.messageId);

		console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
	}
	
	main().catch(console.error);
});

export default router;
