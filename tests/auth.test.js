const auth = require("../app/auth");
const UserController = require("../app/controllers/UserController");

var userController = new UserController();

beforeAll(async done => {
	var userInserted = await userController.createUser("test", "test");
	done();
});

afterAll(async done => {
	await userController.deleteUser("test");
	done();
});

test("auth fails on null user", async done => {
	expect(await auth.isAuthenticated(null, 1)).toBe(false);
	done();
});

test("auth fails on null token", async done => {
	expect(await auth.isAuthenticated("test", null)).toBe(false);
	done();
});

test("auth fails on invalid user", async done => {
	expect(await auth.isAuthenticated("invalid user", "token")).toBe(false);
	done();
});

test("auth passes on valid user", async done => {
	expect(await auth.isAuthenticated("test", "test")).toBe(true);
	done();
});
