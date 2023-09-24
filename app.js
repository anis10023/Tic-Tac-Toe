//&& Data Structures
//Module pattern
const Gameboard = (() => {
  let boxes = [
    ["O", "O", "O"],
    ["X", "X", "X"],
    ["O", "O", "O"],
  ];
  const add = (XO, row, column) => boxes[row].splice(column, 0, XO);
  const reset = () =>
    (boxes = [
      [, ,],
      [, ,],
      [, ,],
    ]);

  return { boxes, add, reset };
})();

const displayScore = ((player1Score, player2Score) => {
  const getPlayer1Score = () => player1Score;
  const getPlayer2Score = () => player2Score;
  const increasePlayer1Score = () => player1Score++;
  const increasePlayer2Score = () => player2Score++;
  const resetScores = () => {
    player1Score = 0;
    player2Score = 0;
  };
  return {
    getPlayer1Score,
    getPlayer2Score,
    increasePlayer1Score,
    increasePlayer2Score,
    resetScores,
  };
})();

//Game state module
const gameState = (() => {
  let player1_turn = true;
  let player2_turn = false;
  let won = false;
  let lose = false;
  let draw = false;
  let startGame = true;
  let endGame = false;

  return {
    player1_turn,
    player2_turn,
    won,
    lose,
    draw,
    startGame,
    endGame,
  };
})();

//Factory function
function Player(name, number, type) {
  const getName = () => name;
  const getNumber = () => number;
  const getType = () => type;
  return { getName, getNumber, getType };
}

//&&User interface
//Grab existing DOM elements
const boxes = document.querySelectorAll(".box");
const player1Score = document.querySelector(".player1Score");
const player2Score = document.querySelector(".player2Score");

function displayAlgorithm() {
  let counter = 0;
  for (i = 0; i < Gameboard.boxes.length; i++) {
    for (j = 0; j < Gameboard.boxes[i].length; j++) {
      if (Gameboard.boxes[i][j] === "") {
        counter++;
        continue;
      }
      if (Gameboard.boxes[i][j] !== "") {
        boxes[counter].textContent = Gameboard.boxes[i][j];
      }
      counter++;
    }
  }
}

function render() {
  displayAlgorithm();
}
render();

function getPlayerDetails() {}
