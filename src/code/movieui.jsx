/** @jsx React.DOM */
'use strict'
var React = require('react')
var getMovies = require('./getmovies')
var MovieGallery = require('./moviegallery')
var SearchBox = require('./searchbox')
var MovieTable = require('./movietable')
require("../css/pure-forms-table.css")

module.exports = React.createClass({
    displayName: 'MovieUI',
    getInitialState: function(){
        return {
            movies:{
                headings:[],
                table: []
            },
            filtered:{
                headings:[],
                table: []
            },
            featured: []
        };
    },
    componentDidMount: function() {
        getMovies(function(result){
            this.setState({
                movies: {headings: result.headings, table: result.table}, 
                filtered: {headings: result.headings, table: result.table}, 
                featured: result.featured});
        }.bind(this));
    },
    handleSearch: function(searchOptions){
        var self = this;
        var vimeoColumn = this.state.movies.headings.indexOf('vimeo');
        
        var terms = [];
        var phraseMatcher = /[“”"]([^“”"]+)[““"$]?/g;
        var searchTermStr = searchOptions.searchTerm.toLowerCase();
        var match;
        while(match = phraseMatcher.exec(searchTermStr)){
            terms.push(match[1]);
        }
        if(terms.length > 0){
            searchTermStr = searchTermStr.replace(/[“”"][^“”"]+[“”"$]?/g, '');
        }
        var words = searchTermStr.split(/\s+/).filter(function(t){return t.length > 1});
        terms = terms.concat(words);
        
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
        if(this.state.movies.headings.length !== 0){
            return (
                <div className='movie-ui'>
                <MovieGallery movies={this.state.featured} />
                <SearchBox placeholder='Hae elokuvista' onSearch={this.handleSearch} />
                <MovieTable data={this.state.filtered} mainCols={4} />
                </div>
            )
        }else{
            return <div className='movie-ui'></div>
        }
    }
});