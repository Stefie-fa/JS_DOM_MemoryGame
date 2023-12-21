const tilesContainer = document.querySelector(".tiles");
const colors = ["aqua", "aquamarine", "crimson", "blue", "dodgerblue", "gold", "greenyellow", "teal"];

const colorsList = [...colors, ...colors];
const tileCount = colorsList.length;

//Game state

let revealedCount = 0;
let activeTile = null;
let awaintingEndOfMove = false;

function buildTile(color){
    const element = document.createElement("div");

    element.classList.add("tile");
    element.setAttribute("data-color", color);

    return element;
}

// Build up tiles

for (let i = 0; i< tileCount; i++){
    const randomIndex = Math.floor(Math.random() * colorsList.length);
    const color = colorsList[randomIndex];
    const tile = buildTile(color);

    colorsList.splice(randomIndex, 1);
    tilesContainer.appendChild(tile);

}