const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        required: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        required: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    }
});

module.exports = User;
