// user.model.js is a user schima for the users to signup
import User from "../models/user.model.js";
// bcrypt is a middle ware used to encript data before sending
import bcryptjs from "bcryptjs";
// error handler import from error.js
import { errorHandler } from "../utils/error.js";
// jwt is jeson web token to create cookie for signin
import jwt from "jsonwebtoken";
// send data to database for login credential with the time stamp
export const signup = async (req, res, next) => {
  // username email password request from body
  const { username, email, password } = req.body;
  // hashing the password before sending to database
  const hashedPassword = bcryptjs.hashSync(password, 10);
  // sending entered username email and password to database
  const newUser = new User({ username, email, password: hashedPassword });
  // error handling using the middle ware created namely next
  try {
    await newUser.save();
    res.status(201).json("User created successfully!");
    // status 201 is the request is successful status
  } catch (error) {
    next(error);
  }
};
// request the server for the data for perticular email and password
export const signin = async (req, res, next) => {
  // request for email and password
  const { email, password } = req.body;
  // error handling through the middleware created namely next
  try {
    // check if email is present in database or is valid email or not
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));
    // The HTTP 404 Not Found response status code indicates that the server cannot find the requested resource
    // check if password entered is correct or not
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credential!"));
    // The HTTP status code 401 is a client-side error that indicates that the user's login authentication credentials aren't working
    // create username and password cookie for the browser without expire as it is a session cookie we can add expire at end and jwt is a package which we need to install
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    // removes the password which is coming from the database as we want to make the site secure to use
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
