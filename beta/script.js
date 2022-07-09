

// BEP
var service;


function setUp() {
	service = new BEP();
	service.init();
	openForm(1);
}

function getLId(id) {
	return document.getElementById(id);
}
function showLId(id) {
	getLId(id).style.display = 'block';
}
function hideLId(id) {
	getLId(id).style.display = 'none';
}

function allHideForm() {
	hideLId('timer');
	hideLId('scripter');
	hideLId('option');
}
function openForm(n) {
	allHideForm();
	switch(n) {
		case 1:
			showLId('timer');
			break;
		case 2:
			showLId('scripter');
			break;
		case 3:
			showLId('option');
			break;
	}
}

























