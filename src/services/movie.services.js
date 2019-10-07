import Movie from '../models/movie.model';
import Crawler from 'crawler';

const MovieService = {
    findMovie(imdbId) {

        return new Promise((promiseDone, reject) => {
            let c = new Crawler({
                maxConnections: 10,
                // This will be called for each crawled page
                callback: function (error, res, done) {
                    if (error) {
                        console.log(error);
                        reject(error);
                    } else {
                        var $ = res.$;
                        // $ is Cheerio by default
                        //a lean implementation of core jQuery designed specifically for the server

                        const summary = $(".summary_text").text().trim();
                        const title = $(".title_wrapper").children('h1').text().trim();


                        promiseDone({
                            description: summary,
                            name: title
                        });
                    }

                    done();
                }
            });

            c.queue(`http://www.imdb.com/title/${imdbId}`);
        });
    },

    async getMovies(query, page, limit) {

        try {
            console.log('getting products ', query);
            var orders = await Movie.find(query);
            console.log('got products ', orders);

            return orders;
        } catch (e) {
            // Log Errors
            throw Error('Error while Paginating Products')
        }
    },

    async getMovie(query, page, limit) {

        try {
            console.log('getting products ', query);
            var orders = await Movie.find(query);
            console.log('got products ', orders);

            return orders;
        } catch (e) {
            // Log Errors
            throw Error('Error while Paginating Products')
        }
    },

    async addMovie(newMovie) {
        try {
            var movie = new Movie(newMovie);

            // save model to database
            let error = movie.validateSync();

            if (error) {
                return {error};
            }
            movie.save((err, order) => {
                if (err) return console.error(err);
                console.log(order.name + " saved to products collection.");
            });

            let movies = await Movie.find({});
            return {movies};

        } catch (e) {
            // Log Errors
            throw Error(e)
        }
    }
}

export default MovieService;
