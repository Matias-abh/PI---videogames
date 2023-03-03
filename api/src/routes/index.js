const { Router } = require('express');
const videogamesRouter = require('./videogamesRouter.js');
const genresRouter = require('./genresRouter.js');

const router = Router();

router.use('/videogames', videogamesRouter);
router.use('/genres', genresRouter);



module.exports = router;
