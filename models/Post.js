'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

var postSchema = Schema( {
  text: String,
  author: String
} );

module.exports = mongoose.model( 'Post', postSchema );
