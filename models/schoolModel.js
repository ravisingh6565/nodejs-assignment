const db = require('../config/db');

const addSchool = (name, address, latitude, longitude, callback) => {
    const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    db.query(query, [name, address, latitude, longitude], callback);
};

const listSchools = (callback) => {
    const query = 'SELECT * FROM schools';
    db.query(query, callback);
};

module.exports = {
    addSchool,
    listSchools
};
