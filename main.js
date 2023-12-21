// Seleccionar el contenedor de las fichas en el DOM
const tilesContainer = document.querySelector(".tiles");

// Lista de colores para las fichas
const colors = ["aqua", "aquamarine", "crimson", "blue", "dodgerblue", "gold", "greenyellow", "teal"];

// Duplicar la lista de colores para tener pares
const colorsList = [...colors, ...colors];

// Contar el total de fichas
const tileCount = colorsList.length;

// Estado del juego
let revealedCount = 0; // Contador de fichas reveladas
let activeTile = null; // Ficha activa (la que se ha hecho clic)
let awaitingEndOfMove = false; // Bandera para esperar el final de un movimiento

// Función para construir una ficha
function buildTile(color) {
    const element = document.createElement("div");

    // Añadir clases y atributos a la ficha
    element.classList.add("tile");
    element.setAttribute("data-color", color);
    element.setAttribute("data-revealed", "false");

    // Agregar un evento de clic a la ficha
    element.addEventListener("click", () => {
        const revealed = element.getAttribute("data-revealed");

        // Verificar condiciones para ignorar el clic
        if (awaitingEndOfMove || revealed === "true" || element === activeTile) {
            return;
        }

        // Mostrar el color de la ficha al hacer clic
        element.style.backgroundColor = color;

        // Lógica para manejar el primer y segundo clic
        if (!activeTile) {
            activeTile = element;
            return;
        }

        // Comprobar si las fichas coinciden
        const colorToMatch = activeTile.getAttribute("data-color");

        if (colorToMatch === color) {
            // Si coinciden, marcar ambas fichas como reveladas
            activeTile.setAttribute("data-revealed", "true");
            element.setAttribute("data-revealed", "true");

            // Restablecer la ficha activa y la bandera de espera
            activeTile = null;
            awaitingEndOfMove = false;
            revealedCount += 2;

            // Verificar si se han revelado todas las fichas
            if (revealedCount === tileCount) {
                alert("¡Ganaste! Refresca la página para jugar de nuevo.");
            }

            return;
        }

        // Si las fichas no coinciden, esperar y luego ocultar ambas
        awaitingEndOfMove = true;
        setTimeout(() => {
            element.style.backgroundColor = null;
            activeTile.style.backgroundColor = null;

            // Restablecer la ficha activa y la bandera de espera
            activeTile = null;
            awaitingEndOfMove = false;
        }, 1000);
    });

    // Devolver la ficha creada
    return element;
}

// Construir las fichas y añadirlas al contenedor
for (let i = 0; i < tileCount; i++) {
    // Seleccionar un índice aleatorio y un color correspondiente
    const randomIndex = Math.floor(Math.random() * colorsList.length);
    const color = colorsList[randomIndex];

    // Construir la ficha con el color seleccionado
    const tile = buildTile(color);

    // Eliminar el color de la lista para evitar duplicados
    colorsList.splice(randomIndex, 1);

    // Añadir la ficha al contenedor
    tilesContainer.appendChild(tile);
}
