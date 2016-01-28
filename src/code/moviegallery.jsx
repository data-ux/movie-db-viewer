/** @jsx React.DOM */
'use strict'
require("../css/moviegallery.css");
var React = require('react');
var MoviePreview = require('./moviepreview');

module.exports = React.createClass({
    displayName: 'MovieGallery',
    getInitialState: function(){
        return {
            	movies: getRandomSubset(this.props.movies, 3)
        }
    },
    render: function(){
        var movies = this.state.movies.map(function(movie){
            return <MoviePreview key={movie.id} name={movie.name} videoId={movie.id} />
        });
    	return (
            <div className="moviegallery">{movies}</div>
		)
    }
});

function getRandomSubset(array, number){
    var output = [];
    var usedNumbers = [];
    var pick;
    while(output.length < number){
        pick = ~~(Math.random()*array.length);
        if (usedNumbers.indexOf(pick) < 0){
            output.push(array[pick]);
            usedNumbers.push(pick);
        }
    }
    return output;
}