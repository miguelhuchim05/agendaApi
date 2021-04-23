const { User } = require('../lib/sequelize');

class UserService {
    async getUsers() {
        return await User.findAll({
            attributes: {
                exclude: ['password']
            }
        });
    }

    async getUserById(id) {
        return await User.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ['password']
            }
        });
    }

    async createUser(user) {
        return await User.create(user).then((user) => {
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
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
