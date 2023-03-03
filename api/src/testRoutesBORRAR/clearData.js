

// ESTA FUNCIÓN ES PARA LA PRUEBA, BORRAR LUEGO----

const clearData = (dataArray) => {
    return dataArray.map((videogame) => {

        // AGREGAR GENRE NAMES
       
    // en caso de que las pataformas deban ser el objeto completo:
        const platformsData = videogame.platforms.map((plat) => plat.platform);        
        // en caso de que las plataformas muestren solo los nombres:
        const platformNames = platformsData.map((platform) => platform.name);        

        const genreNames = videogame.genres.map((genre) => genre.name);

        return {
        name: videogame.name,
        platforms: platformNames,
        image: videogame.background_image,
        released: videogame.released,
        rating: videogame.rating,
        genres: genreNames,
        created: false,
       };
    });
};

module.exports = clearData;