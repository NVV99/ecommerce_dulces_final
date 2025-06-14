// Manejo centralizado de errores

function errorHandler(err, req, res, next) {
    console.error('Unhandled error:', err);
    res.status(500).json({ message: 'Internal server error.' });
}

module.exports = errorHandler;
