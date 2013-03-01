function getRefList(callback) {
	var url = 'http://php.net/quickref.php';
	getAjaxData(url, function (result) {
		convertTxtToXml(result, function (doc) {
			var list = {};
			var items = doc.querySelectorAll('#quickref_functions a');
			for (var i = 0, j = items.length; i < j; i++) {
				list[items[i].textContent] = 'http://php.net/' + items[i].getAttribute('href');
			}
			callback(list);
		});
	});
}

function convertTxtToXml(text, callback) {
	var parser = new DOMParser();
	var doc = parser.parseFromString(text, "application/xml");
	callback(doc);
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

getRefList(function (refList) {

	chrome.omnibox.onInputChanged.addListener(
		function (text, callback) {
			var results = [];
			for (functionName in refList) {
				if (functionName.indexOf(text) > -1) {
					results.push({
						content : functionName,
						description : functionName
					});
				}
			}
			callback(results);
		}
	);

	chrome.omnibox.onInputEntered.addListener(
		function (text) {
			var url = refList[text] || 'http://www.php.net/search.php?pattern=' + text + '&show=quickref';
			chrome.tabs.query({active : true}, function (result) {
				chrome.tabs.update(result[0].id, {url : url});
			});
		}
	);

});