import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        if (!fullname || !email ||  !password ) {
            return res.status(400).json({
                message: "All fields required",
                success: false
            })
        }
        

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User Already Exist With Email",
                success: true
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            password: hashedPassword,
        }
        )

        return res.status(201).json({
            message: "Account Created Successfully",
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}


export const login = async (req, res) => {
    try {
        const { email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields required",
                success: false
            })
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        }
        
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        }

        const tokenData = {
            userId: user._id,
        }

        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });

        user = {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
        }
        return res
            .status(200)
            .cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "None",
                maxAge: 1 * 24 * 60 * 60 * 1000
            })
            .json({
                message: `Welcome back ${user.fullname}`,
                user,
                success: true
            });

    } catch (error) {
        console.log(error)
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json(
            {
                message: "Logged Out Successfully",
                success: true
            }
        )
    } catch (error) {
        console.log(error);
    }
}