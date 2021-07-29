const db = require("../db/db");

const { ROLES, users: Users } = db

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    // Username
    let user = Users.findOne({
        where: {
            name: req.body.login
        }
    });

    if (user) {
        res.status(400).send({
            message: "Failed! Username is already in use!"
        });
        return;
    }

    user = Users.findOne({
        where: {
            email: req.body.login
        }
    });

    if (user) {
        res.status(400).send({
            message: "Failed! Email is already in use!"
        });
        return;
    }

    next();
};

const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: "Failed! Role does not exist = " + req.body.roles[i]
                });
                return;
            }
        }
    }

    next();
};

const verifySignUp = {
    checkRolesExisted,
    checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;
