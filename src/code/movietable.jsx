/** @jsx React.DOM */
'use strict'
require("../css/movietable.css")
var React = require('react')
module.exports = React.createClass({
    displayName: 'MovieTable',
    getInitialState: function(){
        return {
            sortColumn: 0,
            sortAscending : true,
            openedRow: null
        };
    },
    headerClick: function(SynthEvent, id){
        var col = parseInt(id.slice(-1));
        this.setState({
            sortColumn: col,
            sortAscending: this.state.sortColumn === col ? !this.state.sortAscending : this.state.sortAscending
        });
    },
    rowClick: function(SynthEvent, id){
        var key = parseInt(id.split('$')[1]);
        if(this.state.openedRow === key){
            this.setState({openedRow: null});
        }else{
            this.setState({openedRow: key});
        }
    },
    render: function(){
        var headings = this.props.data.headings.slice(0, this.props.mainCols).map(function(heading, i) {
            var className = '';
            if(this.state.sortColumn === i){
                className = this.state.sortAscending ? 'sort-ascending' : 'sort-descending';
            }
            return (
                <th className={className} onClick={this.headerClick}>{heading}</th>
            )
        }, this);
        var sorted;
        if(this.props.data.headings[ this.state.sortColumn ] === 'valmistusvuosi'){
            sorted = this.props.data.table.slice().sort(yearSorter.bind(this));
        }else{
            sorted = this.props.data.table.slice().sort(stringSorter.bind(this));
        }
        var openedLocation;
        var rows = sorted.map(function(row, index) {
            if(this.state.openedRow === row.id) openedLocation = index+1;
            var cells = row.cells.slice(0, this.props.mainCols).map(function(cell){
                return (
                    <td>{cell}</td>
                )
            });
            return (
                <tr className={'normal-row' + (index%2 ? '': ' dark-row')} key={row.id} onClick={this.rowClick}>
                {cells}
                </tr>
            );
        }, this);
        if(openedLocation >= 0){
            rows.splice(openedLocation, 0, (
            <tr key="orow" className={'opened-row'+(openedLocation%2 ? ' dark-row': '')}><td colSpan={this.props.mainCols}>
            {this.props.data.headings.slice(this.props.mainCols).map(function(e, i){
                var value = sorted[openedLocation].cells[i+this.props.mainCols];
                if(value === '') return null;
                return <span>{e + ': ' + value}</span>
            }, this)}
            </td></tr>));
        }
        return (
            <table className='movie-table pure-table'>
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