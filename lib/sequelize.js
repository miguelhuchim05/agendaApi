const { Sequelize } = require('sequelize');
const { config } = require('../config');
const UserModel = require('../utils/models/user');
const AgendaModel = require('../utils/models/agenda');
const EventModel = require('../utils/models/event');

const sequelize = new Sequelize(config.dbConnection);

// Models
const User = UserModel(sequelize, Sequelize);
const Event = EventModel(sequelize, Sequelize);
const Agenda = AgendaModel(sequelize, Sequelize);

// Associations
User.hasMany(Event);
Event.belongsTo(User);

User.hasOne(Agenda);
Agenda.belongsTo(User);

if (config.dbSync === 'true') {
    sequelize.sync( { force: false })
        .then(() => {
            console.log('tables created.');
        });
}

module.exports = {
    sequelize,
    User,
    Agenda,
    Event
}