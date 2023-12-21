//declare variables

let currentTurn = "O";
let thereIsAWinner = false;
let itsATie = false;
let gameState = ["", "", "", "", "", "", "", "", ""];

const cellIds = ['cell1', 'cell2', 'cell3', 'cell4', 'cell5', 'cell6', 'cell7', 'cell8', 'cell9'];

//fill cells

function fillCell(cellId) {
  const clickedCell = document.getElementById(cellId);
  const markNode = clickedCell.childNodes[0];

  if (!markNode) {
    const newMark = document.createTextNode(currentTurn);
    clickedCell.appendChild(newMark);

    const cellIndex = cellIds.indexOf(cellId);
    gameState[cellIndex] = currentTurn;

    checkForWins();
    toggleTurn();
  } else {
    statusText.innerHTML = "That cell is full";
  }
}

//check for wins

function checkForWins() {
  const winningScenarios = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const scenario of winningScenarios) {
    const [a, b, c] = scenario;

    if (
      gameState[a] !== "" &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      thereIsAWinner = true;
      winnerText.innerHTML = `${gameState[a]} wins!`;
      statusText.innerHTML = '';
      resetButton.style.display = "block";
      return;
    }
  }
}

//turn switch & declare win

function toggleTurn() {
  const allCellsFilled = gameState.every(item => item === "X" || item === "O");

  if (allCellsFilled && !thereIsAWinner) {
    statusText.innerHTML = "It's a tie";
    resetButton.style.display = "block";
    itsATie = true;
  }

  if (winnerText.innerHTML === '' && !allCellsFilled) {
    currentTurn = currentTurn === "X" ? "O" : "X";
    statusText.innerHTML = `It's ${currentTurn}'s turn.`;
  }
}

// activate board

for (const cellId of cellIds) {
  const cell = document.getElementById(cellId);
  cell.addEventListener('click', function() {
    fillCell(cellId);
  });
}

//reset board

function reset () {
 for (const cellId of cellIds) {
    const cell = document.getElementById(cellId);
    while (cell.firstChild) {
      cell.removeChild(cell.firstChild);

  gameState = ["", "", "", "", "", "", "", "", ""];
  currentTurn = "O";
  thereIsAWinner = false;
  winnerText.innerHTML = '';
  statusText.innerHTML = "Player O, you start!";
  resetButton.style.display = 'none';
    }
  }
}

resetButton.addEventListener('click', reset);
