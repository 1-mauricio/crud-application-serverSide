const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MovieReview = new Schema({
    movieName: {
        type: String,
        required: true
    }, 
    movieReview: {
        type: String,
        required: true
    }
})

mongoose.model('movieReviews', MovieReview)