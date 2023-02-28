const { Router } = require('express');
const videogamesRouter = Router();
const { getAllVideogamesHandler, getVideogameDetailsHandler, getVideogamesQueryHandler, postVideogameHandler } = require('../handlers/videogamesHandler.js');

const validatePostVg = (req, res, next) => {
    const { name, description, platforms, image, released, rating } = req.body;
    if ( !name || !description || !platforms || !image || !released || !rating) 
    return res.status(400).json({ error: error.message});
    next();
};









//***************************************************************/



// BORRAR ESTE IMPORT QUE ES PARA LA PRUEBA:
const { GameTest } = require('../db.js');
const clearData = require('../testRoutesBORRAR/clearData.js');
const TRAERVGAPI = require('../testRoutesBORRAR/TRAERVGAPI-TEST.js');
const { Op } = require('sequelize');
// ESTO VA A GUARDAR 2 PAG DE VIDEOGAMES EN LA DATABASE
// PARA USARLOS A MODO DE PRUEBA (PARA NO GASTAR SOLICITUDES):
// AL FINAL BORRAR ESTA LINEA:


// ESTÓ ME GUARDÓ LAS PRIMERAS PÁGINAS DE VIDEOGAMES EN LA DATABAS (por eso esta comentado):

// videogamesRouter.get('/test', async (req, res) => {
//     try {
//         const videogamesAPIRow = await TRAERVGAPI();
//         const videogamesAPI = await clearData(videogamesAPIRow);
//         videogamesAPI.map((game) => GameTest.create(game));
//         res.status(200).json(videogamesAPI);
//     } catch (error) {
//         res.status(400).json({ error: error.message });        
//     };
// });




// chekeando description: (llega undefined solamente cuando se hace la request de 20 videogames)
// ya lo caché, en las páginas no hay description, solamente en el detail de cada videogame
// 'emoji de me golpeo la frente'

// videogamesRouter.get('/', async (req, res) => {
//     try {
//         const videogamesAPI = await TRAERVGAPI();
//         console.log('descriptionAll----->', videogamesAPI);
//         res.status(200).json(videogamesAPI);
//     } catch (error) {
//         res.status(400).json({ error: error.message });        
//     };
// });





// RUTAS DE PRUEBA, PARA TESTEAR QUE LOS VG LLEGAN AL FRONT (desde database):

// traer todos los videogames '/videogames',
// traer todos los videogames buscados por query.

videogamesRouter.get('/test', async (req, res) => {
    const { name } = req.query;
    try {
        if (name) {
            const videogamesQuery = await GameTest.findAll({ where: { name: { [Op.iLike]: `%${name}%`} } });
            res.status(200).json(videogamesQuery);
        } else {
            const allVideogamesTest = await GameTest.findAll();
            res.status(200).json(allVideogamesTest);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
});

// traer todos el detail del videogame que coincida con el id.

videogamesRouter.get('/test/:gameId' , async (req, res) => {
    const { gameId } = req.params;

    // if (!idVideogame) throw Error('Id not received');
    // const from = isNaN(idVideogame) ? 'database' : 'API';

    try {
        const videogameDetails = await GameTest.findByPk(Number(gameId));
        res.status(200).json(videogameDetails)
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
});



videogamesRouter.post('/test', (req, res) => {
    const { name, description, platforms, image, released, rating, genres } = req.body;

    try {
        console.log('body----->', req.body)
        // if (name && description && platforms && image && released && rating && genres) throw new Error('FAKE ERROR - ERROR FROM BACK')
        const newGame = GameTest.create({ name, description, platforms, image, released, rating, genres });

        res.status(200).send('GAME CREATED SUCCESS - FROM BACK');
        // res.status(200).json(newGame);
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
   

});



//***************************************************************/








// DESCOMENTAR ESTAS RUTAS, CUANDO BORRO LO DE DE ARRIBA:

// videogamesRouter.get('/', getAllVideogamesHandler);
// videogamesRouter.get('/:idVideogame', getVideogameDetailsHandler);
// videogamesRouter.post('/', validatePostVg, postVideogameHandler);



module.exports = videogamesRouter;