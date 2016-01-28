/** @jsx React.DOM */
'use strict'
require("../css/moviepreview.css")
var React = require('react');
var $ = require('jquery');

module.exports = React.createClass({
    displayName: 'MoviePreview',
    getInitialState: function(){
        return {
            thumb: null
        };
    },
    componentDidMount: function() {
        var self = this;
        $.getJSON('http://vimeo.com/api/v2/video/' + this.props.videoId + '.json').done(function(response){
            self.setState({thumb: response[0].thumbnail_medium});
        });
    },
    render: function(){
    	return (
            <a className="moviepreview" href={'https://vimeo.com/' + this.props.videoId} style={{'backgroundImage': this.state.thumb ? 'url(' + this.state.thumb + ')' : ""}} target="_blank"><span>{this.props.name}</span></a>
		)
    }
});