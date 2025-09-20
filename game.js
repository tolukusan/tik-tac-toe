const readline = require("readline");

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
        } else {
            return false;
        }
    }

    function printBoard() {
        console.log("\nBoard:");
        board.forEach((row) => {
            console.log(
                row.map((cell) => (cell === "" ? "_" : cell)).join(" ")
            );
        });
        console.log("");
    }

    function reset() {
        board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ];
    }

    function checkWin(marker) {
        // rows
        for (let row of board) {
            if (row.every((cell) => cell === marker)) return true;
        }
        // cols
        for (let c = 0; c < 3; c++) {
            if (
                board[0][c] === marker &&
                board[1][c] === marker &&
                board[2][c] === marker
            )
                return true;
        }
        // diagonals
        if (
            board[0][0] === marker &&
            board[1][1] === marker &&
            board[2][2] === marker
        )
            return true;
        if (
            board[0][2] === marker &&
            board[1][1] === marker &&
            board[2][0] === marker
        )
            return true;

        return false;
    }

    function isFull() {
        return board.every((row) => row.every((cell) => cell !== ""));
    }

    return { updateArea, printBoard, reset, checkWin, isFull };
})();

// ---------------- Players ----------------
const Players = function (name) {
    this.name = name;
    this.score = 0;
    this.position = Math.random();
};

Players.prototype.addScore = function () {
    this.score++;
};

Players.prototype.setMarker = function (marker) {
    this.marker = marker;
};

Players.prototype.makeMove = function (row, col) {
    return Gameboard.updateArea(row, col, this.marker);
};

// ---------------- GameController ----------------
const GameController = (function () {
    let player1, player2, currentPlayer;

    function init(p1Name, p2Name) {
        player1 = new Players(p1Name);
        player2 = new Players(p2Name);
    }

    function whoGoesFirst() {
        if (player1.position >= player2.position) {
            player1.setMarker("X");
            player2.setMarker("O");
            currentPlayer = player1;
        } else {
            player1.setMarker("O");
            player2.setMarker("X");
            currentPlayer = player2;
        }
        return currentPlayer;
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    function getCurrentPlayer() {
        return currentPlayer;
    }

    return { init, whoGoesFirst, switchPlayer, getCurrentPlayer };
})();

// ---------------- CLI ----------------
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Enter player 1 name: ", (p1) => {
    rl.question("Enter player 2 name: ", (p2) => {
        GameController.init(p1, p2);
        let first = GameController.whoGoesFirst();
        console.log(`${first.name} goes first with marker ${first.marker}`);
        Gameboard.printBoard();
        playTurn();
    });
});

function playTurn() {
    let player = GameController.getCurrentPlayer();
    rl.question(
        `${player.name} (${player.marker}), enter row and col (e.g., 0 2): `,
        (input) => {
            let [row, col] = input.split(" ").map(Number);
            if (row >= 0 && row < 3 && col >= 0 && col < 3) {
                if (player.makeMove(row, col)) {
                    Gameboard.printBoard();
                    if (Gameboard.checkWin(player.marker)) {
                        console.log(`${player.name} wins! 🎉`);
                        rl.close();
                        return;
                    }
                    if (Gameboard.isFull()) {
                        console.log("It's a draw!");
                        rl.close();
                        return;
                    }
                    GameController.switchPlayer();
                    playTurn();
                } else {
                    console.log("Cell already taken, try again.");
                    playTurn();
                }
            } else {
                console.log("Invalid input, try again.");
                playTurn();
            }
        }
    );
}
