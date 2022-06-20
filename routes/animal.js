const cats = [
    {
        "id": 1,
        "name": "Persian cat",
        "image": "https://raw.githubusercontent.com/haseebpvt/Animal-API/master/data/cat/images/persian_cat.jpg"
    },

    {
        "id": 2,
        "name": "Russian Blue",
        "image": "https://raw.githubusercontent.com/haseebpvt/Animal-API/master/data/cat/images/russian_blue.jpg"
    },

    {
        "id": 3,
        "name": "Bengal cat",
        "image": "https://raw.githubusercontent.com/haseebpvt/Animal-API/master/data/cat/images/bengal_blue.jpeg"
    },

    {
        "id": 4,
        "name": "British Shorthair",
        "image": "https://raw.githubusercontent.com/haseebpvt/Animal-API/master/data/cat/images/british_shorthairs.jpeg"
    },

    {
        "id": 5,
        "name": "Maine Coon",
        "image": "https://raw.githubusercontent.com/haseebpvt/Animal-API/master/data/cat/images/maine_coon.jpg"
    }
];

// const cats = [];

const dogs = [

    {
        id: 2,
        "name": "Pug",
        "image": "https://raw.githubusercontent.com/haseebpvt/Animal-API/master/data/dog/images/pug.jpg"
    },

    {
        id: 3,
        "name": "Siberian Husky",
        "image": "https://raw.githubusercontent.com/haseebpvt/Animal-API/master/data/dog/images/siberian_husky.jpg"
    },

    {
        id: 4,
        "name": "Beagle",
        "image": "https://raw.githubusercontent.com/haseebpvt/Animal-API/master/data/dog/images/beagle.jpg"
    },

    {
        id: 5,
        "name": "Pomeranian",
        "image": "https://raw.githubusercontent.com/haseebpvt/Animal-API/master/data/dog/images/pomeranian.jpeg"
    },

]

// Vamos a gestionar todas las rutas que tienen que ver con gestionar la entidad animal

const express = require('express');
const router = express.Router();

router.get("/category/:type", (req, res) => {
    // En el objeto 'params' tenemos todos los parámetros dinámicos que nos ha pasado el cliente
    const type = req.params.type;

    if (type == "cats") {
        res.render("animals", {
            animalType: 'cats',
            animals: cats
        });
    }

    else if (type == "dogs") {
        res.render("animals", {
            animalType: 'dogs',
            animals: dogs
        });
    }

    else {
        res.render("animals", {
            animalType: 'NO TENEMOS ESTA CATEGORÍA',
            animals: []
        });
    }
});


router.get("/:category/:id", (req, res) => {

    const { category, id } = req.params;
    let result;

    console.log("categoría: ", category)

    if (category == "cats") {
        result = cats.find(item => item.id == id)
    } else if (category == "dogs") {
        result = dogs.find(item => item.id == id)
    } else {
        return res.status(404).send("Categoría no encontrada");
    }

    res.render('animal-details', {
        animal: result
    });
});

router.get("/new-animal", (req, res) => {
    res.render("form");
});

router.post("/new-animal", (req, res) => {
    const { breed, urlImage, category } = req.body;

    if (category == "cat") {
        cats.push({
            name: breed,
            image: urlImage
        })

        res.redirect("/category/cats");
    }

    else {
        dogs.push({
            name: breed,
            image: urlImage
        })
        res.redirect("/category/dogs");

    }
});


module.exports = router;