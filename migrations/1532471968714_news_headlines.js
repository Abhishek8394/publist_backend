exports.shorthands = undefined;

exports.up = pgm => {
	pgm.createTable("articles", {
		id: { type: "varchar(50)", primaryKey: true },
		article_url: { type: "text" },
		title: { type: "text" },
		description: { type: "text" },
		original_json: { type: "json" },
		created_at: {
			type: "timestamp",
			notNull: true,
			default: pgm.func("current_timestamp")
		}
	});
};

exports.down = pgm => {
	pgm.dropTable("articles", { ifExists: true, cascade: true });
};
