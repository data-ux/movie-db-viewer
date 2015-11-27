/** @jsx React.DOM */
'use strict'
require("../css/stylesheet.css")
var React = require('react')
var ReactDOM = require('react-dom')
var MovieTable = require('./movietable')
var getMovies = require('./getmovies')
getMovies(function(result){
	ReactDOM.render(<MovieTable data={result} />, document.getElementById('content'))
});
