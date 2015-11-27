/** @jsx React.DOM */
'use strict'
require("../css/stylesheet.css")
var React = require('react')
var ReactDOM = require('react-dom')
var MovieUI = require('./movieui')

ReactDOM.render(<MovieUI />, document.getElementById('movie-db-content'))
