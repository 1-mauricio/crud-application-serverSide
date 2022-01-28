const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("./models/MovieReview");
const MovieReview = mongoose.model("movieReviews");

//db connection
mongoose
    .connect("mongodb://localhost/crudDB")
    .then(() => console.log("conexao feita com sucesso"))
    .catch((err) => console.log("erro na conexao " + err));

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
    MovieReview.find()
        .lean()
        .then((reviews) => res.send(reviews));
});
app.post("/api/insert", (req, res) => {
    const newReview = {
        movieName: req.body.movieName,
        movieReview: req.body.movieReview,
    };
    new MovieReview(newReview)
        .save()
        .then((result) => console.log("salvo com sucesso"))
        .catch((err) => console.log("erro " + err));
});

app.delete("/api/delete/:movieName", (req, res) => {
    const name = req.params.movieName;

    MovieReview.deleteOne({ movieName: name })
        .then(() => console.log("removido com sucesso"))
        .catch((e) => console.log("erro ao remover"));
});

app.put("/api/update", (req, res) => {
    const name = req.body.movieName;
    const review = req.body.movieReview;

    console.log(req.body)

    MovieReview.updateOne({ movieName: name }, {$set: {movieReview: review}})
        .then(() => console.log("atualizado com sucesso"))
        .catch((e) => console.log("erro ao remover"));
        
});

app.listen(3001, () => console.log("running on port 3001"));
