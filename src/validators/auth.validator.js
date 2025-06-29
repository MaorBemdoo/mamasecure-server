const yup = require('yup');
const { validate } = require('../middlewares/Validate');

const registerSchema = yup.object().shape({
    fullname: yup.string().min(3).max(50).required(),
    username: yup.string().min(3).max(30).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).max(100).required(),
});

const loginSchema = yup.object().shape({
    username: yup.string().min(3).max(30).required(),
    password: yup.string().min(6).max(100).required(),
});

module.exports = {
    registerValidator: validate(registerSchema),
    loginValidator: validate(loginSchema),
};