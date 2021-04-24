module.exports = (sequelize, type) => {
    return sequelize.define('event', {
        title: type.STRING(120),
        description: type.STRING,
        url: type.STRING(120),
        startDate: type.DATE,
        endDate: type.DATE
    }, {
        freezeTableName: true,
        underscored: true
    });
}
