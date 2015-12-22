/** @jsx React.DOM */
'use strict'
var React = require('react')
var getMovies = require('./getmovies')
var SearchBox = require('./searchbox')
var MovieTable = require('./movietable')
require("../css/pure-forms-table.css")

module.exports = React.createClass({
    displayName: 'MovieUI',
    getInitialState: function(){
        return {
            movies:{
                headings:[],
                table: [],
            },
            filtered:{
                headings:[],
                table: [],
            }
        };
    },
    componentDidMount: function() {
        getMovies(function(result){
            this.setState({movies: result, filtered: result});
        }.bind(this));
    },
    handleSearch: function(searchOptions){
        var self = this;
        var vimeoColumn = this.state.movies.headings.indexOf('vimeo');
        var terms = searchOptions.searchTerm.toLowerCase().split(' ').filter(function(t){return t.length > 1});
        var filteredTable = this.state.movies.table.filter(function(e){
            return (searchOptions.checkBox ? e.cells[vimeoColumn] !== '' : true) && terms.every(function(term){ return e.cells.some(function(c, index){
                    if(c === '') return false;
                    if(index === vimeoColumn) return false;
                    return c.toLowerCase().indexOf(term) >= 0;
                });
            });
        });
        this.setState({
            filtered: {table: filteredTable, headings: this.state.movies.headings},
        });
    },
    render: function(){
    	return (
            <div className='movie-ui'>
            <SearchBox placeholder='Hae elokuvista' onSearch={this.handleSearch} />
			<MovieTable data={this.state.filtered} mainCols={4} />
            </div>
		)
    }
});