/** @jsx React.DOM */
'use strict'
require("../css/movietable.css")
var React = require('react')
var VimeoThumb= require('./vimeothumb')

module.exports = React.createClass({
    displayName: 'MovieTable',
    getInitialState: function(){
        return {
            sortColumn: 1,
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
        if(this.props.data.headings[ this.state.sortColumn ] === 'vuosi'){
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
        var vimeoColumn = this.props.data.headings.indexOf('vimeo');
        var hasVimeoThumb = false;
        if(openedLocation >= 0){
            if(vimeoColumn >= 0 && sorted[openedLocation-1].cells[vimeoColumn].length > 0){
                hasVimeoThumb = true;
            }
            rows.splice(openedLocation, 0, (
            <tr key={"orow" + sorted[openedLocation-1].id} className={'opened-row'+(openedLocation%2 ? ' dark-row': '')}><td colSpan={this.props.mainCols} className={hasVimeoThumb ? 'hasThumb' : null}>
            {this.props.data.headings.slice(this.props.mainCols).map(function(heading, i){
                var value = sorted[openedLocation-1].cells[i+this.props.mainCols];
                if(value.trim() === '') return null;
                switch(heading){
                    case 'vimeo':
                        return <VimeoThumb videoId={value.split('/').pop()} />
                    case 'rooleissa':
                        if(value.trim().length > 1 ){
                            return (<span><br />{'Rooleissa: ' + value}</span>)
                        }else{
                            return null;
                        }
                    default:
                        return <span>{value}</span>
                }
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
    var result;
    if(this.state.sortAscending){
        result = (a_match[0]+a.cells[c]).localeCompare(b_match[0]+b.cells[c]);
    }else{
        result = (b_match[0]+b.cells[c]).localeCompare(a_match[0]+a.cells[c]);
    }
    if (result === 0 && c !== 0){
        return a.cells[0].localeCompare(b.cells[0]);
    }else{
        return result;
    }
}

function stringSorter(a,b){
    var c = this.state.sortColumn;
    var ac = a.cells[c];
    var bc = b.cells[c];
    if(ac.trim().length === 0) ac = '末';
    if(bc.trim().length === 0) bc = '末';
    var result;
    if(this.state.sortAscending){
        result = ac.localeCompare(bc);
    }else{
        result = bc.localeCompare(ac);
    }
    if (result === 0 && c !== 0){
        return a.cells[0].localeCompare(b.cells[0]);
    }else{
        return result;
    }
}