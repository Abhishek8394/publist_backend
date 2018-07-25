const db = require("../database");

class HeadlineController {
	constructor() {
		this.tableName = "articles";
	}

	async getHeadlines(offset = null, limit = null) {
		var offset = offset == null ? "0" : offset + "";
		var limit = limit == null ? "" : limit + "";
		var selectQuery =
			"SELECT title FROM " + this.tableName + " LIMIT $1 OFFSET $2";
		return new Promise((resolve, reject) => {
			var qResult = db.query(selectQuery, [limit, offset]);
			qResult.then(data => {
				if (data != null) {
					resolve(data["rows"]);
				}
			});
			qResult.catch(err => {
				reject(err);
			});
		});
	}
}

module.exports = HeadlineController;
