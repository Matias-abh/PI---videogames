const { getAllVideogames, getVideogameDetails, getVideogamesQuery, postVideogame } = require('../controllers/videogamesControllers.js');

const getAllVideogamesHandler = async (req, res) => {
    const { name } = req.query;
    if (!name) {
        try {
            const allVideogames = await getAllVideogames();
            res.status(200).json(allVideogames);
        } catch (error) {
            res.status(400).json({ error: error.message });
        };
    } else {
        try {
            const videogames = await getVideogamesQuery(name);
            res.status(200).json(videogames)
        } catch (error) {
            res.status(400).json({ error: error.message });
        };
    };    
};



const getVideogameDetailsHandler = async (req, res) => {
    const { idVideogame } = req.params;
    
    try {
        if (!idVideogame) throw Error('Id not received');
        const from = isNaN(idVideogame) ? 'database' : 'API';
        const videogameDetails = await getVideogameDetails(idVideogame, from);
        res.status(200).json(videogameDetails)
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
};



const postVideogameHandler = async (req, res) => {
    const { name, description, platforms, image, released, rating, GenreId } = req.body;
    try {
        const newVideogame = await postVideogame(name, description, platforms, image, released, rating, GenreId);
        res.status(200).json(newVideogame)
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
};

module.exports = {
    getAllVideogamesHandler,
    getVideogameDetailsHandler,
    postVideogameHandler,
};