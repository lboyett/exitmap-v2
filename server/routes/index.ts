import express, { Express, Request, Response } from "express";
var router = express.Router();

router.get('/', (req, res, next) => {
	res.send("This is the / route from the routes/index.js file")
})

module.exports = router;