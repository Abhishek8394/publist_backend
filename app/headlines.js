const HeadlineControllerClass = require("./controllers/HeadlineController");

var headlineController = new HeadlineControllerClass();

async function getHeadlines(offest, limit) {
	return new Promise(async (resolve, reject) => {
		try {
			var results = await headlineController.getHeadlines(offest, limit);
			resolve(results);
		} catch (err) {
			reject(err);
		}
	});
}

module.exports = {
	getHeadlines: getHeadlines
};
