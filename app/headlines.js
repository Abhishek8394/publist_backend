const HeadlineControllerClass = require("./controllers/HeadlineController");

var headlineController = new HeadlineControllerClass();

/**
 * Fetches headlines based on given offset and limit. By Default fetches everything.
 * @param  {int, optional} offset SQL offset
 * @param  {int, optional} limit  SQL limit
 * @return {Promise}        Promise that resolves to JSON array containing headlines
 */
async function getHeadlines(offset, limit) {
	return new Promise(async (resolve, reject) => {
		try {
			var results = await headlineController.getHeadlines(offset, limit);
			resolve(results);
		} catch (err) {
			reject(err);
		}
	});
}

module.exports = {
	getHeadlines: getHeadlines
};
