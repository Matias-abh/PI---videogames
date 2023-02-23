const axios = require('axios');
const { API_KEY } = process.env;
const { Genre } = require('../db.js');


const getAllGenresAPI = async () => {

    try{
        const dataAPI = (await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data.results;
        
        const allGenres = await dataAPI.map((genre) => {
            return {
                id: genre.id,
                name: genre.name,
            };
        });
        
        await allGenres.map((genre) => Genre.create(genre));
        
    } catch (error) {
        throw Error(error);
    };
};

module.exports = getAllGenresAPI;