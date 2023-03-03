const { Genre } = require('../db.js');

const getAllGenres = async () => {
    return await Genre.findAll();
};



module.exports = {
    getAllGenres,
};