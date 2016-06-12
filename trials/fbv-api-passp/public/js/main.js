// Application namespace

const myApp = {};


function externalAuthManager (state, user, token) {
	const externalAuth = {
		success: state === 'success' ? true : false,
		user,
		token
	};
	if (externalAuth.token) {
		myApp.token = externalAuth.token;
		$('#user-login-controls').addClass('hide');
		$('#api-control-block').removeClass('hide');
	}
	myApp.externalAuth = externalAuth;
};

// DOM Ready and Loaded

$(function() {

	console.log('Web Ready to Rock!');

	myApp.panel = document.getElementById('output-panel');

	myApp.panelBlock();
	myApp.panelAdd('Hello world!');
	myApp.panelBlock();

});

// API Call functions

myApp.verifyApi = function verifyApi() {

	const options = {
		method: 'GET'
	};

	$.ajax('/api', options).then((data) => {
		myApp.panelAdd(data);
		myApp.panelBlock();
	}, (err) => {
		myApp.panelAdd(err);
		myApp.panelBlock();
	});

}


// Form Sending

myApp.newUser = function newUser () {

	const userFormData = {
		'form-email': $('#form-email')[0].value,
		'form-password': $('#form-password')[0].value
	}

	const options = {
		method: 'POST',
		data: userFormData
	}

	$.ajax('/api/newUser', options).then((data) => {
		myApp.panelJsonDump(data);
		myApp.panelBlock();
	}, (err) => {
		myApp.panelAdd(err);
		myApp.panelBlock();
	}).always(() => {
		// Abstract
	});
};


myApp.authenticateUser = function newUser () {

	const userFormData = {
		'form-email': $('#login-email')[0].value,
		'form-password': $('#login-password')[0].value
	}

	const options = {
		method: 'POST',
		data: userFormData
	}

	$.ajax('/api/auth', options).then((data) => {
		const jsonData = JSON.parse(data);
		if (jsonData.token) {
			console.log('I have received a token')
			myApp.token = jsonData.token;
			$('#user-login-controls').addClass('hide');
			$('#api-control-block').removeClass('hide');
		}
		myApp.panelJsonDump(data);
		myApp.panelBlock();
	}, (err) => {
		myApp.panelAdd(err);
		myApp.panelBlock();
	}).always(() => {
		// Abstract
	});
};


myApp.githubLogin = function githubLogin (){
	window.open('http://localhost:3000/api/githubAuth', '', 'width=1000,height=800');
}

// API Calls

/**
 * Get User Profile Data Call
 */
myApp.getProfileData = function newUser () {

	const options = {
		method: 'GET',
		headers: {
			'X-Access-Token': myApp.token
		}
	}

	$.ajax('/api/getProfileData', options).then((data) => {
		myApp.panelJsonDump(data);
		myApp.panelBlock();
	}, (err) => {
		myApp.panelAdd(err);
		myApp.panelBlock();
	}).always(() => {
		// Abstract
	});
};


// Panel Util Funtions

myApp.panelAdd = function panelAdd (string) {
	let par = document.createElement('p');

	par.innerHTML = string;
	myApp.panel.insertBefore( par, myApp.panel.firstChild );
}

myApp.panelBlock = function panelBlock () {
	let parSep = document.createElement('p');

	parSep.innerHTML = '-------------------------';
	myApp.panel.insertBefore( parSep, myApp.panel.firstChild );
}

myApp.clearPanel = function clearPanel () {
	myApp.panel.innerHTML = '> Clean start';
} 


myApp.panelJsonDump = function panelJsonDump (string) {
	var dump = prettyPrint( JSON.parse(string) );
	myApp.panel.insertBefore( dump, myApp.panel.firstChild );
}

