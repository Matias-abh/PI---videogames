const { Router } = require('express');
const videogamesRouter = Router();
const { getAllVideogamesHandler, getVideogameDetailsHandler, postVideogameHandler } = require('../handlers/videogamesHandler.js');
const { validateIdVg, validatePostVg } = require('../middlewares/validatePostVg.js');

videogamesRouter.get('/', getAllVideogamesHandler);
videogamesRouter.get('/:idVideogame', validateIdVg, getVideogameDetailsHandler);
videogamesRouter.post('/', validatePostVg, postVideogameHandler);



module.exports = videogamesRouter;