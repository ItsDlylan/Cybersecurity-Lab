const bcrypt = require('bcryptjs');
const users = [];

module.exports = {
	login: (req, res) => {
		const { username, password } = req.body;
		// console.log(`this is the password Hash ${passwordHash}`);
		for (let i = 0; i < users.length; i++) {
			if (
				users[i].username === username &&
				bcrypt.compareSync(password, users[i].passwordHash)
			) {
				let userToReturn = { ...users[i] };
				delete userToReturn.passwordHash;
				res.status(200).send(userToReturn);
				return;
			}
		}
		res.status(400).send('User not found.');
	},
	register: (req, res) => {
		let { username, email, firstName, lastName, password } = req.body;
		const salt = bcrypt.genSaltSync(5);
		const passwordHash = bcrypt.hashSync(password, salt);

		let userObj = {
			username,
			email,
			firstName,
			lastName,
			passwordHash,
		};

		users.push(userObj);
		let userToReturn = { ...userObj };
		delete userToReturn.passwordHash;
		res.status(200).send(userToReturn);
	},
};
