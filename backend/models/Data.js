const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Data = sequelize.define('upload_data', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    pincode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: false
});

module.exports = Data;
