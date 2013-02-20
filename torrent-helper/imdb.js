var title = document.querySelector('h1.header span.itemprop').textContent;
var year = document.querySelector('h1.header a').textContent;
var url = 'http://thepiratebay.se/search/' + title + ' ' + year + '/0/99/200';

getAjaxData(url, function (result) {
	var dummy = document.createElement('div');
	dummy.innerHTML = result;
	var torrentsList = getTorrentsList(dummy);
	
	if (torrentsList) {
		var linkElm = document.createElement('a');
		linkElm.setAttribute('href', torrentsList[0].link);
		linkElm.innerHTML = 'Download torrent';
		document.querySelector('h1.header').appendChild(linkElm);
	}
});