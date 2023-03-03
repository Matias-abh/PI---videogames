const axios = require('axios');
const { API_KEY } = process.env;
const { Genre } = require('../db.js');


const getAllGenresAPI = async () => {

    const allGenresDb = await Genre.findAll();

    if (!allGenresDb.length) {
        try {
            const dataAPI = (await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data.results;        
            const allGenres = await dataAPI.map((genre) => {
            return {
                id: genre.id,
                name: genre.name,
            };
        });        
        await allGenres.map((genre) => Genre.create(genre));
        
        } catch (error) {
            throw new Error(error);
        };
    } else return;
};



module.exports = getAllGenresAPI;