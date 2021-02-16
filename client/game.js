class Game {
    constructor {
    this.board = [[null, null, null], [null, null, null], [null, null, null]];
    this.tokensPlaced = 0;
    this.winner = null;
    this.xTurn = true;
    this.gameOver = false;
  }

  placeToken {
    //check if it was a valid click
    if (isValidClick(event)) {
      this.tokensPlaced++;

      //update board in memory
      var squareClicked = event.target.id;
      var row = squareClicked.slice(1, 2);
      var col = squareClicked.slice(3);

      if (xTurn) {
        this.board[row][col] = 2;
      } else {
        this.board[row][col] = 1;
      }

      // if more than 4 tokens have been placed, check if there's a winner
      if (this.tokensPlaced > 4) {
        checkWinner();
        if (this.winner !== null) {
          gameOver = true;
          gameWon(this.winner);
        }
      }

      // else if nine tokens have been placed, invoke gameDraw
      if (this.winner === null && this.tokensPlaced === 9) {
        this.gameOver = true;
        gameDraw();
      }
      // adjust whose turn it is
      this.xTurn = !this.xTurn;

      // call on view to update the board
      renderBoard();
    }
  }
}