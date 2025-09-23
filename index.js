// ---------------- Gameboard ----------------
const Gameboard = (function () {
    let board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];

    function updateArea(row, col, marker) {
        if (board[row][col] === "") {
            board[row][col] = marker;
            return true;
        }
        return false;
    }

    function reset() {
        board.forEach((row) => row.fill(""));
    }

    function isWinner(row, col, marker) {
        if (board[row].every((cell) => cell === marker)) return true;
        if (board.every((r) => r[col] === marker)) return true;
        if (row === col && board.every((r, i) => r[i] === marker)) return true;
        if (row + col === 2 && board.every((r, i) => r[2 - i] === marker))
            return true;
        return false;
    }

    function isFull() {
        return board.every((row) => row.every((cell) => cell !== ""));
    }

    return { updateArea, reset, isWinner, isFull };
})();

// ---------------- Players ----------------
function Player(name, marker) {
    this.name = name;
    this.marker = marker;
    this.score = 0;
}

Player.prototype.addScore = function () {
    this.score++;
};

Player.prototype.makeMove = function (row, col) {
    return Gameboard.updateArea(row, col, this.marker);
};

// ---------------- GameController ----------------
const GameController = (function () {
    let player1, player2, currentPlayer;
    let totalRounds = 0;
    let roundsLeft = 0;

    function init(p1Name, p2Name, rounds) {
        player1 = new Player(p1Name, "");
        player2 = new Player(p2Name, "");
        totalRounds = rounds;
        roundsLeft = rounds;
        coinToss();
    }

    function coinToss() {
        const toss = Math.random() < 0.5 ? player1 : player2;
        toss.marker = "X";
        (toss === player1 ? player2 : player1).marker = "O";
        currentPlayer = toss;
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    function getCurrentPlayer() {
        return currentPlayer;
    }

    function getPlayers() {
        return { player1, player2 };
    }

    function roundOver() {
        roundsLeft--;
        return roundsLeft > 0;
    }

    return {
        init,
        coinToss,
        switchPlayer,
        getCurrentPlayer,
        getPlayers,
        roundOver,
    };
})();

// ---------------- Display Controller ----------------
const DisplayController = (function () {
    let areas;
    let currentPlayer;
    let players;

    document.addEventListener("DOMContentLoaded", () => {
        areas = document.querySelectorAll(".area-marker");

        // Start button setup
        document.getElementById("start-game").addEventListener("click", () => {
            const p1Name =
                document.getElementById("player1-name").value || "Player 1";
            const p2Name =
                document.getElementById("player2-name").value || "Player 2";
            const rounds =
                parseInt(document.getElementById("rounds").value, 10) || 3;

            GameController.init(p1Name, p2Name, rounds);
            players = GameController.getPlayers();
            currentPlayer = GameController.getCurrentPlayer();

            updateScoreUI();
            updateTurnUI();

            // Disable setup so it can't be changed mid-game
            document
                .querySelectorAll(".setup input, .setup button")
                .forEach((el) => {
                    el.disabled = true;
                });
        });

        // Board clicks
        areas.forEach((element) => {
            element.addEventListener("click", () => {
                if (!currentPlayer || element.textContent !== "") return;

                const row = parseInt(element.dataset.row, 10);
                const col = parseInt(element.dataset.col, 10);

                if (currentPlayer.makeMove(row, col)) {
                    element.textContent = currentPlayer.marker;

                    if (Gameboard.isWinner(row, col, currentPlayer.marker)) {
                        currentPlayer.addScore();
                        updateScoreUI();
                        alert(`${currentPlayer.name} wins this round!`);

                        if (GameController.roundOver()) {
                            Gameboard.reset();
                            resetBoardUI();
                            GameController.coinToss(); // new toss each round
                            currentPlayer = GameController.getCurrentPlayer();
                            updateTurnUI();
                        } else {
                            alert("Game over!");
                        }
                        return;
                    }

                    if (Gameboard.isFull()) {
                        alert("It's a draw!");
                        if (GameController.roundOver()) {
                            Gameboard.reset();
                            resetBoardUI();
                            GameController.coinToss();
                            currentPlayer = GameController.getCurrentPlayer();
                            updateTurnUI();
                        } else {
                            alert("Game over!");
                        }
                        return;
                    }

                    GameController.switchPlayer();
                    currentPlayer = GameController.getCurrentPlayer();
                    updateTurnUI();
                }
            });
        });

        document.querySelector(".reset").addEventListener("click", () => {
            Gameboard.reset();
            resetBoardUI();
        });
    });

    function resetBoardUI() {
        areas.forEach((btn) => (btn.textContent = ""));
    }

    function updateTurnUI() {
        document.querySelector(
            ".player-turn"
        ).textContent = `Turn: ${currentPlayer.name} (${currentPlayer.marker})`;
    }

    function updateScoreUI() {
        document.querySelector(
            ".score"
        ).textContent = `${players.player1.name}: ${players.player1.score} | ${players.player2.name}: ${players.player2.score}`;
    }

    return {};
})();
