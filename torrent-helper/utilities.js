function getTorrentsList(node) {
	var result = [];
	var list = node.querySelectorAll('#searchResult tbody tr');
	if (list) {

		for (var i = 0, j = list.length; i < j; i++) {
			var cells = list[i].querySelectorAll('td');
			var seeders = cells[2].textContent;
			var leechers = cells[3].textContent;
			var score = ((seeders * 2) + (leechers * 1));
			var link = cells[1].querySelectorAll('a')[1].getAttribute('href');
			result.push({
				rowElm : list[i],
				link : link,
				seeders : seeders,
				leechers : leechers,
				score : score
			});
		}

		result.sort(function (a, b) {
			return b.score - a.score;
		});
		
	}
	return result;
}

function getAjaxData(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			callback(xhr.responseText);
		}
	};
	xhr.open("GET", url, true);
	xhr.send();
}