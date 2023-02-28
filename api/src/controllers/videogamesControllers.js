const { Videogame, Genre } = require('../db.js');
const getAllVideogamesAPI = require('../controllers/getAllVideogamesAPI.js');
const clearData = require('../helpers/clearData.js');
const clearGameData = require('../helpers/crearGameData.js');
const { Op } = require('sequelize');


const getAllVideogames = async () => {
    const allVideogames = await Videogame.findAll();

    try {
        const allVgDataAPI = await getAllVideogamesAPI();
        const allVideogamesAPI = clearData(allVgDataAPI);
        return [  ...allVideogames, ...allVideogamesAPI ];
    } catch (error) {
        throw Error(error);
    };    
};



const getVideogamesQuery = async (name) => {    
    const videogames = await Videogame.findAll({
        where: {
            name: { [Op.iLike]: `%${name}%`}
        }});

    // try catch ??? !!!!!!!!!!!

    const allVideogames = await getAllVideogamesAPI();
    const filteredVideogames = allVideogames.filter((videogame) => 
    (videogame.name).toLowerCase().includes(name.toLowerCase()));

    if (!videogames.length && !filteredVideogames.length) throw Error(`The videogame ${name} doesn't exist`);
    return [ ...videogames, ...filteredVideogames ].slice(0, 15);
};



const getVideogameDetails = async (idVideogame, from) => {
    if (from === 'API') {
        const videogame = await clearGameData(idVideogame);      
        return videogame;
    }   
    else return await Videogame.findByPk(idVideogame, { 
        include: {
            model: Genre,
            through: {
                // attributes: [],
            },
        }});
};



const postVideogame = async (name, description, platforms, image, released, rating, GenreId) => {
    const newVideogame = await Videogame.create({ name, description, platforms, image, released, rating });
    await newVideogame.addGenres(GenreId);
    return newVideogame;
};

module.exports = {
    getAllVideogames,
    getVideogameDetails,
    getVideogamesQuery,
    postVideogame,
};





// por query directamente a la API:
    // const videogamesAPI = (await axios(`https://api.rawg.io/api/games/${name}?key=${API_KEY}`)).data;
