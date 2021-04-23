const { Sequelize } = require('sequelize');
const { config } = require('../config');
const UserModel = require('../utils/models/user');

const sequelize = new Sequelize(config.dbConnection);

// Models
const User = UserModel(sequelize, Sequelize);

if (config.dbSync === 'true') {
    sequelize.sync( { force: false })
        .then(() => {
            console.log('tables created.');
        });
}

module.exports = {
    sequelize,
    User
}