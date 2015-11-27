/** @jsx React.DOM */
'use strict'
require("../css/searchbox.css")
var React = require('react')

module.exports = React.createClass({
    displayName: 'SearchBox',
    getInitialState: function(){
        return {
            useRegex: false,
            searchTerm: ""
        };
    },
    handleText: function(e){
        this.setState({searchTerm: e.target.value});
        this.props.onSearch({useRegex: this.state.useRegex, searchTerm: e.target.value});
    },
    handleCheckBox: function(e){
        this.setState({useRegex: !this.state.useRegex});
        this.props.onSearch({useRegex: !this.state.useRegex, searchTerm: this.state.searchTerm});
    },
    render: function(){
    	return (
            <div className='search-box'>
                <label><input type='checkbox' checked={this.state.useRegex} onChange={this.handleCheckBox} />Käytä regex</label>
                <input type='text' placeholder={this.props.placeholder} onChange={this.handleText} value={this.state.searchTerm} />
            </div>
		)
    }
});