// NodeJS "STEAM-NODE" Helper
// This file is apart of the IDLE-HELPER collection made by Lynxaa. <M.I.T>
//
// http://steamcommunity.com/id/Lynxaa
// http://github.com/Lynxaa

var Steam = require('steam');
var EResult = require('./eresult.steamd');
var fs = require('fs');
var crypto = require('crypto');
var logToFile = true;

fs.truncate('IDLE-HELPER.log', 0, function() {
    fs.appendFile('IDLE-HELPER.log', '# IDLE-HELPER V2 LOG FILE.\r\n# SERVER logs and some ERROR logs will result in termination of the helper.\r\n# IDLE HELPER V2 by Lynxaa.\r\n\r\n', function (err) {
        if (err) {
            throw err;
        }
    });
});

var log = function(type, message) {
    var date = new Date();
    var now =   ((date.getHours() < 10) ? "0" : "") +
                date.getHours() + ":" +
                ((date.getMinutes() < 10) ? "0" : "") +
                date.getMinutes() + ":" +
                ((date.getSeconds() < 10) ? "0" : "") + date.getSeconds();

    var result = "";
    switch (type) {
        case 0:
            result = "[GENERAL][" + now + "]: " + message;
        break;

        case 1:
            result = "[ERROR][" + now + "]: " + message;
        break;

        case 2:
            result = "[SEVERE][" + now + "]: " + message;
        break;
    }

    console.log(result);

    fs.appendFile('IDLE-HELPER.log', result + "\r\n", function (err) {
        if (err) {
            throw err;
        }
    });
}

var makeSha = function(bytes) {
    var hash = crypto.createHash('sha1');
    hash.update(bytes);
    return hash.digest();
}

var shuffleArray = function(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}

var isNullOrUndefined = function(object) {
    return object === null || object === undefined;
}

module.exports = {
    makeSha: makeSha,
    shuffleArray: shuffleArray,
    log: log,
    isNullOrUndefined: isNullOrUndefined,
    idle: function(options) {
        if (this.isNullOrUndefined(options)) {
            this.log(1, "options aren't defined or are null.");
        }

        if (this.isNullOrUndefined(options.username) ||
            this.isNullOrUndefined(options.password) ||
            this.isNullOrUndefined(options.authcode) ||
            this.isNullOrUndefined(options.writeSentry) ||
            this.isNullOrUndefined(options.useSentry)) {
                this.log(2, "Some options are incomplete. [username/password/authcode/writeSentry/useSentry]");
            return;
        }

        var sentryFileHash = new Buffer(options.username).toString('base64') + ".sentry";
    	var bot = new Steam.SteamClient();
        var user = new Steam.SteamUser(bot);
    	var friends = new Steam.SteamFriends(bot);

        if (fs.existsSync(sentryFileHash) && options.useSentry) {
    		var sentry = fs.readFileSync(sentryFileHash);
    		this.log(0, "Logging in with sentry file. [U: " + options.username + ", SHA: " + sentryFileHash + "]");

    		bot.connect();
    		bot.on('connected', function() {
    			user.logOn({
    				account_name: options.username,
    				password: options.password,
    				sha_sentryfile: makeSha(sentry)
    			});
    		});
    	} else {
            this.log(0, "Logging in without sentry file. [U: " + options.username + "]");
            console.log("Logging in without sentry file. [U: " + options.username + "]");

    		bot.connect();
    		bot.on('connected', function() {
                if (options.authcode.length <= 1) {
                    log(0, "Attempting to log in without authcode. [U: " + options.username + "]");
                    console.log("Attempting to log in without authcode. [U: " + options.username + "]");

                    user.logOn({
                        account_name: options.username,
                        password: options.password
                    });
                } else {
                    log(0, "Attempting to log in with authcode. [U: " + options.username + "]");
                    console.log("Attempting to log in with authcode. [U: " + options.username + "]");

                    user.logOn({
                        account_name: options.username,
        				password: options.password,
        				auth_code: options.authcode
        			});
                }
    		});
    	}

        bot.on('logOnResponse', function(logonResp) {
    		if (logonResp.eresult == Steam.EResult.OK) {
    			log(0, "Successfully logged in. [U: " + options.username + "]");
                console.log("Successfully logged in. [U: " + options.username + "]");
    			friends.setPersonaState(Steam.EPersonaState.Online);
    			var gamesPlayed = [];
    			for (var i = 0; i < options.games.length; i++) {
    				gamesPlayed[i] = {
    					game_id: '' + options.games[i] + ''
    				};
    			}

    			user.gamesPlayed({
    				games_played: shuffleArray(gamesPlayed)
    			});
    		} else {
                console.log("An error occured while logging in. ERROR: " + EResult.getResult(logonResp.eresult));
            }
    	}).on('sentry', function(sentry) {
    		if (options.writeSentry) writeFileSync(sentryFileHash, sentry);
    	});

    	user.on('updateMachineAuth', function(response, callback) {
            if (options.writeSentry) {
                log(0, "Wrote sentry hash to file. [U: " + options.username + ", SHA: " + sentryFileHash + "]");
                console.log("Wrote sentry hash to file. [U: " + options.username + ", SHA: " + sentryFileHash + "]");
        		fs.writeFileSync(sentryFileHash, response.bytes);
        		callback({ sha_file: makeSha(response.bytes) });
            }
    	});

        bot.on('error', function(errorResp) {
    		log(0, "An error occured. (" + JSON.stringify(errorResp) + ") [U: " + options.username + "]");
            console.log("An error occured. (" + JSON.stringify(errorResp) + ") [U: " + options.username + "]");
    	});
    }
};
