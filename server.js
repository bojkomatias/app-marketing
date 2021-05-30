var faunadb = require('faunadb'),
  q = faunadb.query;
const express = require('express')
const cors = require('cors');
const { Lambda } = require('faunadb');

require('dotenv').config();

const app = express()
app.use(cors())
const port = process.env.PORT || 3000

const client = new faunadb.Client({
  secret: process.env.FAUNA_KEY
});

app.get('/sales/:discount', async (req, res) => {
  // const response = req.params.discount
  const response = await client.query(
    q.Map(
      q.Paginate(
        q.Match(q.Index('get_discount_prods'), req.params.discount)
      ),
      Lambda('prod', q.Get(q.Var('prod')))
    )
  )
  response.data.forEach(element => {

    if (element.data.stock > 0) {
      element['link'] = `https://strong-traveling-panther.glitch.me/product/${element.ref.id}`
    }
    console.log(element)
  });
  res.send(response)
})



app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})