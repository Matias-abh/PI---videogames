const clearData = (dataArray) => {
    return dataArray.map((videogame) => {
       
    // en caso de que las pataformas deban ser el objeto completo:
        const platformsData = videogame.platforms.map((plat) => plat.platform); 
       
    // en caso de que las plataformas muestren solo los nombres:
        const platformNames = platformsData.map((platform) => platform.name);
       
        const genreNames = videogame.genres.map((genre) => genre.name);

        return {
        id: videogame.id,
        name: videogame.name,
        description: videogame.description,
        platforms: platformNames,
        image: videogame.background_image,
        released: videogame.released,
        rating: videogame.rating,
        genres: genreNames,
        api: true,
       };
    });
};

module.exports = clearData;