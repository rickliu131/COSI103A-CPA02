const express = require('express')
const app = express()
const port = 3000

app.get('/get_posts', (req, res) => {
  res.send('[GET] Get posts')
})

app.post('/add_post', (req, res) => {
  res.send('[POST] Add post!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
