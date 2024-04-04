/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express');
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 9002;
const axios = require('axios')

app.use(cors())

function generateRandomToken(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length;
  let token = '';
  for (let i = 0; i < length; i++) {
    token += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return token;
}

app.get('/api/trivia/questions', async (req, res) => {
  try {
    const sessionToken = generateRandomToken(32);
    const {amount = 10, category, difficulty, type} = req.query
    let apiURL = `https://opentdb.com/api.php?amount=${amount}&token=${sessionToken}`;

    if (category) apiURL += `&category=${category}`;
    if (difficulty) apiURL += `&difficulty=${difficulty}`;
    if (type) apiURL += `&type=${type}`;

    const response = await get(apiURL);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching trivia questions', error);
    res.status(500).json({error: 'An error occurred while fetching questions'});
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
