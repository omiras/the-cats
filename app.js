

// cómo se gestionan las rutas con Express
const express = require('express');

// Importar todas las rutas necesarias para la 'Home Page'
const routesAnimals = require('./routes/animal');

const app = express();

// queremos que todos los ficheros de la carpeta 'public' sean accesibles por el cliente
app.use(express.static('public'));

// Me gustaría poder gestionar peticiones del tipo POST
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
// Definir rutas

//  Todas las rutas gestionadas dentro de routesAnimals, requiren de una parte fija de la URL /animals
app.use("/animal", routesAnimals);

app.get("/", mostrarHomePage);


function mostrarHomePage(req, res) {
	res.render('index', {
		unavariable: "HOLI!!"
	});
}

app.use((req, res) => {
	res.status(404).render('404');
})

app.listen(3000);

