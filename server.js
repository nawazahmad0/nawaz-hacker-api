require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000; // PORT को 3000 पर सेट किया
const API_KEY = process.env["nawaz-hacker"]; // API_KEY को सही से एक्सेस किया

app.use(express.json());

app.get("/", (req, res) => {
  res.send("🔥 Nawaz Hacker API is Live! 🔥");
});

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    if (!userMessage) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

app.listen(PORT, () => {
  console.log(`🔥 Server is running on port ${PORT}`);
});