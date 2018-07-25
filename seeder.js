const { Client } = require("pg");
populateUsers = require("./seeds/populateUsers");
populateArticles = require("./seeds/populateArticles");
const dbConfig = require("./config/default").db;

const client = new Client(dbConfig);

var toPopulate = [populateUsers, populateArticles];

client.connect(err => {
	if (err) {
		console.log("Connection error:", err);
	} else {
		for (var i = 0; i < toPopulate.length; i++) {
			toPopulate[i](client);
		}
	}
});
