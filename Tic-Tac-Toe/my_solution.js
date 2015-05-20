 // U3.W7: Design Basic Game Solo Challenge

// This is a solo challenge

// Your mission description: create a basic tic-tac-toe game, with win conditions included. Two people can play the game.
// Overall mission: Creating a working tic-tac-toe game that keeps score, determines ties and winners,
// Goals:
  // 1 -- Clickable, interactive board.
  // 2 -- Win conditions
  // 3 -- tie conditions
  // 4 -- reset game functionality
// Characters:
// Objects:
    // 1 -- the board itself, containing 9 distinct cells
    // 2 --
// Functions:
    // 1 -- event handling for clicking a cell, turning it either x or o based on players turn.
    // 2 -- win conditions function, called each time a move is made -- if board is full, return tie game
    // 3 -- a reset board function

// Pseudocode
// Instantiate cell objects, player objects, and board.
// Initiate game once Start New Game is clicked on, or clear a current game if one is in progress.
// Player 1 goes first, when a square is clicked on:
    // a: turn square into 'X' or 'O' based on player turn.
    // b: check win conditions AND tie conditions, ending game if either are fulfilled.
    // c: initiate player 2's turn (vice versa when player 2 finished turn)
// When win condition found, congratulate winning player, end game, make sure game cannot be continued.
// Anytime start new game is clicked, the game is reset.
// A score tally must be kept in place
// Use the bingo-board logic to calculate winning conditions.

// There's a lot more than I had originally thought of to keep in check:
// Make sure a tile cannot be overridden by another player.
// Making sure that the game cannot continue to be played after a victory (user must press new game)
// Dealing with string to number conversion on the Tally markers.
// There's probably a ton more edge cases I haven't yet considered.

// Initial Code

// board variables
var cell00 = document.getElementById('cell-00');
cell00.addEventListener("click", makeMove, false);

var cell01 = document.getElementById('cell-01');
cell01.addEventListener("click", makeMove, false);

var cell02 = document.getElementById('cell-02');
cell02.addEventListener("click", makeMove, false);

var cell10 = document.getElementById('cell-10');
cell10.addEventListener("click", makeMove, false);

var cell11 = document.getElementById('cell-11');
cell11.addEventListener("click", makeMove, false);

var cell12 = document.getElementById('cell-12');
cell12.addEventListener("click", makeMove, false);

var cell20 = document.getElementById('cell-20');
cell20.addEventListener("click", makeMove, false);

var cell21 = document.getElementById('cell-21');
cell21.addEventListener("click", makeMove, false);

var cell22 = document.getElementById('cell-22');
cell22.addEventListener("click", makeMove, false);

var board = document.getElementById('board')
var turn = document.getElementById('turn');

var gameboard = [ [cell00, cell01, cell02],
                  [cell10, cell11, cell12],
                  [cell20, cell21, cell22] ];

var playerOne = {name: "one", marker: "X"};
var playerTwo = {name: "two", marker: "O"};
var symbol = "O";


var P1Wins    = document.getElementById('P1Wins')
var P2Wins    = document.getElementById('P2Wins')
var P1WinsNum = Number(document.getElementById('P1Wins').textContent)
var P2WinsNum = Number(document.getElementById('P2Wins').textContent)


//START GAME
var start = document.getElementById('startNew');
start.addEventListener("click", startGame, false);

function startGame() {
  for (row=0; row < 3; row++) {
    for (column=0; column < 3; column++) {
      gameboard[row][column].textContent = "";
    }
  }
  turn.textContent = "Ready?";
}


function makeMove() {
  if (this.textContent == "") {
       if (symbol == "O") {
           symbol =  "X";
     } else if (symbol == "X") {
                symbol =  "O";
     }
      this.textContent = symbol;
  } else {
    return console.log("Invalid Move");
  }
  winCheck();
  if (gamewon == false) {
    tieCheck();
  } else {
    gamewon = false;
  }
}

//WIN OR TIE GAME?

