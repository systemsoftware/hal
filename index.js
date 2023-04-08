const { OpenAIApi, Configuration:OpenAIConfiguration } = require("openai")
const dotenv = require('dotenv')

dotenv.config()

const apiKey = process.env.KEY
const express = require('express')

const app = express()

app.get("/image", (req, res) => res.sendFile(`${__dirname}/index.png`)) // Image source: https://commons.wikimedia.org/wiki/File:HAL9000.svg

app.post("/ask", async (req, res) => {
const question = req.query.q
const openai = new OpenAIApi(new OpenAIConfiguration({ apiKey }))
const answer = await openai.createChatCompletion({
model:"gpt-3.5-turbo",
messages:[
{ role:"system", content:"You're HAL-9000, the onboard computer on the spaceship Discovery One." },
{ role:"user", content:question },
],
max_tokens:150,
n:1,
})
res.send({answer:answer.data.choices[0].message.content})
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.listen(process.env.PORT, () => {
    console.log(`Listening on *:${process.env.PORT}`)
})