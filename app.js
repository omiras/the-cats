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

// cómo se gestionan las rutas con Express
const express = require('express');

const app = express();

// queremos que todos los ficheros de la carpeta 'public' sean accesibles por el cliente
app.use(express.static('public'));

// Me gustaría poder gestionar peticiones del tipo POST
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
// Definir rutas

app.get("/", mostrarHomePage);

app.get("/animal/:category/:id", (req, res) => {

	const { category, id } = req.params;
	let result;

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

app.get("/new-animal", (req, res) => {
	res.render("form");
});

app.post("/new-animal", (req, res) => {
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
})

app.get("/category/:type", (req, res) => {
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

function mostrarHomePage(req, res) {
	res.render('index', {
		unavariable: "HOLI!!"
	});
}

app.use((req, res) => {
	res.status(404).render('404');
})

app.listen(3000);

