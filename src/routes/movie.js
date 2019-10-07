import MovieController from '../controllers/movie.controller';
import express from 'express';
import { authJwt } from "../services/auth.service";

var router = express.Router();

router.get('/', MovieController.getMovies);
router.post('/', MovieController.addMovie);
router.post('/findImdb/:imdbId', MovieController.findImdbMovie);
router.get('/hello', authJwt, (req, res) => {
    res.send('This is a private route!!!!');
});
router.get('/:id', MovieController.getMovie);

export default router;
