const express = require('express');
const app = express();
const { config } = require('./config');

// Routes
const authApi = require('./routes/auth');

// Middlewares for error
const { wrapErrors, errorHandler } = require('./utils/middleware/errorHandler');
const notFoundHandler = require('./utils/middleware/notFoundHandler');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Endpoints
authApi(app);

// Not found routes
app.use(notFoundHandler);

app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`App listening at http://localhost:${ config.port }`);
});