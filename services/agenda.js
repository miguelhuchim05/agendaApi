const { Agenda } = require('../lib/sequelize');

class AgendaService {
    async updateAgenda(agenda, id) {
        await Agenda.update(agenda, {
            where: {
                id
            }
        });

        return Agenda.findByPk(id);
    }
}

module.exports = AgendaService;
