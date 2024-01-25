//select the reevant elemnents from html
const grid = document.querySelector(".grid");
const timer = document.querySelector(".timer");
const endGameScreen = document.querySelector(".end-game-screen");
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
    "wood",
    "wood",
  ],
  ["river", "river", "wood", "wood", "river", "river", "wood", "river", "wood"],
  ["", "", "", "", "", "", "", "", ""],
  ["road", "bus", "road", "road", "road", "car", "road", "road", "car"],
  ["road", "bus", "road", "road", "road", "road", "bus", "road", "road"],
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


//Animation Functions

function moveRight(gridRowIndex){
  //get all of the cells in the current row
  const currentRow = gridMatrix[gridRowIndex];

//remove the last element...
  const lastElement = currentRow.pop();

//and put it back to the begining i.e index 0
currentRow.unshift(lastElement);
}
function moveLeft(gridRowIndex){
const currentRow = gridMatrix[gridRowIndex];
const firstElement = currentRow.shift();
currentRow.push(firstElement);
}
function animateGame(){
  //animate river
  moveRight(1);
  moveLeft(2);

  //animate road
  moveRight(4);
  moveLeft(5);
  moveRight(6);

}
function updateDuckPosition(){
gridMatrix[duckPosition.y][duckPosition.x] = contentBeforeDuck;
if(contentBeforeDuck ==="wood"){
  if(duckPosition.y ===1 && duckPosition.x < 8 ) duckPosition.x++;
  else if(duckPosition.y === 2 && duckPosition.x > 0) duckPosition.x--;
}

}
function checkPosition(){
  if(duckPosition.y === victoryRow) endGame("duck-arrived");
  else if(contentBeforeDuck === "river") endGame("duck-drowned");
  else if (contentBeforeDuck === "car" || contentBeforeDuck ==="bus")
  endGame("duck-hit");
}


//Game win/loss logic
function endGame(reason){
  //victory
  if(reason === "duck-arrived"){
    endGameText.innerHTML = `You <br> Win!`;
    endGameScreen.classList.add("win");
  }

  gridMatrix[duckPosition.y][duckPosition.x]= reason;
  clearInterval(countdownLoop);
  //stop the game loop
  clearInterval(renderLoop)
  //stop the player from being to control the duck
document.removeEventListener("keyup", moveDuck);
  //display game over
  endGameScreen.classList.remove("hidden");
}

function countdown(){
  if(time!==0){
  time--;
  timer.innerText = time.toString().padStart(3, "0");
  }
  if(time==0){
    //end the game player lost
endGame();
  }
}

//Rendering
function render() {
  //display on the screen
  placeDuck();
  checkPosition();
  drawGrid();
}

const renderLoop = setInterval(function(){
  updateDuckPosition();
  animateGame();
  render();
}, 600);

const countdownLoop = setInterval(countdown, 1000);

document.addEventListener("keyup", moveDuck);

playAgainBtn.addEventListener("click", function(){
  location.reload();
})