const express = require('express');
const request = require('request');
const cors = require('cors');
const app = express();

app.use(cors());  // Allow all origins - for testing only

app.get('/proxy', (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send("Missing URL");
  console.log("Fetching:", url);
  request({ url, headers: { 'User-Agent': 'Mozilla/5.0' } }).pipe(res);
});

app.listen(process.env.PORT || 3000, () => console.log('Geo-Proxy running'));
