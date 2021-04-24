const { Agenda } = require('../lib/sequelize');
const boom = require('@hapi/boom');

class AgendaService {
    async updateAgenda(agenda, id, userId) {
        const ownAgenda = await this.getOwnAgenda(id, userId);

        if (!ownAgenda) { throw boom.forbidden(); }

        await Agenda.update(agenda, {
            where: {
                id
            }
        });

        return Agenda.findByPk(id, {
            attributes: {
                exclude: ['userId']
            }
        });
    }

    async getOwnAgenda(id, userId) {
        return await Agenda.findOne({
            where: {
                id,
                userId
            }
        });
    }
}

module.exports = AgendaService;
