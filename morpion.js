const game = document.getElementById("game");
const result = document.getElementById("result");
const reset = document.getElementById("reset");

const xImg = "mikum.jpg";
const oImg = "shiho.jpg";

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

function renderBoard() {
  game.innerHTML = "";
  board.forEach((cell, index) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.dataset.index = index;

    if (cell === "X") {
      const img = document.createElement("img");
      img.src = xImg;
      div.appendChild(img);
    } else if (cell === "O") {
      const img = document.createElement("img");
      img.src = oImg;
      div.appendChild(img);
    }

    div.addEventListener("click", handleClick);
    game.appendChild(div);
  });
}

function handleClick(e) {
  const index = e.currentTarget.dataset.index;
  if (board[index] !== "" || !gameActive || currentPlayer !== "X") return;

  board[index] = "X";
  renderBoard();
  checkWinner();

  if (gameActive) {
    currentPlayer = "O";
    setTimeout(botMove, 500); // petit délai pour l'effet
  }
}

function botMove() {
  const emptyCells = board
    .map((value, index) => (value === "" ? index : null))
    .filter((val) => val !== null);

  if (emptyCells.length === 0) return;

  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  board[randomIndex] = "O";
  renderBoard();
  checkWinner();
  currentPlayer = "X";
}

function checkWinner() {
  const winCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  for (const combo of winCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      result.textContent = `Le joueur ${board[a]} a gagné !`;
      gameActive = false;
      return;
    }
  }

  if (!board.includes("")) {
    result.textContent = "Match nul !";
    gameActive = false;
  }
}

reset.addEventListener("click", () => {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  result.textContent = "";
  renderBoard();
});

renderBoard();

    function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("collapsed");
  }