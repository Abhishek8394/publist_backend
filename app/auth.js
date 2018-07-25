const UserControllerClass = require("./controllers/UserController");
const userController = new UserControllerClass();

/**
 * Determines if  userId and token combo is valid or not.
 * @param  {String}  userId  user id
 * @param  {String}  token  token for the user
 * @return {Promise}        that resolves to true if valid id-token pair else false.
 */
async function isAuthenticated(userId, token) {
	return new Promise(async (resolve, reject) => {
		if (userId == null || token == null) {
			return resolve(false);
		}
		try {
			var user = await userController.getUser(userId);
			return resolve(user != null && user.token === token);
		} catch (err) {
			console.log(err);
		}
		return resolve(false);
	});
}

module.exports = {
	isAuthenticated: isAuthenticated
};
