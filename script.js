let gameActive = false;
let gameState = ['', '', '', '', '', '', '', '', ''];
var currentPlayer = "";
var playerTwo = "";
const squares = document.querySelectorAll('.square');
const cells = document.querySelectorAll('.cell');
var playerSelect = document.querySelector('.welcome');
var scoreboard = document.querySelector('.scoreboard');
var resetButton = document.querySelector('#reset');
var winnerMsg = document.querySelector('#winner-msg');

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

playerSelect.addEventListener('click', choosePlayer, false);

function choosePlayer(e) {
  if (e.target !== e.currentTarget && gameActive === false) {
    gameActive = true;
    if (e.target.innerHTML === "X") {
      currentPlayer = playerChar.innerHTML = "X";
      playerTwo = playerTwoChar.innerHTML = playerTwo = "O";
    }
    if (e.target.innerHTML === "O") {
      currentPlayer = playerChar.innerHTML = currentPlayer = "O";
      playerTwo = playerTwoChar.innerHTML = "X";
    }
    document.querySelector('#playerX').disabled = true;
    document.querySelector('#playerO').disabled = true;
  }
}

function handleSquareClick(event) {
  const square = event.target;
  const index = square.id;
  if (gameState[index] !== '' || !gameActive) {
    return;
  }
  gameState[index] = currentPlayer;
  square.textContent = currentPlayer;
  checkTie();
  checkWin();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (
      gameState[a] !== '' &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      gameActive = false;
      winnerMsg.innerHTML = "<h2>The " + currentPlayer + " Player wins!</h2>";
      break;
    }
  }
}

function checkTie() {
  if (gameState.indexOf('') === -1) {
    winnerMsg.innerHTML = "<h2>It's a draw!</h2>";
    gameActive = false;
  }
}

resetButton.addEventListener('click', function () {
  gameState = ['', '', '', '', '', '', '', '', ''];
  gameActive = false;
  squares.forEach(square => square.textContent = '');
  winnerMsg.innerHTML = "";
  playerChar.innerHTML = "#";
  playerTwoChar.innerHTML = playerTwo = "#";
  document.querySelector('#playerX').disabled = false;
  document.querySelector('#playerO').disabled = false;
});
squares.forEach(square => square.addEventListener('click', handleSquareClick));