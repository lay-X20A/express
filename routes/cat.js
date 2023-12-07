var express = require('express');
var router = express.Router();
const request = require('request');

router.get('/', async (req, res) => {
    request('https://dog.ceo/api/breeds/image/random', (error, response, body) => {
        if (error) {
            console.error('エラー:', error);
            res.status(500).json({ error: '内部サーバーエラー' });
        } else if (response.statusCode !== 200) {
            console.error('ステータスコード:', response.statusCode);
            res.status(500).json({ error: '犬の画像の取得に失敗しました。' });
        } else {
            try {
                const data = JSON.parse(body);
                res.json(data);
            } catch (parseError) {
                console.error('解析エラー:', parseError);
                res.status(500).json({ error: '応答の解析に失敗しました。' });
            }
        }
    });
});

module.exports = router;