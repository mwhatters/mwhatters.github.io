// board variables
function createBoardVariables() {
  var cellbank = [];
  for (i=0; i < 9; i++) {
    cellbank[i] = document.getElementById("cell" + i);
    cellbank[i].addEventListener("click", makeMove, false);
  }
  return cellbank
}

var cells = createBoardVariables();
var gameboard = [ [cells[0], cells[1], cells[2]],
                  [cells[3], cells[4], cells[5]],
                  [cells[6], cells[7], cells[8]] ];

//turn display
var turn = document.getElementById('turn');
var invalid = document.getElementById('invalid');
invalid.style.color = '#D3D3D3';

//players, symbols, and colors
var playerOne = {name: "one", symbol: "X"};
var playerTwo = {name: "two", symbol: "O"};
var symbol = "O";
var colors = {O: 'red', X: 'blue'}

//wincounter
var P1Wins    = document.getElementById('P1Wins')
var P2Wins    = document.getElementById('P2Wins')


//START NEW GAME
var start = document.getElementById('startNew');
start.addEventListener("click", startGame, false);
var gamewon = false;

function startGame() {
  invalid.style.color = '#D3D3D3'
  gamewon = false;
  for (row=0; row < 3; row++) {
    for (column=0; column < 3; column++) {
      gameboard[row][column].textContent = "";
    }
  }
  turn.textContent = "Player one move to start game!";
}


function makeMove() {
  if (this.textContent == "") {
       if      (symbol == "O") {
                symbol =  "X";
     } else if (symbol == "X") {
                symbol =  "O";
     }
      invalid.style.color = '#D3D3D3'
      this.textContent = symbol;
      this.style.color = colors[symbol];
  } else {
    console.log("Invalid Move");
    return invalid.style.color = 'darkred'
  }
  winCheck();
  if (gamewon == false) {
    tieCheck();
  }
}

//WIN OR TIE GAME?
function winCheck() {
  if (winGameVertical(0,0) == true || winGameHorizontal(0,0) == true || winGameLeftToRight(2,0) == true || winGameRightToLeft(0,0) == true) {
    gamewon = true;
      if (symbol == playerOne.symbol) {
        P1Wins.innerHTML = (Number(P1Wins.textContent) + 1);
        turn.textContent = "Player " + playerOne.name + " is the winner!";
    } else {
        P2Wins.innerHTML = (Number(P2Wins.textContent) + 1);
        turn.textContent = "Player " + playerTwo.name + " is the winner!";
    }
      fillBoard();
      tictacbingo = false;
      symbol = "O";
  } else if (symbol == playerOne.symbol) {
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
    symbol = "O"; //set back to original param
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
// Inspired by the code I had for the ruby bingo challenge. Javascript recursion FTW.
// some interesting differences in how returns work (does not immediately escape the function!!), tripped me up for a bit here!
var boardlen = gameboard.length
var tictacbingo = false;

function winGameVertical(row, column) {
    if (row == (boardlen)) {
      tictacbingo = true;
  } else if (column == boardlen) {
  } else if (gameboard[row][column].textContent == symbol) {
      winGameVertical((row+1), column);
  } else if (column < boardlen) {
      winGameVertical(0, (column+1));
  }
  return tictacbingo;
}

function winGameHorizontal(row,column) {
    if (column == (boardlen)) {
      tictacbingo = true;
  } else if (row == boardlen) {
  } else if (gameboard[row][column].textContent == symbol) {
      winGameHorizontal(row, (column+1));
  } else if (row < boardlen) {
      winGameHorizontal((row+1), 0);
  }
  return tictacbingo;
}

function winGameLeftToRight(row, column) {
    if (row == -1) {
      tictacbingo = true;
  } else if (gameboard[row][column].textContent == symbol) {
      winGameLeftToRight((row-1), (column+1));
  }
  return tictacbingo;
}

function winGameRightToLeft(row, column) {
    if (row == 3) {
      tictacbingo = true;
  } else if (gameboard[row][column].textContent == symbol) {
      winGameRightToLeft((row+1), (column+1));
  }
  return tictacbingo;
}