exports.shorthands = undefined;

exports.up = pgm => {
	pgm.createTable("users", {
		id: "id",
		app_id: { type: "varchar(50)", notNull: true, unique: true },
		token: { type: "varchar(15)", notNull: true },
		created_at: {
			type: "timestamp",
			notNull: true,
			default: pgm.func("current_timestamp")
		}
	});

	pgm.createIndex("users", "app_id");
};

exports.down = pgm => {
	pgm.dropTable("users", { ifExists: true, cascade: true });
};
