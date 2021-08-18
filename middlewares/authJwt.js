const jwt = require("jsonwebtoken");
const db = require("../db/db");

const Users = db.users;

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

const checkRole = role => async (req, res, next) => {
    const user = await Users.findByPk(req.userId);

    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === role) {
            next();
            return;
        }
    }

    res.status(403).send({
        message: "Require Admin Role!"
    });
};

const authJwt = {
    checkRole,
    verifyToken,
};

module.exports = authJwt;
