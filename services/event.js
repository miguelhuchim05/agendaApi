const { Event, Agenda, User } = require('../lib/sequelize');
const boom = require('@hapi/boom');

class EventService {
    async getEvents(userId) {
        return await Event.findAll({
            where: {
                userId
            }
        });
    }

    async getEventById(id, userId) {
        return await Event.findOne({
            where: {
                id,
                userId
            },
            attributes: {
                exclude: ['userId']
            }
        });
    }

    async createEvent(eventBody) {
        const agenda = await Agenda.findOne({
            where: {
                userId: eventBody.userId
            }
        });

        if (agenda.lock) {
            throw boom.badRequest(
                'Your agenda is blocked and it is not possible to create events.' +
                ' Please unlock your calendar'
            );
        }

        return Event.create(eventBody, {
            include: [ User ]
        });
    }

    async updateEvent(eventBody, id, userId) {
        const userEvent = await this.getEventById(id, userId);

        if (!userEvent) { throw boom.forbidden(); }

        await Event.update(eventBody, {
            where: {
                id
            }
        });

        return Event.findByPk(id);
    }

    async deleteEvent(id, userId) {
        const userEvent = await this.getEventById(id, userId);

        if (!userEvent) { throw boom.forbidden(); }
        
        await Event.destroy({
            where: {
                id
            }
        });
    }
}

module.exports = EventService;
