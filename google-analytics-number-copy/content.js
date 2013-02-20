var fieldOffset = 20;
var fieldElm = createFieldElm();

function createFieldElm() {
	var elm = document.createElement('input');
	elm.setAttribute('id', 'googleAnalyticsNumberCopyField');
	document.body.appendChild(elm);
	return elm;
}

function showField(val) {
	fieldElm.style.visibility = 'visible';
	fieldElm.value = val;
	fieldElm.select();
	fieldElm.focus();
}

function hideField() {
	fieldElm.style.visibility = 'hidden';
}

document.body.addEventListener('mousemove', function (evt) {
	fieldElm.style.left = (evt.pageX + fieldOffset) + 'px';
	fieldElm.style.top = (evt.pageY + fieldOffset) + 'px';
});

document.body.addEventListener('mouseup', function () {
	var selection = document.getSelection();
	var content = selection.toString().replace(/[^\d.]/g, '');
	if (content) {
		showField(content);
	} else {
		hideField();
	}
});

document.body.addEventListener('keyup', function () {
	hideField();
});