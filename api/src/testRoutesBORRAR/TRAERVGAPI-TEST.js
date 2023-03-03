const axios = require('axios');
const { API_KEY } = process.env;

// LA ORIGINAL, TRAE 2 PAG DE LA API

const TRAERVGAPI = async () => {
    let allVideogamesAPI = [];
    try {
        for (let i = 1; i <= 5; i++) {
            const dataAPI = (await axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)).data.results;
                                          
            allVideogamesAPI = [ ...allVideogamesAPI, ...dataAPI];
        };
        return allVideogamesAPI;

    } catch (error) {
        throw Error(error);
    };    
};




//  todo elquilombo para traer description:

// const TRAERVGAPI = async () => {
//     let allVideogamesAPI = [];
//     let allVideogames = [];
//     try {
        // const dataAPI = (await axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`)).data.results;
        // const dataAPI = (await axios(`https://api.rawg.io/api/games/3498?key=${API_KEY}`)).data;
        // console.log('en el axios----->', dataAPI)
        // allVideogamesAPI.push(dataAPI);
        // allVideogamesAPI = [ ...allVideogamesAPI, ...dataAPI];

        // for (let game of allVideogamesAPI) {
        //     return await game?.name;
        // };

        // allVideogamesAPI.map( async (game) => await game.description_raw);

        // allVideogames = [ ...allVideogames, newGame]
        // allVideogamesAPI = allVideogamesAPI.map((game) => {
        //     const descriptionClean = typeof game.description_raw;
        //     return descriptionClean;

            // if (game) {
            //     const newGame = {
            //         id: game.id,
            //         name: game.name,
            //         description: game.description_raw
            //     };
            //     return newGame;
            // }
        // })
//         return allVideogamesAPI;

//     } catch (error) {
//         throw Error(error);
//     };    
// };

module.exports = TRAERVGAPI;
