const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const campaignsController = require('./controller/spaceCampaignsController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Request logging middleware
app.use((req, res, next) => {
    const start = Date.now();
    console.log(`[REQUEST] ${req.method} ${req.originalUrl} - Headers: ${JSON.stringify(req.headers['content-type'] || 'N/A')} - Body: ${JSON.stringify(req.body)}`);
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`[RESPONSE] ${req.method} ${req.originalUrl} - Status: ${res.statusCode} - Duration: ${duration}ms`);
    });
    next();
});

// Route for campaigns controller
app.use('/', campaignsController);

const server = app.listen(PORT, () => {
    console.log(`[SERVER] Server running on port ${PORT}`);
    console.log(`[SERVER] Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`[SERVER] Started at: ${new Date().toISOString()}`);
});

module.exports = server;
