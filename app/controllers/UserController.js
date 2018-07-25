const db = require("../database");

class UserController {
	constructor() {
		this.tableName = "users";
	}

	async createUser(userId, token) {
		if (userId == null || token == null) {
			throw new Error(
				"Invalid userId and token provided for create user"
			);
		}
		return db.query(
			"INSERT INTO " +
				this.tableName +
				" (user_id, token) VALUES($1, $2) RETURNING *",
			[userId, token]
		);
	}

	async deleteUser(userId) {
		if (userId == null) {
			throw new Error("Cannot delete null user");
		}
		return db.query("DELETE FROM " + this.tableName + " WHERE user_id=$1", [
			userId
		]);
	}

	/**
	 * Get a user based on user ID
	 * @param  {String} userId User id by which to search.
	 * @return {JSON}       JSON representation of a user object
	 */
	async getUser(userId) {
		// Wrap in a promise because we need to return user object instead of total query result.
		// Need an ORM for User Model but for now this will have to work.
		return new Promise((resolve, reject) => {
			var query = db.query(
				"SELECT * FROM " + this.tableName + " where user_id=$1",
				[userId]
			);
			query.then(result => {
				if (result == null || result["rows"].length > 1) {
					reject(
						new Error("Null returned or too many rows returned")
					);
				} else {
					resolve(result["rows"][0]);
				}
			});

			query.catch(err => {
				throw err;
			});
		});
	}
}

module.exports = UserController;
