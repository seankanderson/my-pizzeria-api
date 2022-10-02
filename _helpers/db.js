const _ = require('lodash')
const config = require('../config.json');
const mongoose = require('mongoose');
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(global.__MONGO_URI__ || config.connectionString, connectionOptions);
//process.env.MONGODB_URI;
mongoose.Promise = global.Promise;

module.exports = {
    Account: require('../accounts/account.model'),
    Menu: require('../menu/menu.model'),
    RefreshToken: require('../accounts/refresh-token.model'),
    isValidId,
    removeEmptyOrNullIdIfExists,
    cleanup
};

function cleanup() {
    mongoose.connection.close()
}

function isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

function removeEmptyOrNullIdIfExists(entity) {
    const id = _.get(entity, '_id');
    if (id || id ==='') {
        if (!isValidId(id)) {
            delete entity._id
        }
    }
}