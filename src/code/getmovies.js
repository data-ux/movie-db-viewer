var $ = require('jquery');

module.exports = function getMovies(callback){
	//$.getJSON("https://spreadsheets.google.com/feeds/list/16xOjTfqfETXF5Avppl4d-AjJOkDQKuHFdib6ZpHXmQQ/1/public/values?alt=json").done(parse);
	$.getJSON("test_data.json").done(parse);
	function parse(data) {
		var meat = {};
		var headings = [
			{key: 'nimi'},
			{key: 'valmistusvuosi', display: 'vuosi'},
			{key: 'kuvaus'},
			{key: 'tekijät'},
			{key: 'vimeo'},
			{key: 'kestohms'},
			{key: 'kuvausformaatti'},
			{key: 'väri'},
			{key: 'ääni'}
		];
		meat.table = data.feed.entry.map(function(e, i) {
			return {
				id: i,
				cells: headings.map(function(heading) {
					if(heading.key === 'kuvaus'){
						return e['gsx$' + heading.key].$t + ' ' + e['gsx$' + 'kurssikilpailujonkayhteydessätehty'].$t;
					}else{
						return e['gsx$' + heading.key].$t;
					}
				})
			};
		});
		meat.headings = headings.map(function(heading){
			return heading.display || heading.key;
		});
		callback(meat);
	}
}