var torrentsList = getTorrentsList(document.body);

if (torrentsList) {
	var listBody = document.querySelector('#searchResult tbody');
	for (var i = 0, j = torrentsList.length; i < j; i++) {
		listBody.appendChild(torrentsList[i].rowElm);
	}
}
