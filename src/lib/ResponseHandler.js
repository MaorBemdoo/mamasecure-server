const ResponseHandler = (res, status, message, data = null) => {
    statusCode = status
    status = status.toString().startsWith('2') ? "success" : "failed";
    res.status(statusCode).json({
        status,
        message,
        data: data ? data : undefined
    });
}

module.exports = ResponseHandler;