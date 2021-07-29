const Users = require("../db/db").users;

exports.findAll = async (req, res) => {
    const users = await Users.findAll();

    res.send(users);
};
