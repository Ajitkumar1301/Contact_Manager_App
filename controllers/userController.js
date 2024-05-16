const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All Fields are mandatory")
    }
    const avilableEmail = await User.findOne({ email })
    if (avilableEmail) {
        res.status(400);
        throw new Error("User Already Exists")
    }
    const hashpassword = await bcrypt.hash(password, 10)
    const user = await User.create({
        username,
        email,
        password: hashpassword,
    })
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email, message: "user register successfully" })
    }
    else {
        res.status(400);
        throw new Error("User Data Not Valid")
    }

})


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All Fields are mandatory")
    }
    const user = await User.findOne({ email });
    if (user && bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECERT,
            { expiresIn: "1m" })
        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("email or password not valid")
    }


})


const currentUser = asyncHandler(async (req, res) => {
    res.json({ message: "current user information" })
})

module.exports = { registerUser, loginUser, currentUser }