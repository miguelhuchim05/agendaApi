module.exports = (sequelize, type) => {
    return sequelize.define('agenda', {
        lock: {
            type: type.BOOLEAN,
            defaultValue: false
        }
    }, {
        freezeTableName: true,
        underscored: true
    });
}
