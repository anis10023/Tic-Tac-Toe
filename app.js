//&& Data Structures
//Module pattern
const Gameboard = (() => {
  const gameboard = [
    [, ,],
    [, ,],
    [, ,],
  ];
  const add = (XO, row, column) => gameboard[row].splice(column, 0, XO);
  const reset = () =>
    (gameboard = [
      [, ,],
      [, ,],
      [, ,],
    ]);

  return { add, reset };
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

//Factory function
function Player(name, number, type) {
  const getName = () => name;
  const getNumber = () => number;
  const getType = () => type;
  return { getName, getNumber, getType };
}

function gameState(state) {}
