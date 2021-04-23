module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        name: type.STRING(50),
        email: {
            type: type.STRING(50),
            unique: true
        },
        password: type.STRING
    }, {
        underscored: true
    });
}
