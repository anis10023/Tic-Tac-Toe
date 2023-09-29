//&& Data Structures
//Module pattern
const Gameboard = (() => {
  let boxes = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const add = (XO, row, column) => (boxes[row][column] = `${XO}`);
  const reset = () => {
    //! Don't understand why I wasn't allowed to just redefine the array
    setTimeout(() => {
      for (i = 0; i < Gameboard.boxes.length; i++) {
        for (j = 0; j < Gameboard.boxes[i].length; j++) {
          if (Gameboard.boxes[i][j] !== "") {
            Gameboard.boxes[i][j] = "";
          }
        }
      }
    }, 650);
  };
  return { boxes, add, reset };
})();

//Game state module
const GameState = (() => {
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
function Player(name, number, type, int) {
  let integar = int;
  const getName = () => name;
  const getNumber = () => number;
  const getType = () => type;
  return { getName, getNumber, getType };
}

const player1 = Player("Player 1", 1, "X", 0);
const player2 = Player("Player 2", 2, "O");

function DisplayScore(player1Score, player2Score) {
  const getPlayer1Score = () => player1Score;
  const getPlayer2Score = () => player2Score;
  const increasePlayer1Score = () => (player1Score = player1Score + 1);
  const increasePlayer2Score = () => (player2Score = player2Score + 1);
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
}

const displayScore = DisplayScore(0, 0);

//&&User interface
//Grab existing DOM elements
const boxes = document.querySelectorAll(".box");
const player1Score = document.querySelector(".player1Score");
const player2Score = document.querySelector(".player2Score");
const gameDialog = document.querySelector("#game");

function gameMessage(message) {
  const gameText = document.createElement("p");
  gameText.classList.add("gameTextStyling");
  gameText.textContent = message;
  gameText.classList.add("openGameText");
  gameDialog.appendChild(gameText);
  setTimeout(() => {
    // gameText.classList.remove("openGameText");
  }, 3000);
}

function updateScores() {
  setTimeout(() => {
    player1Score.textContent = `${displayScore.getPlayer1Score()}`;
    player2Score.textContent = `${displayScore.getPlayer2Score()}`;
  }, 750);
}

function resetBoxesUI() {
  setTimeout(() => {
    boxes.forEach((box) => {
      box.textContent = "";
    });
  }, 650);
}

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

  if (GameState.won === true) {
    return;
  }

  // Swap turns
  if (GameState.player1_turn) {
    Gameboard.add("X", row, column);
    GameState.player1_turn = false;
    GameState.player2_turn = true;
  } else if (GameState.player2_turn) {
    Gameboard.add("O", row, column);
    GameState.player1_turn = true;
    GameState.player2_turn = false;
  }
}

function isDraw() {
  let spotsFilled = 0;
  for (i = 0; i < Gameboard.boxes.length; i++) {
    for (j = 0; j < Gameboard.boxes[i].length; j++) {
      if (Gameboard.boxes[i][j] === "X" || Gameboard.boxes[i][j] === "O") {
        spotsFilled++;
      }
    }
  }
  // When game is a draw
  if (spotsFilled === 9 && GameState.won === false) {
    Gameboard.reset();
    GameState.endGame = true;
    resetBoxesUI();
    gameMessage("Draw!");
    console.log("Game Draw!");
  }
}

function whoWonRound() {
  for (i = 0; i < Gameboard.boxes.length; i++) {
    //Horizontal 3 in a row
    if (
      Gameboard.boxes[i][0] === "X" &&
      Gameboard.boxes[i][1] === "X" &&
      Gameboard.boxes[i][2] === "X"
    ) {
      displayScore.increasePlayer1Score();
      GameState.won = true;
    }
    if (
      Gameboard.boxes[i][0] === "O" &&
      Gameboard.boxes[i][1] === "O" &&
      Gameboard.boxes[i][2] === "O"
    ) {
      displayScore.increasePlayer2Score();
      GameState.won = true;
    }
    //Vertical 3 in a row
    if (
      Gameboard.boxes[0][i] === "X" &&
      Gameboard.boxes[1][i] === "X" &&
      Gameboard.boxes[2][i] === "X"
    ) {
      displayScore.increasePlayer1Score();
      GameState.won = true;
    }
    if (
      Gameboard.boxes[0][i] === "O" &&
      Gameboard.boxes[1][i] === "O" &&
      Gameboard.boxes[2][i] === "O"
    ) {
      displayScore.increasePlayer2Score();
      GameState.won = true;
    }
  }

  //Diagonal 3 in a row
  if (
    Gameboard.boxes[0][0] === "X" &&
    Gameboard.boxes[1][1] === "X" &&
    Gameboard.boxes[2][2] === "X"
  ) {
    displayScore.increasePlayer1Score();
    GameState.won = true;
  } else if (
    Gameboard.boxes[0][0] === "O" &&
    Gameboard.boxes[1][1] === "O" &&
    Gameboard.boxes[2][2] === "O"
  ) {
    displayScore.increasePlayer2Score();
    GameState.won = true;
  }
  if (
    Gameboard.boxes[0][2] === "X" &&
    Gameboard.boxes[1][1] === "X" &&
    Gameboard.boxes[2][0] === "X"
  ) {
    displayScore.increasePlayer1Score();
    GameState.won = true;
  } else if (
    Gameboard.boxes[0][2] === "O" &&
    Gameboard.boxes[1][1] === "O" &&
    Gameboard.boxes[2][0] === "O"
  ) {
    displayScore.increasePlayer2Score();
    GameState.won = true;
  }

  if (GameState.won === true) {
    disableEventListener();
    setTimeout(() => (GameState.won = false), 750);
    updateScores();
    Gameboard.reset();
    resetBoxesUI();
    GameState.player1_turn = true;
    GameState.player2_turn = false;
  } else {
    enableEventListener();
  }
}

function isGameWon() {
  if (displayScore.getPlayer1Score() === 5) {
    Gameboard.reset();
    resetBoxesUI();
    displayScore.resetScores();
    gameMessage("Player 1 Won!");
  }

  if (displayScore.getPlayer2Score() === 5) {
    Gameboard.reset();
    resetBoxesUI();
    displayScore.resetScores();
    gameMessage("Player 2 Won!");
  }
}

function gameRules() {
  isDraw();
  whoWonRound();
  isGameWon();
  console.log(GameState.won);
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
  console.log(Gameboard.boxes);
}

//Event listener
boxes.forEach((box) => {
  box.addEventListener("click", (e) => {
    const index = e.target.getAttribute("data-id");
    console.log(index);
    render(index);
  });
});