var gamewon = false;
function winCheck() {
  if (winGameVertical(0,0) == true || winGameHorizontal(0,0) == true || winGameLeftToRight(2,0) == true || winGameRightToLeft(0,0) == true) {
    gamewon = true;
    if (symbol == playerOne.marker) {
        P1WinsNum += 1;
        P1Wins.innerHTML = P1WinsNum.toString();
    } else {
        P2WinsNum += 1;
        P2Wins.innerHTML = P2WinsNum.toString();
    }
        fillBoard();
        result = false;
        symbol = "O";
        return turn.textContent = "WE HAVE A WINNER!";
    } else if (symbol == playerOne.marker) {
        turn.textContent = "Your turn player " + playerTwo.name + ": O";
    } else {
        turn.textContent = "Your turn player " + playerOne.name + ": X";
    }
  return gamewon
}

function tieCheck() {
  filledSlots = 0
  for (row=0; row < 3; row++) {
    for (column=0; column < 3; column++) {
      if (gameboard[row][column].textContent !== "" && gameboard[row][column].textContent !== " ") {
        filledSlots += 1;
      }
    }
  }
  if (filledSlots == 9) {
    turn.textContent = "Looks like a tie... Start a new game!";
  }
}

//if winCheck finds a win, THEN:
// prevent more moves from being made.
function fillBoard() {
  for (row=0; row < 3; row++) {
    for (column=0; column < 3; column++) {
      if (gameboard[row][column].textContent == "") {
        gameboard[row][column].textContent = " ";
      }
    }
  }
}

//WIN CONDITIONS:
// I basically remade the code I had for the ruby bingo challenge for javascript. Javascript recursion FTW.
// some interesting differences in how returns work, tripped me up for a bit here!
var result = false;
function winGameVertical(row, column) {
    if (row == (gameboard.length)) {
      console.log("WIN FOR PLAYER " + symbol + "! VERTICAL!");
      result = true;
      return true;

  } else if (column == 3) {
      return false;

  } else if (gameboard[row][column].textContent == symbol) {
      row += 1;
      winGameVertical(row, column);

  } else if (column < gameboard.length) {
      column += 1;
      row = 0;
      winGameVertical(row, column);
  }
  return result;
}

function winGameHorizontal(row,column) {
    if (column == (gameboard.length)) {
      console.log("WIN FOR PLAYER " + symbol + "! HORIZONTAL");
      result = true;
      return true;

  } else if (row == 3) {
      return false;

  } else if (gameboard[row][column].textContent == symbol) {
      column += 1;
      winGameHorizontal(row, column);

  } else if (row < gameboard.length) {
      row += 1;
      column = 0;
      winGameHorizontal(row, column);
  }
  return result;
}

function winGameLeftToRight(row, column) {
    if (row == -1) {
      console.log("WIN FOR PLAYER " + symbol + "! LEFT TO RIGHT -->");
      result = true;
      return true;

  } else if (gameboard[row][column].textContent == symbol) {
      column += 1;
      row -= 1;
      winGameLeftToRight(row, column);

  } else {
      return false;
  }
  return result;
}

function winGameRightToLeft(row, column) {
    if (row == 3) {
      console.log("WIN FOR PLAYER " + symbol + "! RIGHT TO LEFT <--");
      result = true;
      return true;

  } else if (gameboard[row][column].textContent == symbol) {
      column += 1;
      row += 1;
      winGameRightToLeft(row, column);

  } else {
      return false;
  }
  return result;
}


// Refactored Code






// Reflection
// I wanted to really challenge myself for this game here, and I thought making a functional tic-tac-toe in javascript would be a worthy
// hurdle. It absolutley was. My psuedocode did not capture the number of edge cases I ran into, and it was a pretty humbling experience
// to work on creating a fully functionl game that took win conditions, resets, ties, and tally's into consideration. The logic of the
// win conditions were actually the easiest bit for me -- dealing with recursive functions here weren't too hard, as I had gained some
// experience with recursion for the bingo board win condition challenge in Ruby. Writing it in Javascript was fun and a unique challenge,
// but in all honesty, the most difficult part here was figuring out how I can manage user input to do what I want. The question of "how
// can I guarantee that the first move will be an X, the second a O, the third an X, etc." really threw me for a loop here, but I think the
// majority of my troubles came from my inexperience with using native javascript to manipulate the DOM (I had experience previously with
// jquery). Overall, a lot of fun, and I'm proud I was able to get a working solution. The rest of the week will be spent studying, and
// seeing if there's any significant refactoring I could do (I'd love to figure out a way to declare all of my cell objects in a function
// or a for loop -- maybe I'll work on that). In addition, I'd like to get color on the board itself, based on the current player. That will
// probably take a few more lines of code/functions.