const axios = require('axios');
const { API_KEY } = process.env;

const clearGameData = async (idVideogame) => {

    const videogameData = (await axios(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`)).data;
   
        // en caso de que las pataformas deban ser el objeto completo:
        const platformsData = videogameData.platforms.map((plat) => plat.platform);
           
        // en caso de que las plataformas muestren solo los nombres:
        const platformNames = platformsData.map((platform) => platform.name);
           
        const genreNames = videogameData.genres.map((genre) => genre.name);
   
    return {
        id: videogameData.id,
        name: videogameData.name,
        description: videogameData.description,
        platforms: platformNames,
        image: videogameData.background_image,
        released: videogameData.released,
        rating: videogameData.rating,
        genres: genreNames,
        created: false
    };
};

module.exports = clearGameData;


