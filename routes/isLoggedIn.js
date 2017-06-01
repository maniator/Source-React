"use strict";
import express from "express";
import bcrypt from "bcryptjs";
import Promise from "bluebird";
import {Player} from "../lib/Player";

const router = express.Router();
const db = require("../lib/db");
	
Promise.promisifyAll(bcrypt);

/*
	Routing for /index
	/post: @username @password params
		- Post user input to login form, retrieve player
		- If user exists, check password for validity, then create session
		- Reject if account does not exist or password is wrong
 */
router.route("/")
	.get(async (req, res) => {
		console.log("Is logged in", req.session.loggedIn);
		const test = {
			"loggedIn" : req.session.loggedIn ? true : false 
		}
		return res.json(test);
	});

export default router;
