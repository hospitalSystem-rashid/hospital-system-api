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
};

//to get all users
//PATH  GET /api/users

exports.getUsers = async (req, resp) => {
    try {
        const users = User.find().select("-password");
        resp.status(200).json(users);
    } catch (e) {
        resp.status(500).json({message: e.message});
    }
}

//to get a user
//PATH GET /api/users/:id
exports.getUser = async (req, resp) => {
    try {
        const user = User.findById(req.params.id).select("-password");
        if (!user) return resp.status(404).json({message: "User not found..."})
        resp.status(200).json(user);
    } catch (e) {
        resp.status(500).json({message: e.message});
    }
}

//to update a user
//PATH PUT /api/users/:id
exports.updateUSer = async (req, resp) => {
    try {
        const updates = req.body;

        // if password is changed we need to has it right
        if (updates.password) {
            updates.password = bcrypt.hash(updates.password, 10)
        }

        const user = await User.findByIdAndUpdate(req.params.id, updates, {
            new: true,
        }.select("-password"));

        if (!user) return resp.status(404).json({message: "User not found..."})

        resp.status200.json({
            message: "User updated successfully"
            , user
        });

    } catch (e) {
        resp.status(500).json({message: e.message});
    }

};

//Update User role
//  PUT /api/users/:id/role:
exports.updateRole = async (req, res) => {
    try {
        const {role} = req.body;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            {role},
            {new: true}
        ).select("-password");

        if (!user) return res.status(404).json({message: "User not found"});

        res.status(200).json({
            message: "Role updated successfully",
            user,
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// To delete User
// PATH DELETE /api/users/:id

exports.deleteUser = async (req, resp) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) return resp.status(404).json({message: "User not found..."});

        resp.status(200).json({message: "User deleted Successfully...."});
    } catch (e) {
        resp.status(500).json({message: e.message});
    }
}

// @desc Generate Password Reset Token
// @route POST /api/users/reset-password
exports.generateResetToken = async (req, res) => {
    try {
        const {email} = req.body;

        const user = await User.findOne({email});
        if (!user)
            return res.status(404).json({message: "User not found with this email"});

        const token = crypto.randomBytes(32).toString("hex");

        user.resetToken = token;
        user.resetTokenExpiry = Date.now() + 30 * 60 * 1000; // 30 minutes
        await user.save();

        // You can send this token via email (not included)
        res.status(200).json({
            message: "Reset token generated",
            resetToken: token,
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// @desc Reset password
// @route POST /api/users/reset-password/:token
exports.resetPassword = async (req, res) => {
    try {
        const user = await User.findOne({
            resetToken: req.params.token,
            resetTokenExpiry: {$gt: Date.now()},
        });

        if (!user)
            return res.status(400).json({message: "Invalid or expired token"});

        user.password = await bcrypt.hash(req.body.password, 10);
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;

        await user.save();

        res.status(200).json({message: "Password reset successful"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};




