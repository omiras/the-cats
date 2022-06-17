const cats = [
	{
		"name": "Persian cat",
		"image": "https://raw.githubusercontent.com/haseebpvt/Animal-API/master/data/cat/images/persian_cat.jpg"
	},

	{
		"name": "Russian Blue",
		"image": "https://raw.githubusercontent.com/haseebpvt/Animal-API/master/data/cat/images/russian_blue.jpg"
	},

	{
		"name": "Bengal cat",
		"image": "https://raw.githubusercontent.com/haseebpvt/Animal-API/master/data/cat/images/bengal_blue.jpeg"
	},

	{
		"name": "British Shorthair",
		"image": "https://raw.githubusercontent.com/haseebpvt/Animal-API/master/data/cat/images/british_shorthairs.jpeg"
	},

	{
		"name": "Maine Coon",
		"image": "https://raw.githubusercontent.com/haseebpvt/Animal-API/master/data/cat/images/maine_coon.jpg"
	}
];

const dogs = [

	{
		"name": "Labrador Retriever",
		"image": "https://raw.githubusercontent.com/haseebpvt/Animal-API/master/data/dog/images/labrador_retriver.jpeg"
	},

	{
		"name": "Pug",
		"image": "https://raw.githubusercontent.com/haseebpvt/Animal-API/master/data/dog/images/pug.jpg"
	},

	{
		"name": "Siberian Husky",
		"image": "https://raw.githubusercontent.com/haseebpvt/Animal-API/master/data/dog/images/siberian_husky.jpg"
	},

	{
		"name": "Beagle",
		"image": "https://raw.githubusercontent.com/haseebpvt/Animal-API/master/data/dog/images/beagle.jpg"
	},

	{
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
			animalType: 'GATOS',
			animals: cats
		});
	}

	else if (type == "dogs") {
		res.render("animals", {
			animalType: 'PERROS',
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

