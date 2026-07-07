let board = [
    "", "", "",
    "", "", "",
    "", "", ""
];

const PLAYER = "X";
const COMPUTER = "O";
let currentPlayer = PLAYER;
let gameOver = false;
let moveCount = 0;
let playerName = "";

const cells = document.querySelectorAll(".cell");
const playerDisplay = document.getElementById("playerDisplay");
const turnIndicator = document.getElementById("turnIndicator");
const restartBtn = document.getElementById("restartBtn");
const exitBtn = document.getElementById("exitBtn");

const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]
];

function initializeGame() {
    playerName = localStorage.getItem("playerName");
    if (!playerName) {
        window.location.href = "player.html";
        return;
    }
    playerDisplay.textContent = playerName;
    board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    currentPlayer = PLAYER;
    moveCount = 0;
    gameOver = false;
    cells.forEach(cell => {
        cell.textContent = "";
        cell.disabled = false;

    });
    turnIndicator.textContent = "Your Turn";
}

function handlePlayerMove(event) {
    if (gameOver) return;
    const cell = event.target;
    const index = cell.dataset.cell;
    if (board[index] !== "") return;
    board[index] = PLAYER;
    cell.textContent = PLAYER;
    cell.disabled = true;
    moveCount++;
    if (checkWinner(PLAYER)) {
        endGame(playerName);
        return;
    }

    if (checkDraw()) {
        endGame("Draw");
        return;
    }

    turnIndicator.textContent = "Computer Thinking...";
    setTimeout(() => {
        computerMove();
    }, 500);
}

cells.forEach(cell => {
    cell.addEventListener("click", handlePlayerMove);
});

restartBtn.addEventListener("click", restartGame);

exitBtn.addEventListener("click", exitGame);


initializeGame();

function computerMove() {
    if (gameOver) return;
    const emptyCells = [];
    board.forEach((value, index) => {
        if (value === "") {
            emptyCells.push(index);
        }
    });

    if (emptyCells.length === 0) return;

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const move = emptyCells[randomIndex];
    board[move] = COMPUTER;
    cells[move].textContent = COMPUTER;
    cells[move].disabled = true;
    moveCount++;

    if (checkWinner(COMPUTER)) {
        endGame("Computer");
        return;
    }

    if (checkDraw()) {
        endGame("Draw");
        return;
    }
    turnIndicator.textContent = "Your Turn";
}

function checkWinner(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return board[index] === player;
        });
    });
}

function checkDraw() {
    return moveCount === 9;
}

function endGame(winner) {
    gameOver = true;
    cells.forEach(cell => {
        cell.disabled = true;
    });

    if (winner === playerName) {
        turnIndicator.textContent = "🎉 You Win!";
    }
    else if (winner === "Computer") {
        turnIndicator.textContent = "🤖 Computer Wins!";
    }
    else {
        turnIndicator.textContent = "🤝 Draw!";
    }

    saveMatch(winner);

    setTimeout(() => {
        alert(`Result : ${winner}\nMoves : ${moveCount}`);
    }, 200);
}

async function saveMatch(winner) {
    const matchData = {
        playerName: playerName,
        winner: winner,
        moves: moveCount
    };
    try {
        const response = await fetch("https://tic-tac-toe-t88q.onrender.com/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(matchData)
        });
        const data = await response.json();
        console.log("Match Saved:", data);
    } catch (error) {
        console.error("Error Saving Match:", error);
    }
}
function restartGame() {
    initializeGame();
}

function exitGame() {
    const confirmExit = confirm(
        "Exit current game?"
    );
    if (confirmExit) {
        window.location.href = "index.html";
    }
}