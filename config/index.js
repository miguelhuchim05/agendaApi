require('dotenv').config();

const config = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 3000,
    secretKey: process.env.SECRET_KEY,
    dbConnection: process.env.DB_CONNECTION,
    dbSync: process.env.DB_SYNC
}

module.exports = { config };