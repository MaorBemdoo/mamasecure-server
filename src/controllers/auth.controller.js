const bcrypt = require('bcryptjs');
const { generateToken } = require('../lib/auth');
const ResponseHandler = require('../lib/ResponseHandler');
const User = require('../models/user.model');

const authController = {
    async register(req, res) {
        const { fullname, username, email, password } = req.body;
        if (!fullname || !username || !email || !password) {
            return ResponseHandler(res, 400, 'Validation Error', "All fields are required");
        }

        const user = User.find({ username })
        if (user) {
            return ResponseHandler(res, 409, 'User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            fullname,
            username,
            email,
            password: hashedPassword
        }

        try {
            await User.create(newUser);
            const token = generateToken({ username });
            return ResponseHandler(res, 201, 'User registered successfully', { ...newUser, password: undefined, token });
        } catch (error) {
            return ResponseHandler(res, 500, 'Internal Server Error', error.message);
        }
    },

    async login(req, res) {
        const { username, password } = req.body;
        const user = User.find({ username });
        if (!user) {
            return ResponseHandler(res, 401, 'User does not exist');
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return ResponseHandler(res, 401, 'Password is incorrect');
        }
        const token = generateToken({ username });
        return ResponseHandler(res, 200, 'Login successful', { token });
    }
};

module.exports = authController;
