const express = require("express");
const fetch = require("node-fetch");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.get("/", async (req, res) => {

  try {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: `🚀 Có người vừa truy cập website! IP: ${ip}`
      })
    });

    const data = await response.json();
    app.use(express.static(path.join(__dirname)));

    res.sendFile(path.join(__dirname, "index.html"));
  } catch (err) {
    res.sendFile(path.join(__dirname, "index.html"));
  }
});

app.listen(3000);