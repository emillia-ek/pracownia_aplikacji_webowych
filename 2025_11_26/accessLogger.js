const { getLogDatabase } = require('./db');

const accessLogger = async (req, res, next) => {
    const db = getLogDatabase();

    const logEntry = {
        timestamp: new Date(),
        method: req.method,
        url: req.originalUrl,
        ip: req.ip || req.connection.remoteAddress,
        userAgent: req.get('user-agent'),
    };

    if (db) {
        try {
            const collection = db.collection('accessLogs');
            collection.insertOne(logEntry).catch(err => {});
        } catch (error) {}
    }

    next();
};

module.exports = accessLogger;