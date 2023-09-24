//&& Data Structures
//Module pattern
const Gameboard = (() => {
  let boxes = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const add = (XO, row, column) => (boxes[row][column] = `${XO}`);
  const reset = () =>
    (boxes = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
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

const player1 = Player("Player 1", 1, "X");
const player2 = Player("Player 2", 2, "O");

//&&User interface
//Grab existing DOM elements
const boxes = document.querySelectorAll(".box");
const player1Score = document.querySelector(".player1Score");
const player2Score = document.querySelector(".player2Score");

function convert1D_array(index) {
  //~Mapping 1D array to 2D array

  //Vertical index: array1d[i] mod vertical_size
  const column = index % 3;

  //Horizontal index: Math.floor(i / horizontal_size)
  const row = Math.floor(index / 3);

  return { column, row };
}

function turnSwapping(index) {
  const column = convert1D_array(index).column;
  const row = convert1D_array(index).row;

  //Prevent playing in spots already taken
  if (
    Gameboard.boxes[row][column] === "X" ||
    Gameboard.boxes[row][column] === "O"
  ) {
    return;
  }

  // Swap turns
  if (gameState.player1_turn) {
    Gameboard.add("X", row, column);
    gameState.player1_turn = false;
    gameState.player2_turn = true;
  } else if (gameState.player2_turn) {
    Gameboard.add("O", row, column);
    gameState.player2_turn = false;
    gameState.player1_turn = true;
  }
}

function isBoardFull() {
  let spotsFilled = 0;
  for (i = 0; i < Gameboard.boxes.length; i++) {
    for (j = 0; j < Gameboard.boxes[i].length; j++) {
      if (Gameboard.boxes[i][j] === "X" || Gameboard.boxes[i][j] === "O") {
        spotsFilled++;
        // console.log(spotsFilled);
      }
    }
  }
  //   if (spotsFilled === 9) {
  //     Gameboard.reset;
  //     gameState.endGame = true;
  //     boxes.forEach((box) => {
  //       box.textContent = "";
  //     });
  //   }
}

function isWon() {
  for (i = 0; i < Gameboard.boxes.length; i++) {
    //Horizontal 3 in a row
    if (
      Gameboard.boxes[i][0] &&
      Gameboard.boxes[i][1] &&
      Gameboard.boxes[i][2] === "X"
    ) {
      gameState.won = true;
    }
    if (
      Gameboard.boxes[i][0] &&
      Gameboard.boxes[i][1] &&
      Gameboard.boxes[i][2] === "O"
    ) {
      gameState.won = true;
    }
    //Vertical 3 in a row
    if (
      Gameboard.boxes[0][i] &&
      Gameboard.boxes[1][i] &&
      Gameboard.boxes[2][i] === "X"
    ) {
      gameState.won = true;
    }
    if (
      Gameboard.boxes[0][i] &&
      Gameboard.boxes[1][i] &&
      Gameboard.boxes[2][i] === "O"
    ) {
      gameState.won = true;
    }
  }
}

function gameRules() {
  isBoardFull();
  isWon();
  console.log(gameState.won);
}

function displayAlgorithm() {
  let index1D = 0;
  for (i = 0; i < Gameboard.boxes.length; i++) {
    for (j = 0; j < Gameboard.boxes[i].length; j++) {
      if (Gameboard.boxes[i][j] === "") {
        index1D++;
        continue;
      }
      if (Gameboard.boxes[i][j] !== "") {
        boxes[index1D].textContent = Gameboard.boxes[i][j];
      }
      index1D++;
    }
  }
}

function render(index) {
  turnSwapping(index);
  displayAlgorithm();
  gameRules();
}

//Event listener
boxes.forEach((box) => {
  box.addEventListener("click", (e) => {
    const index = e.target.getAttribute("data-id");
    render(index);
  });
});

// function getPlayerDetails() {}
