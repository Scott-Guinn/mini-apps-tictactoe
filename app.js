

// ----- MODEL -----
  // creates a new board in memory
var board = [[null, null, null], [null, null, null], [null, null, null]];

var tokensPlaced = 0;
var xTurn = false;
var winner = null;

var isValidClick = function(event) {
  var value = event.target.innerText;
   if (value === 'O' || value === 'X'){
     return false
   } else {
     return true;
   }
}

var placeToken = function(event) {
  //check if it was a valid click
  if (isValidClick(event)) {
    tokensPlaced++;

    //update board based on xTurn
    var squareClicked = event.target.id;
    var row = squareClicked.slice(1,2);
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
         gameWon(winner);
       }
    }

    // else if nine tokens have been placed, invoke gameDraw
    if (winner === null && tokensPlaced === 9) {
      gameDraw();
    }
    // adjust whose turn it is
    xTurn = !xTurn;

    // call on view to update the board
    console.log('inMemory Board Update: ', board);
    renderBoard();
  }
}

var checkWinner = function() {
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
  return winner;
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
        document.getElementById(id).innerText = 'test'; //CHANGE THIS TO REMOVE TEST
      }
    }
  }
}

var gameWon = (winner) => {
  var nameOfWinner;
  if (winner === 1) {
    nameOfWinner = 'O';
  } else if (winner === 2) {
    nameOfWinner = 'X';
  }
  // display a reset option
  document.getElementById('winner').innerText = `Team ${nameOfWinner} has won!`
  document.getElementById("reset").hidden = false;
  document.getElementById("reset").addEventListener("click", resetBoard);
}

// ----- CONTROLLER -----

// setup Click Event Listeners
document.getElementById("board").addEventListener("click", placeToken);



var resetBoard = () => {
  console.log('resetBoard has been called!');
  document.getElementById("reset").hidden = true;

  board = [[null, null, null], [null, null, null], [null, null, null]];
  tokensPlaced = 0;
  winner = null;

  document.getElementById('winner').innerText = 'Click a square to place a token.'
  renderBoard();
}