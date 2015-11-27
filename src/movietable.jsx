/** @jsx React.DOM */
'use strict'
var React = require('react')
module.exports = React.createClass({
    displayName: 'MovieTable',
    render: function(){
        var rows = this.props.data.map(function(row) {
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
                <tbody>
                {rows}
                </tbody>
            </table>
        )
    }
})