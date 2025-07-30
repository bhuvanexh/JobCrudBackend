export const notFound = (req, res, next) => {
    res.status(404).json({
        message: `Route not found: ${req.originalUrl}`,
    });
};

export const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

    res.status(statusCode).json({
        message: err.message || "Internal Server Error",
    });
};