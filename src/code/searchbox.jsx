/** @jsx React.DOM */
'use strict'
require("../css/searchbox.css")
var React = require('react')

module.exports = React.createClass({
    displayName: 'SearchBox',
    getInitialState: function(){
        return {
            checkBox: false,
            searchTerm: ""
        };
    },
    handleText: function(e){
        this.setState({searchTerm: e.target.value});
        this.props.onSearch({checkBox: this.state.checkBox, searchTerm: e.target.value});
    },
    handleCheckBox: function(e){
        this.setState({checkBox: !this.state.checkBox});
        this.props.onSearch({checkBox: !this.state.checkBox, searchTerm: this.state.searchTerm});
    },
    render: function(){
    	return (
            <form className='search-box pure-form'>
            <fieldset>
                <input type='search' placeholder={this.props.placeholder} onChange={this.handleText} value={this.state.searchTerm} />
                <label><input type='checkbox' checked={this.state.checkBox} onChange={this.handleCheckBox} />Vain katsottavissa olevat</label>
            </fieldset>
            </form>
		)
    }
});