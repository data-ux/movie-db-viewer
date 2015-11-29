/** @jsx React.DOM */
'use strict'
require("../css/movietable.css")
var React = require('react')
module.exports = React.createClass({
    displayName: 'MovieTable',
    getInitialState: function(){
        return {
            sortColumn: 0,
            sortAscending : true
        };
    },
    handleClick: function(SynthEvent, id){
        var col = parseInt(id.slice(-1));
        this.setState({
            sortColumn: col,
            sortAscending: this.state.sortColumn === col ? !this.state.sortAscending : this.state.sortAscending
        });
    },
    render: function(){
        var headings = this.props.data.headings.map(function(heading, i) {
            var className = '';
            if(this.state.sortColumn === i){
                className = this.state.sortAscending ? 'sort-ascending' : 'sort-descending';
            }
            return (
                <th className={className} onClick={this.handleClick}>{heading}</th>
            )
        }, this);
        var sorted;
        if(this.props.data.headings[ this.state.sortColumn ] === 'valmistusvuosi'){
            sorted = this.props.data.table.slice().sort(yearSorter.bind(this));
        }else{
            sorted = this.props.data.table.slice().sort(stringSorter.bind(this));
        } 
        var rows = sorted.map(function(row) {
            var cells = row.cells.map(function(cell){
                return (
                    <td>{cell}</td>
                )
            });
            return (
                <tr key={row.id}>
                {cells}
                </tr>
            );
        });
        return (
            <table className='movie-table pure-table pure-table-striped'>
                <thead>
                <tr>{headings}</tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
        )
    }
})

// helper functions
var yearRegex = /[0-9]{4}/
function yearSorter(a,b){
    var c = this.state.sortColumn;
    var a_match = a.cells[c].match(yearRegex) || ['9999'];
    var b_match = b.cells[c].match(yearRegex) || ['9999'];
    if(this.state.sortAscending){
        return (a_match[0]+a.cells[c]).localeCompare(b_match[0]+b.cells[c]);
    }else{
         return (b_match[0]+b.cells[c]).localeCompare(a_match[0]+a.cells[c]);
    }
}

function stringSorter(a,b){
    var c = this.state.sortColumn;
    var a = a.cells[c];
    var b = b.cells[c];
    if(a.length < 2) a = '末';
    if(b.length < 2) b = '末';
    if(this.state.sortAscending){
        return a.localeCompare(b);
    }else{
         return b.localeCompare(a);
    }
}