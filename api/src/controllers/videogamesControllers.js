const { Videogame, Genre } = require('../db.js');
const { Op } = require('sequelize');
const getAllVideogamesAPI = require('../controllers/getAllVideogamesAPI.js');
const cleanData = require('../helpers/cleanData.js');
const getDetailAPI = require('../controllers/getDetailAPI.js');



const getAllVideogames = async () => {
    const allVideogames = await Videogame.findAll({ include: { model: Genre, through: { attributes: [] } } });

    const allVgDataAPI = await getAllVideogamesAPI();
    const allVideogamesAPI = cleanData(allVgDataAPI);

    return [  ...allVideogames, ...allVideogamesAPI ];   
};


const getVideogamesQuery = async (name) => {    
    const videogames = await Videogame.findAll({ where: { name: { [Op.iLike]: `%${name}%`} } });

    const allVideogames = await getAllVideogamesAPI();
    const filteredVideogamesAPI = allVideogames.filter((videogame) => (videogame.name).toLowerCase().includes(name.toLowerCase()));
    const filteredVideogames = cleanData(filteredVideogamesAPI);

    if (!videogames.length && !filteredVideogames.length) throw Error(`The videogame "${name}" doesn't exist`);

    return [ ...videogames, ...filteredVideogames ].slice(0, 15);
};


const getVideogameDetails = async (idVideogame, from) => {
    if (from === 'API') return await getDetailAPI(idVideogame);
    else return await Videogame.findByPk(idVideogame, { include: { model: Genre, attributes: ['name'], through: { attributes: [] } } });
};


const postVideogame = async (name, description, platforms, image, released, rating, genres) => {
    const newVideogame = await Videogame.create({ name, description, platforms, image, released, rating });
    await newVideogame.addGenres(genres);
    return newVideogame;
};



module.exports = {
    getAllVideogames,
    getVideogameDetails,
    getVideogamesQuery,
    postVideogame,
};