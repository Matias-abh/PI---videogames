const { getAllGenres } = require('../controllers/genresControllers.js');

const getAllGenresHandler = async (req, res) => {

    try {
        const allGenres = await getAllGenres();
        res.status(200).json(allGenres);
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
};



module.exports = {
    getAllGenresHandler,
};