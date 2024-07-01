var express = require('express');
require('dotenv').config();
var router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

router.post('/send-ai', async (req, res) => {
    const { generate } = req.body.text || {}; // Handle missing text property
  
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = generate;
      const result = await model.generateContent(prompt);
  
      if (!result || !result.response) {
        throw new Error('Unexpected response from generateContent'); // Custom error
      }
  
      const response = result.response;
      const text = response.text();
      res.send({ data: response });
    } catch (error) {
      console.error('Error generated ai:', error);
      res.status(500).send({ message: 'Error generating AI response' });
    }
});

router.get("/", (req, res) => {
    return res.send({
        project:'API Web Service '
    });
});


module.exports = router;