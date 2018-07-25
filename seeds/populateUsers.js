var users = require("./data/userData");
module.exports = function populateUsers(client) {
	console.log(users);
};
const TABLE_NAME = "users";
const INSERT_QUERY =
	"INSERT INTO " +
	TABLE_NAME +
	"(id, app_id, token, created_at) VALUES ($1, $2, $3, $4) RETURNING *";

module.exports = function populateArticles(client) {
	client
		.query("TRUNCATE TABLE " + TABLE_NAME + " RESTART IDENTITY CASCADE;")
		.then(async () => {
			var user;
			var values;
			for (var i = 0; i < users.length; i++) {
				user = users[i];
				values = [user.id, user.appId, user.token, new Date()];
				try {
					var inserted = await client.query(INSERT_QUERY, values);
					console.log("Inserted user ", i + 1, "/", users.length);
				} catch (err) {
					console.log("ERROR:", err);
					console.log("error inserting following item");
					console.log(user);
				}
			}
		})
		.catch(err => {
			if (err) {
				console.log("error dropping table");
				throw err;
			}
		});
};
