const axios = require('axios');
const { API_KEY } = process.env;

const getAllVideogamesAPI = async () => {
    let allVideogamesAPI = [];

    try {
        for (let i = 1; i <= 10; i++) {
            const dataAPI = (await axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)).data.results;
                                          
            allVideogamesAPI = [ ...allVideogamesAPI, ...dataAPI];
        };

        return allVideogamesAPI;

    } catch (error) {
        throw Error(error);
    };    
};



module.exports = getAllVideogamesAPI;
