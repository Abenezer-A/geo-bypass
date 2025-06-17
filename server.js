const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/proxy', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send("Missing ?url param");

  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      headless: true
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const content = await page.content(); // Gets fully rendered HTML
    await browser.close();

    res.send(content);
  } catch (err) {
    console.error(err);
    res.status(500).send("Puppeteer error");
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Puppeteer proxy running");
});
