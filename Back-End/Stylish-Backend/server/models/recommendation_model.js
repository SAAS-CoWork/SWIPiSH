require('dotenv').config();
const { pool } = require('./mysqlcon');
const jwt = require('jsonwebtoken');

const USER_ROLE = {
    ALL: -1,
    ADMIN: 1,
    USER: 2,
    VIPUSER: 3
};




module.exports = {
    USER_ROLE
};