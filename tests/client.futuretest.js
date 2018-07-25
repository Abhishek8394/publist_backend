const request = require("request");
const Constants = require("../utils/constants");

function makeHeadlineRequest(userId, token) {
	var headers = {};
	headers[Constants.USER_ID_HTTP_HEADER] = userId;
	headers[Constants.TOKEN_HTTP_HEADER] = token;
	return request({
		url: "http://" + Constants.HEADLINE_HOST,
		headers
	});
}
