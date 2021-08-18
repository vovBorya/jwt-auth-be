const Users = require("../db/db").users;
const { verifyToken } = require("../middlewares/authJwt");

const getUsers = async (req, res) => {
    const users = await Users.findAll();

    res.send(users);
};

module.exports = app => {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/users",
        [verifyToken],
        getUsers
    );
};
