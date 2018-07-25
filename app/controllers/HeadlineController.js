const db = require("../database");

class HeadlineController {
	constructor() {
		this.tableName = "articles";
	}

	/**
	 * Fetches headlines based on given offset and limit. By Default fetches everything.
	 * @param  {int, optional} offset SQL offset
	 * @param  {int, optional} limit  SQL limit
	 * @return {Promise}        Promise that resolves to JSON array containing headlines
	 */
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
