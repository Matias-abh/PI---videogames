const cleanData = (dataArray) => {

    return dataArray.map((videogame) => {
       
        const platformsData = videogame.platforms.map((plat) => plat.platform);       
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
            created: false,
       };
    });
};



module.exports = cleanData;