/** @jsx React.DOM */
'use strict'
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
        var sorted = this.props.data.table.slice().sort( (function(a,b){
            var c = this.state.sortColumn;
            return this.state.sortAscending ? a.cells[c].localeCompare(b.cells[c]) : b.cells[c].localeCompare(a.cells[c]);
        }).bind(this));
        var headings = this.props.data.headings.map(function(heading) {
            return (
                <th onClick={this.handleClick}>{heading}</th>
            )
        }, this);
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
            <table>
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