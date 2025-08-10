import mongoose from 'mongoose'
import User from '../module/user.module.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const getAllUser = async (req, res) => {
    try {
        const allUsers = await User.find()
        return res.status(200).json({ message: "All users", data: allUsers })
    }
    catch (err) {
        console.log("error", err)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const createUser = async (req, res) => {
    const { name, email, role, password } = req.body;
    try {
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "This user already exit" })
        }
        const passwordHatched = await bcrypt.hash(password, 10)
        const createNew = new User({ name, email, role, password: passwordHatched })
        createNew.save()
        return res.status(201).json({ message: "Registration successfully!", data: createNew })

    }
    catch (err) {
        console.log("error", err)
        return res.status(500).json({ message: "Internal server error" })
    }

}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })
        console.log(user, "werhowejtew")
        if (!user) {
            return res.status({ message: "user not exit" })
        }
        const matchedPassword = await bcrypt.compare(password, user.password)
        if (!matchedPassword) {
            return res.status({ message: "Invalid credential" })
        }
        const token = await jwt.sign({ id: user.id, role: user.role }, process.env.SECRET_CODE, { expiresIn: "7d" })
        return res.status(200).json({ message: "Login Successfully!", token: token, user: user })
    }
    catch (err) {
        console.log("error", err)
        return res.status(500).json({ message: "Internal server error" })

    }

}

export const deleteAllUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ message: "User not fond" })
        }
        const deletedAll = await User.findByIdAndDelete(id)
        return res.status(200).json({ message: "Deleted all user", data: deletedAll })

    }
    catch (err) {
        console.log("error", err)
        return res.status(500).json({ message: "Internal server error" })

    }
}