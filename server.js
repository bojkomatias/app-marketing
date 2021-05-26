var faunadb = require('faunadb'),
  q = faunadb.query;
const express = require('express')

require('dotenv').config();

const client = new faunadb.Client({
  secret: process.env.FAUNA_KEY
});

const app = express()
const port = process.env.PORT || 3000


app.get('/', async (req, res) => {

  const response = await client.query(
    q.Get(q.Ref(q.Collection('comercio'), '299596695499440642'))
  )

  res.send(response)
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})