/**
 * Populates the articles table
 */

var articles = require("./data/headlines");
const TABLE_NAME = "articles";
const INSERT_QUERY =
	"INSERT INTO " +
	TABLE_NAME +
	"(id, article_url, title, description, original_json, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";

module.exports = function populateArticles(client) {
	client
		.query("TRUNCATE TABLE " + TABLE_NAME + " RESTART IDENTITY CASCADE;")
		.then(async () => {
			var article;
			var values;
			for (var i = 0; i < articles.length; i++) {
				article = articles[i];
				values = [
					article.id,
					article.url,
					article.title,
					article.description,
					article,
					new Date()
				];
				try {
					var inserted = await client.query(INSERT_QUERY, values);
					console.log(
						"Inserted article ",
						i + 1,
						"/",
						articles.length
					);
				} catch (err) {
					console.log("ERROR:", err);
					console.log("error inserting following item");
					console.log(article);
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
