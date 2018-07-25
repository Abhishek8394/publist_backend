const Constants = require("./utils/constants");
var auth = require("./app/auth");
var headlines = require("./app/headlines");
var url = require("url");

const perPage = Constants.PER_PAGE;

/**
 * Main function. Currently the logic is small enough to confine here.
 * @param  {Request} req [description]
 * @param  {Response} res [description]
 * @return {JSON}     [description]
 */
async function main(req, res) {
	var userId = req.headers[Constants.USER_ID_HTTP_HEADER];
	var token = req.headers[Constants.TOKEN_HTTP_HEADER];
	var pageNumber;
	// extract page number from query/
	var urlParsed = url.parse(req.url, true);
	var query = urlParsed.query;
	try {
		pageNumber = parseInt(query[Constants.PAGE_NUM_REQ_PARM]);
	} catch (err) {
		console.log(err);
		pageNumber = 0;
	}

	if (await auth.isAuthenticated(userId, token)) {
		return await headlines.getHeadlines(pageNumber * perPage, perPage);
	} else {
		return { error: "invalid user!" };
	}
}

module.exports = main;
