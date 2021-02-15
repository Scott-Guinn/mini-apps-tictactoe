

// ----- MODEL -----
var board = [[null, null, null], [null, null, null], [null, null, null]];

var tokensPlaced = 0;
var xTurn = true;
var winner = null;
var gameOver = false;

// Tally of wins, resets on refresh
var xwins = 0;
var owins = 0;

var team1name = 'Xs';
var team2name ='Os';

var placeToken = (event) => {
  //check if it was a valid click
  if (isValidClick(event)) {
    tokensPlaced++;

    //update board in memory
    var squareClicked = event.target.id;
    var row = squareClicked.slice(1, 2);
    var col = squareClicked.slice(3);

    if (xTurn) {
      board[row][col] = 2;
    } else {
      board[row][col] = 1;
    }

    // if more than 4 tokens have been placed, check if there's a winner
    if (tokensPlaced > 4) {
      checkWinner();
      if (winner !== null) {
        gameOver = true;
        gameWon(winner);
      }
    }

    // else if nine tokens have been placed, invoke gameDraw
    if (winner === null && tokensPlaced === 9) {
      gameOver = true;
      gameDraw();
    }
    // adjust whose turn it is
    xTurn = !xTurn;

    // call on view to update the board
    renderBoard();
  }
}

// this function checks vertical columns, horizontal rows, and diagonals for a winner. It sets the global 'winner' variable equal to that winner if found.
var checkWinner = function () {
  var checkVerticals = () => {
    for (var col = 0; col < 3; col++) {
      if (board[0][col] === 1 && board[1][col] === 1 && board[2][col] === 1) {
        winner = 1;
        break;
      } else if (board[0][col] === 2 && board[1][col] === 2 && board[2][col] === 2) {
        winner = 2;
        break;
      }
    }
  }
  var checkHorizontals = () => {
    for (var row = 0; row < 3; row++) {
      var sum = board[row][0] + board[row][1] + board[row][2];
      if (board[row][0] === 1 && board[row][1] === 1 && board[row][2] === 1) {
        winner = 1;
        break;
      } else if (sum === 6) {
        winner = 2;
        break;
      }
    }
  }
  var checkDiagonals = () => {
    // CHECK FIRST DIAGONAL
    if (board[0][0] === 1 && board[1][1] === 1 && board[2][2] === 1) {
      // 'O's have won
      winner = 1;
    } else if (board[0][0] === 2 && board[1][1] === 2 && board[2][2] === 2) {
      // 'X's have won
      winner = 2
    }
    // CHECK SECOND DIAGONAL
    if (board[0][2] === 1 && board[1][1] === 1 && board[2][0] === 1) {
      // 'O's have won
      winner = 1;
    } else if (board[0][2] === 2 && board[1][1] === 2 && board[2][0] === 2) {
      // 'X's have won
      winner = 2
    }
  }

  checkVerticals();
  checkHorizontals()
  checkDiagonals();
}

// ----- VIEW -----

var renderBoard = () => {
  for (var row = 0; row < 3; row++) {
    for (var col = 0; col < 3; col++) {
      var id = `r${row}c${col}`

      if (board[row][col] === 1) {
        //render an 'O'
        document.getElementById(id).innerText = 'O';
      } else if (board[row][col] === 2) {
        //render an 'X'
        document.getElementById(id).innerText = 'X';
      } else if (board[row][col] === null) {
        //render an empty square
        document.getElementById(id).innerText = '';
      }
    }
  }
}

var gameWon = (winner) => {
  var nameOfWinner;
  if (winner === 1) {
    nameOfWinner = 'O';
    owins++;
  } else if (winner === 2) {
    nameOfWinner = 'X';
    xwins++;
  }
  document.getElementById('xwins').innerText = `${xwins}`;
  document.getElementById('owins').innerText = `${owins}`;
  document.getElementById('winner').innerText = `Team ${nameOfWinner} has won!`
    // display a play again option
  document.getElementById("reset").hidden = false;
  document.getElementById("reset").addEventListener("click", resetBoard);
}

var gameDraw = () => {
  document.getElementById('winner').innerText = `Game is a draw!`
  document.getElementById("reset").hidden = false;
}

var renderScoreboard = () => {
  document.getElementById('team1').innerText = `${team1name} (X): `;
  document.getElementById('team2').innerText = `${team2name} (O): `;
}
// render the default scoreboard at start
renderScoreboard();

// ----- CONTROLLER -----

// setup Click Event Listener for the board
document.getElementById("board").addEventListener("click", placeToken);

// This function determines if the user has made a 'legal' move. Returns a boolean.
var isValidClick = function (event) {
  var value = event.target.innerText;
  if (gameOver) {
    return false;
  }

  if (value !== '' && value !== 'test') {
    return false
  } else {
    return true;
  }
}

// click event handler for name team button
var nameTeam = () => {
  team1name = document.getElementById("team1name").value;
  team2name = document.getElementById("team2name").value;
  renderScoreboard();
  document.getElementById("forNaming").hidden = true;

}

// click event handler for play again (reset) button
var resetBoard = () => {
  document.getElementById("reset").hidden = true;

  board = [[null, null, null], [null, null, null], [null, null, null]];
  tokensPlaced = 0;
  // make it, take it. Winner goes first.
  if (winner === 1) {
    xTurn = false;
  } else if (winner === 2) {
    xTurn = true;
  }
  winner = null;
  gameOver = false;

  document.getElementById('winner').innerText = 'Click a square to place a token.'
  renderBoard();
}