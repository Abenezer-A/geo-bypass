const express = require('express');
const request = require('request');
const app = express();

app.get('/proxy', (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send("Missing URL");
  console.log("Fetching:", url);
  request({ url, headers: { 'User-Agent': 'Mozilla/5.0' } }).pipe(res);
});

app.listen(3000, () => console.log('Geo-Proxy running on port 3000'));