/** @jsx React.DOM */
'use strict'
var React = require('react')
var getMovies = require('./getmovies')
var SearchBox = require('./searchbox')
var MovieTable = require('./movietable')

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
        var filteredTable = this.state.movies.table.filter(function(e){
            return (searchOptions.checkBox ? e.cells[vimeoColumn] !== '' : true) && e.cells.some(function(c, index){
                if(c === '') return false;
                if(index === vimeoColumn) return false;
                return c.toLowerCase().indexOf(searchOptions.searchTerm.toLowerCase()) >= 0;
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