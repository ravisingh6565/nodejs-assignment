const schoolModel = require('../models/schoolModel');

const addSchool = (req, res) => {
    const { name, address, latitude, longitude } = req.body;
    if (!name || !address || !latitude || !longitude) return res.status(400).send('All fields are required.');
    schoolModel.addSchool(name, address, latitude, longitude, (err) => {
        if (err) return res.status(500).send('Database error.');
        res.status(201).send('School added successfully.');
    });
};

const listSchools = (req, res) => {
    const { userLat, userLong } = req.query;
    if (!userLat || !userLong) return res.status(400).send('User coordinates are required.');
    schoolModel.listSchools((err, results) => {
        if (err) return res.status(500).send('Database error.');
        results.forEach(school => {
            const distance = Math.sqrt(Math.pow(school.latitude - userLat, 2) + Math.pow(school.longitude - userLong, 2));
            school.distance = distance;
        });
        results.sort((a, b) => a.distance - b.distance);
        res.status(200).json(results);
    });
};

module.exports = {
    addSchool,
    listSchools
};
