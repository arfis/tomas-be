var mongoose = require('mongoose')

const MovieSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'TBT: No name entered']
    },
    picture: {
        type: String,
        required: [true, 'TBT: No picture entered']
    },
    description: {
        type: String,
        required: [true, 'TBT: No description entered']
    },
})

const Movie = mongoose.model('Movie', MovieSchema)

export default Movie;
