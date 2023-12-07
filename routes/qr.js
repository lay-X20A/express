const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/', (req, res) => {
    const apiUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example';

    request.get({ url: apiUrl, encoding: null }, (error, response, body) => {
        if (!error && response.statusCode === 200 && response.headers['content-type'] === 'image/png') {
            res.contentType('image/png').send(body);
        } else {
            console.error(error || 'Invalid response');
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

module.exports = router;