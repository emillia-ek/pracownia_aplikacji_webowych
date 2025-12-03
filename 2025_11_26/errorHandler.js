const { getLogDatabase } = require('./db');

const errorHandler = async (err, req, res, next) => {
    const db = getLogDatabase();

    let statusCode = err.status || 500;
    let message = err.message || 'Wewnetrzny blad serwera.';

    if (err.code && err.code.startsWith('P')) {
        if (err.code === 'P2025') {
            message = 'Zasob nie został znaleziony.';
            statusCode = 404;
        } else {
            message = 'Blad operacji na bazie danych.';
            statusCode = 500;
        }
    }

    if (db) {
        const errorLogEntry = {
            timestamp: new Date(),
            status: statusCode,
            message: err.message,
            stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
            method: req.method,
            url: req.originalUrl,
            ip: req.ip || req.connection.remoteAddress,
        };

        try {
            const collection = db.collection('errorLogs');
            collection.insertOne(errorLogEntry).catch(dbErr => {});
        } catch (dbErr) {}
    }

    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: message,
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
    });
};

module.exports = errorHandler;