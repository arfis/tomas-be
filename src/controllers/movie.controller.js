import MovieService from '../services/movie.services';

const MovieController = {
    async getMovies(req, res, next) {
        // Validate request parameters, queries using express-validator

        let page = req.params.page ? req.params.page : 1;
        let limit = req.params.limit ? req.params.limit : 10;
        try {
            let movies = await MovieService.getMovies({}, page, limit)
            return res.status(200).json({status: 200, data: movies, message: "Succesfully got movies"});
        } catch (e) {
            return res.status(400).json({status: 400, message: e.message});
        }
    },

    async getMovie(req, res, next) {
        // Validate request parameters, queries using express-validator

        var page = req.params.page ? req.params.page : 1;
        var limit = req.params.limit ? req.params.limit : 10;
        console.log(req, req.params.id);

        try {
            let users = await MovieService.getMovie({_id: req.params.id}, page, limit)
            return res.status(200).json({status: 200, data: users, message: "Succesfully Products Retrieved"});
        } catch (e) {
            return res.status(400).json({status: 400, message: e.message});
        }
    },

    async findImdbMovie(req, res, next) {
        // Validate request parameters, queries using express-validator

        try {
           await MovieService.findMovie(req.params.imdbId).then(
                promiseDone => res.status(200).json(promiseDone),
                reject => res.status(400).json({status: 400, message: reject})
            );
            // return res.status(200).json({status: 200, data: foundMovie, message: "Succesfully Found movie"});
        } catch (e) {
            return res.status(400).json({status: 400, message: e.message});
        }
    },

    async addMovie(req, res, next) {
        try {
            let {movies, error} = await MovieService.addMovie(req.body);
            if (movies) {
                return res.status(200).json({data: movies});
            } else {
                console.log(error);
                return res.status(400).json(error)
            }
        } catch (e) {
            return res.status(400).json(JSON.parse(e))
        }
    }
}

export default MovieController;
