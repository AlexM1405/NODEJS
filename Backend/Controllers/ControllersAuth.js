
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
import { validateUser } from "../Schemas/UserSchemas.js"
import dotenv from "dotenv";


dotenv.config();

export class AuthControllers {
    constructor({ userModel }) {
        this.userModel = userModel;
    }
    SignUp = async (req, res) => {

        //const salt = bcrypt.genSaltSync(10);
        //const hash = bcrypt.hashSync(req.body.password, salt)
    
        const result = validateUser(req.body);
        if (!result || !result.data) {
            return res.status(400).json({ success: false, msg: "Invalid user data." });
        }
        const newUser = await this.userModel.create({input: result.data});
        res.status(201).json({success:true, message:"Successfully Created"});
        if(!newUser) {
            return res.status(400).json({ success: false, msg: "Failed to create user." });
        }
     };

     login = async (req, res) => {
        const { email, password } = req.body;
       
        // Validate input
        if (!email || !password) {
            return res.status(400).send('Email and password are required');
        }

        // Find the user
        const user = await this.userModel.create({ email, password });
        if (!user) return res.status(404).send('User not Found');
         const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRY || "30min" });
    
        
         // Send response
        res.cookie("accessToken", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1800000) // 30 minutes from now
         });
       
        res.status(200).send({ message: "Successfully logged in" });
      }
    }
    
