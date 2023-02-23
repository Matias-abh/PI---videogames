const { Videogame, Genre } = require('../db.js');
const getAllVideogamesAPI = require('../controllers/getAllVideogamesAPI.js');
const clearData = require('../utils/clearData.js');
const clearGameData = require('../utils/crearGameData.js');
const { Op } = require('sequelize');


const getAllVideogames = async () => {
    const allVideogames = await Videogame.findAll();

    const allVgDataAPI = await getAllVideogamesAPI();
    const allVideogamesAPI = clearData(allVgDataAPI);
    
    return [  ...allVideogames, ...allVideogamesAPI ];
};



const getVideogamesQuery = async (name) => {    
    const videogames = await Videogame.findAll({
        where: {
            name: { [Op.iLike]: `%${name}%`}
        }});
    
    const allVideogames = await getAllVideogames();
    const filteredVideogames = allVideogames.filter((videogame) => 
    (videogame.name).toLowerCase().includes(name.toLowerCase()));

    if (!videogames.length && !filteredVideogames.length) throw Error(`The videogame ${name} doesn't exist`);
    return [ ...videogames, ...filteredVideogames ].slice(0, 15);
};



const getVideogameDetails = async (idVideogame, from) => {
    if (from === 'API') {
        const videogame= await clearGameData(idVideogame);        
        // return crearGameData(videogame);
        return videogame;
    }   
    else return await Videogame.findByPk(idVideogame, { 
        include: {
            model: Genre,
            through: {
                attributes: [],
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
