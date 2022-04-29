'use strict';

const path = require("path");  // to refer to local paths

const express = require('express');
const app = express();

// establish db connection, should hide url later...
const mongoose = require( 'mongoose' );
const mongodb_url = 'mongodb+srv://rickliu131:rickliu131@cluster0.c7x9x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongodb_url);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error: '));
db.once('open', function() {console.log('Successfully Connnected!')});

const Post = require('./models/Post');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// EJS config
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get('/', async (req, res) => {
  if (req.query.show == undefined) {
    res.locals.showAddPostInput = 0;
  } else {
    res.locals.showAddPostInput = 1;
  }
  res.locals.posts = await Post.find({});
  res.render("index");
})

app.post('/add_post', async (req, res) => {
  await Post.create({text: req.body.text, author: req.body.author});
  res.redirect('/');
})

app.get('/delete_all', async (req, res) => {
  await Post.deleteMany({});
  res.redirect('/');
})

const port = 3000
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})
