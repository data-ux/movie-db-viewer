var $ = require('jquery');

module.exports = function getMovies(callback){
	//$.getJSON("https://spreadsheets.google.com/feeds/list/16xOjTfqfETXF5Avppl4d-AjJOkDQKuHFdib6ZpHXmQQ/1/public/values?alt=json").done(parse);
	$.getJSON("test_data.json").done(parse);
	function parse(data) {
		var meat = data.feed.entry.map(function(e, i) {
			return {
				id: i,
				cells: [
					e.gsx$valmistusvuosi.$t,
					e.gsx$nimi.$t,
					e.gsx$synopsis.$t,
					e.gsx$tekijät.$t
				]
			};
		});
		callback(meat);
	}
}