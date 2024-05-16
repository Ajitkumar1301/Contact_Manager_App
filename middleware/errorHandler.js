const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
    const statuscode = res.statuscode ? res.statuscode : 500;

    switch (statuscode) {
        case constants.Validation_ERROR:
            res.json({
                title: "Validation Failed",
                message: err.message,
                stackTrace: err.stack,
            });
        case constants.UNAUTHORIZED:
            res.json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: err.stack,
            });
        case constants.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack,
            });
        case constants.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack,
            });
        case constants.SERVER_ERROR:
            res.json({
                title: "SERVER Error",
                message: err.message,
                stackTrace: err.stack,
            });

        default:
            console.log("No Error");
            break;
    }

}

module.exports = errorHandler;