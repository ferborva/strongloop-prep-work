function callApiBase() {

	const options = {
		method: 'GET'
	};

	$.ajax('/api', options).then((data) => {console.log('DATA' + data)}, (err) => {console.log('ERR:' + err)});

}


$(function() {

	console.log('Web Ready to Rock!');

	const panel = document.getElementById('output-panel');

});