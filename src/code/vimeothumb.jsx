/** @jsx React.DOM */
'use strict'
require("../css/vimeothumb.css")
var React = require('react')
var $ = require('jquery');

module.exports = React.createClass({
    displayName: 'VimeoThumb',
    getInitialState: function(){
        return {
            	url: null
        }
    },
    componentDidMount: function() {
        var self = this;
        $.getJSON('//vimeo.com/api/v2/video/' + this.props.videoId + '.json').done(function(response){
            self.setState({url: response[0].thumbnail_small});
        });
    },
    render: function(){
    	return (
            <a className="vimeo-thumb" href={'https://vimeo.com/' + this.props.videoId} target="_blank"><img width="100" height="75" src={this.state.url || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'} /></a>
		)
    }
});