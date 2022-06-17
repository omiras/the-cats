# Gatos y Perros

Vamos a crear una pequeña que nos muestre los perros y gatos, en función de la categoría que el usuario seleccione.

## Req 1

- Si el usuario introduce la ruta /category/cats
  - Vamos a mostrar todos los gatos del array cats
- Si el usuario introduce la ruta /category/dogs
  - Vamos a mostrar todos los perros del array dogs


## Req 2

Queremos ofrecer al usuario la posibilidad de añadir un nuevo gato o perros.
1. Crear un nuevo endpoint /nuevo-animal
2. Renderizar un formulario y configurarlo con el método POST
3. Al enviar los datos del formulario debe añadirse el nuevo animal al array correspondiente (perro o gato)