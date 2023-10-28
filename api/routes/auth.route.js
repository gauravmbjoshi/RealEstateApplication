import express from "express";
// auth.controller.js have signin and signup as 2 functions which carryout the api routing as we do not want clustered code
import { signin, signup } from "../controllers/auth.controller.js";

const router = express.Router();
// created api route for signup which preciedes to /api/auth please refer index.js
router.post("/signup", signup);
// created api route for signup which preciedes to /api/auth please refer index.js
router.post("/signin", signin);

export default router;
