const validateIdVg = (req, res, next) => {
    const { idVideogame } = req.params;
    if (!idVideogame) return res.status(200).json({ error: 'Missing videogame id' });
    next();
};

const validatePostVg = (req, res, next) => {
    const { name, description, platforms, image, released, rating, genres } = req.body;
    if ( !name || !description || !platforms || !image || !released || !rating || !genres) return res.status(400).json({ error: 'Missing data!' });
    next();
};


module.exports = {
    validatePostVg,
    validateIdVg,
};