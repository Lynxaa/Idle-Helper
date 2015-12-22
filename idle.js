// NodeJS "STEAM-NODE" Helper
// This file is apart of the IDLE-HELPER collection made by Lynxaa. <M.I.T>
//
// http://steamcommunity.com/id/Lynxaa
// http://github.com/Lynxaa

var idleHelper = require('./idle-helper-v2');

var accounts = [
   {
	   username: "-",
	   password: "-",
	   two_factor_code: "-", // add support for this yourself
	   games: [
		   730,
	   ],
	   loggedIn: false, // not used - you'll need to figure out automatic relogging
	   writeSentry: true,
	   useSentry: true,
   },
];

var buildBot = function(index) {
	var account = accounts[index];
	idleHelper.idle({
		username: account.username,
		password: account.password,
		authcode: account.authcode,
		writeSentry: account.writeSentry,
		useSentry: account.useSentry,
		games: account.games,
		account.two_factor_code
	});
}

var start = function() {
	for (var index in accounts) {
		buildBot(index);
	}
}
