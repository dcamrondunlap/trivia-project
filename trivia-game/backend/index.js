/* eslint-disable no-undef */

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 9002;
const axios = require('axios');

app.use(cors())

app.get('/api/trivia/questions', async (req, res) => {
  try {
    const {amount = 10, category, difficulty, type} = req.query
    let apiURL = `https://opentdb.com/api.php?amount=${amount}`;

    if (category) apiURL += `&category=${category}`;
    if (difficulty) apiURL += `&difficulty=${difficulty}`;
    if (type) apiURL += `&type=${type}`;

    const response = await axios.get(apiURL);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching trivia questions', error);
    res.status(500).json({error: 'An error occurred while fetching questions'});
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
