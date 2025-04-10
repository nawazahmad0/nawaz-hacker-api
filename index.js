const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/api', async (req, res) => {
    const userMessage = req.query.message;

    if (!userMessage) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        const response = await axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + process.env.GEMINI_API_KEY, {
            contents: [{ parts: [{ text: userMessage }] }]
        });

        const reply = response.data.candidates[0].content.parts[0].text;
        res.json({ reply: reply });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
});

app.listen(port, () => {
    console.log(`Server Running on Port ${port}`);
});
