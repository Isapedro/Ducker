//select the reevant elemnents from html
const grid = document.querySelector(".grid");
const timer = document.querySelector(".timer");
const endGameSreen = document.querySelector(".end-game-screen");
const endGameText = document.querySelector(".end-game-text");
const playAgainBtn = document.querySelector(".play-again");

const gridMatrix = [
  ["", "", "", "", "", "", "", "", ""],
  [
    "river",
    "wood",
    "river",
    "river",
    "wood",
    "river",
    "river",
    "river",
    "wood",
  ],
  ["river", "river", "wood", "wood", "river", "river", "wood", "river", "wood"],
  ["", "", "", "", "", "", "", "", ""],
  ["road", "bus", "road", "road", "road", "car", "road", "road", "car"],
  ["road", "bus", "road", "car", "road", "road", "bus", "road", "bus"],
  ["road", "road", "car", "road", "road", "bus", "road", "road", "car"],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
];

//Initialize variables that control the game settings;

const victoryRow = 0; //its 0 index row
const riverRows = [1, 2];
const roadRows = [4, 5, 6];
const duckPosition = { x: 4, y: 8 };
let contentBeforeDuck = "";
let time = 15;

function drawGrid() {
  grid.innerHTML = "";

  //for each row in the matrix, we need to process what is going to be drawn/displyzed on the screen
  gridMatrix.forEach(function (gridRow, gridRowIndex) {
    gridRow.forEach(function (cellContent, cellContentIndex) {
      //given the current grid row, create a cell for the grid in the game based ont the cellcontent
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");
      //[1,2]
      if (riverRows.includes(gridRowIndex)) {
        cellDiv.classList.add("river");
        //[4, 5, 6]
      } else if (roadRows.includes(gridRowIndex)) {
        cellDiv.classList.add("road");
      }
      if (cellContent) {
        cellDiv.classList.add(cellContent);
      }

      grid.appendChild(cellDiv);
    });
  });
}
function placeDuck() {
  contentBeforeDuck = gridMatrix[duckPosition.y][duckPosition.x];
  gridMatrix[duckPosition.y][duckPosition.x] = "duck";
}
function moveDuck(event) {
  const key = event.key;

  gridMatrix[duckPosition.y][duckPosition.x] = contentBeforeDuck;
  switch (key) {
    case "ArrowUp":
      if (duckPosition.y > 0) duckPosition.y--;
      break;
    case "ArrowDown":
      if (duckPosition.y < 8) duckPosition.y++;
      break;
    case "ArrowLeft":
      if (duckPosition.x > 0) duckPosition.x--;
      break;
    case "ArrowRight":
      if (duckPosition.x < 8) duckPosition.x++;
      break;
  }
  render();
}

function render() {
  //display on the screen
  placeDuck();
  drawGrid();
}

const renderLoop = setInterval(function(){
  gridMatrix[duckPosition.y][duckPosition.x] = contentBeforeDuck;
  render();
}, 600);

document.addEventListener("keyup", moveDuck);
