const Constants = require("./utils/constants");
var auth = require("./app/auth");
var headlines = require("./app/headlines");

async function main(req, res) {
	var userId = req.headers[Constants.USER_ID_HTTP_HEADER];
	var token = req.headers[Constants.TOKEN_HTTP_HEADER];

	if (await auth.isAuthenticated(userId, token)) {
		return await headlines.getHeadlines(0, 10);
	} else {
		return { error: "invalid user!" };
	}
}

module.exports = main;
