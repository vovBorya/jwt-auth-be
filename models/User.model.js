const Sequelize = require("sequelize");

module.exports = sequelize => sequelize.define("User", {
    role: Sequelize.STRING,
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    age: Sequelize.INTEGER,
},{
    tableName: "users",
    timestamps: false
});
