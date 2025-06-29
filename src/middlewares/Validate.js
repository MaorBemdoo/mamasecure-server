const ResponseHandler = require('../lib/ResponseHandler');
exports.validate = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body, { abortEarly: false });
        next();
    } catch (err) {
        return ResponseHandler(res, 400, 'Validation Error', {
            errors: err.inner ? err.inner.map(e => ({ path: e.path, message: e.message })) : [err.message]
        });
    }
};