const { User, Agenda } = require('../lib/sequelize');

class UserService {
    async getUsers() {
        return await User.findAll({
            attributes: {
                exclude: ['password']
            },
            include: [{
                model: Agenda,
                attributes: ['id', 'lock']
            }]
        });
    }

    async getUserById(id) {
        return await User.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ['password']
            },
            include: [{
                model: Agenda,
                attributes: ['id', 'lock']
            }]
        });
    }

    /**
     * Creates a user with an assigned agenda.
     *
     * @param user
     * @returns {Promise<*>}
     */
    async createUser(user) {
        user.agenda = [];

        return await User.create(user, {
            include: [ Agenda ]
        }).then((user) => {
            console.log(user);
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                agenda: {
                    id: user.agenda.id,
                    lock: user.agenda.lock
                }
            }
        });
    }

    async deleteUserById(id) {
        await User.destroy({
            where: {
                id
            }
        });
    }
}

module.exports = UserService;
