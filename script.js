//select the reevant elemnents from html
const grid =document.querySelector(".grid");
const timer = document.querySelector(".timer");
const endGameSreen = document.querySelector(".end-game-screen");
const endGameText = document.querySelector(".end-game-text");
const playAgainBtn = document.querySelector(".play-again");

const gridMatrix = [
  ["", "", "", "", "", "", "", "", ""],
  ["river", "wood", "wood", "river", "wood", "river", "river", "river", "wood"],
  ["wood", "river", "wood", "wood", "river", "river", "wood", "river", "wood"],
  ["", "", "", "", "", "", "", "", ""],
  ["road", "bus", "road", "road", "road", "car", "road", "road", "road"],
  ["road", "bus", "road", "car", "road", "road", "road", "road", "bus"],
  ["road", "road", "car", "road", "road", "bus", "road", "road", "car"],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""]
];

//Initialize variables that control the game settings;

const victoryRow = 0; //its 0 index row
const riverRows = [1,2];
const roadRows = [4, 5, 6];
const duckPosition ={x:4, y:8};
let contentBeforeDuck = "";
let time = 15;

function drawGrid(){
  grid.innerHTML="";

  //for each row in the matrix, we need to process what is going to be drawn/displyzed on the screen
  gridMatrix.forEach
}