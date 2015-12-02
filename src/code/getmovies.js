var $ = require('jquery');

module.exports = function getMovies(callback){
	//$.getJSON("https://spreadsheets.google.com/feeds/list/16xOjTfqfETXF5Avppl4d-AjJOkDQKuHFdib6ZpHXmQQ/1/public/values?alt=json").done(parse);
	$.getJSON("test_data.json").done(parse);
	function parse(data) {
		var meat = {};
		meat.headings = [
			'nimi',
			'valmistusvuosi',
			'synopsis',
			'tekijät',
			'kestohms',
			'kuvausformaatti',
			'väri',
			'ääni',
			'vimeo'
		];
		meat.table = data.feed.entry.map(function(e, i) {
			return {
				id: i,
				cells: meat.headings.map(function(heading) {
					return e['gsx$' + heading].$t
				})
			};
		});
		callback(meat);
	}
}