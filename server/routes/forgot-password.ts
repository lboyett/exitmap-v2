import express from "express";
import crypto from "crypto";
import uniqid from "uniqid";
import redisClient from "../redis-config";
import { getUserByEmail } from "../controllers/userController";
import nodemailer from "nodemailer";


const router = express.Router();

router.post("/", async (req, res, next) => {
  const { email } = req.body;

	const uuid = crypto.randomUUID();

	try {
  const user = await getUserByEmail(email);
	res.status(200).send()
	} catch (err: any) {
		console.log(err.message)
		res.status(500).send(err.message)
	}

  console.log(email);
	console.log(uuid)

	try {
		const redis_response = await redisClient.hSet( uuid, {
			email: email,
			uuid: uuid
		})
		const expiry_response = await redisClient.expire(uuid, 60*60*24)
		const redis_value = await redisClient.hGetAll(uuid);
    console.log('The following is the value put into Redis')
		console.log(JSON.stringify(redis_value, null, 2))
	} catch (err: any) {
		console.log(err)
		res.status(err.status).send(err.message)
	}

  async function main() {
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "exitmap.jump@gmail.com",
        pass: "kaylfjugkuehguye",
      },
    });

    let info = await transporter.sendMail({
      from: '"ExitMap" <exitmap.jump@gmail.com>', // sender address
      to: `${email}`, // list of receivers
      subject: "This is a message from ExitMap", // Subject line
      text: `This message was sent to you directly from ExitMap, not Gmail. To reset your password, please click the following link, http://localhost:5174/reset-password?uuid=${uuid}.`, // plain text body
      html: `<h1>Hello!</h1><br><p>This message was sent to you directly from the ExitMap website, not Gmail.</p><br><p>To reset your password, please use the following link</p><br><h2>http://localhost:5174/reset-password?uuid=${uuid}</h2>`, // html body
    });

    // console.log("Message sent: %s", info.messageId);

    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }

  main().catch(console.error);
});

export default router;
