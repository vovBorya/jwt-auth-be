const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = require("../db/db");

const Op = db.Sequelize.Op;

const Users = db.users;
const Roles = db.roles;

exports.signIn = async (req, res) => {
    const { nameOrEmail, password } = req.body;

    console.log({ nameOrEmail, password })

    const user = await Users.findOne({
        where: {
            [Op.or]: {
                name: nameOrEmail,
                email: nameOrEmail
            }
        }
    });

    if (!user) {
        return res.status(404).send({
            message: "User not found"
        });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
        });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: 86400 // 24 hours
    });

    const { id, name, email, role } = user

    res.status(200).send({
        id,
        name,
        email,
        role,
        accessToken: token
    });
};

exports.signUp = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const users = await Users.findAll({
            where: {
                [Op.or]: {
                    name,
                    email
                }
            }
        });

        if (users && users.length) {
            res.status(409).send({
                message: "User with such name or email already exists"
            });
            return;
        }

        try {
            const user = await Users.create({
                name,
                role,
                email,
                password: bcrypt.hashSync(password, 8)
            });

            const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
                expiresIn: 86400 // 24 hours
            });

            const { id, name, email, role } = user

            res.status(200).send({
                id,
                name,
                email,
                role,
                accessToken: token
            });
        } catch (e) {
            console.error(e);
        }

    } catch (e) {
        res.status(500).send({ message: e.message });
    }
};
