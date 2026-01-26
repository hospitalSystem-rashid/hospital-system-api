const User = require('../model/User');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const createToken = (user) => {
    return jwt.sign(
        {id: user._id, role: user.role},
        process.env.JWT_SECRET
    );

};

//to register user
// path : POST api/users/register

exports.registerUSer = async (req, resp) => {
    try {
        const {name, email, phone, role, password} = req.body;

        const userExists = await User.findone({email});
        if (userExists)
            return resp.status(400).json({message: "Email Already exists"});

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            phone,
            role,
            password: hashedPassword
        });

        resp.status(201).json({message: "User registered successfully", user});

    } catch (e) {
        resp.status(500).json({message: e.message});
    }
};

// login user
// PATH POST /api/users/login

exports.loginUser = async (req, resp) => {
    try {
        const {email, password} = req.body;
        const user = await User.findone({email});

        if (!user)
            return resp.status(404).json({message: "Invalid login Credentials......"});

        const match = await bcrypt.compare(password, user.password);
        if (!match)
            return resp.status(400).json({message: "Invalid login Credentials......"});

        const token = createToken(user);

        resp.status(200).json({
            message: "Login Successful..",
            token,
            user: {
                id: user._id,
                name: user.name,
                role: user.role,
                email: user.email
            }

        });
    } catch (e) {
        resp.status(500).json({message: e.message});
    }
}