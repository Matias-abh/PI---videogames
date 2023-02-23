const { Genre } = require('../db.js');

const getAllGenres = async () => {
    const allGenres = await Genre.findAll({ attributes: ['name']});
    return allGenres;
};

module.exports = {
    getAllGenres,
};