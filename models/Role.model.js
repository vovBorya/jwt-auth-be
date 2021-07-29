const Sequelize = require("sequelize");

module.exports = sequelize => sequelize.define("Role", {
    name: Sequelize.STRING
},{
    tableName: "roles",
    timestamps: false
});
