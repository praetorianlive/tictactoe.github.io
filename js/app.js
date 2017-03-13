/*
 * To determine a win condition, each square is "tagged" from left
 * to right, top to bottom, with successive powers. Each cell
 * thus represents an individual bit. So we should remember each 
 * users choice and put it in to the array, and than we check if the 
 * user combination equal with win combination.
 * 
 *   
 *          1 |   2 |   4 
 *       -----+-----+-------
 *          8 |  16 |  32 
 *       -----+-----+-------
 *         64 | 128 | 256 
 *     
 *      
 */

var Game = (function () {
    function Game() {
        this.squares = [];
        this.EMPTY = "\xA0";
        this.moves = 0;
        this.wins = ["1 2 4", "8 16 32", "64 128 256", "1 16 256", "4 16 64", "1 8 64", "1 16 128", "4 32 256"];
        this.gameNumber = 0;
        this.player1 = { name: "player1", symbol: "X", score: 0 };
        this.player2 = { name: "player2", symbol: "O", score: 0 };
    }
    Game.prototype.startNewGame = function () {
        this.setSymbols();
        this.score = { "X": "", "O": "" };
        this.moves = 0;
        for (var i = 0; i < this.squares.length; i += 1) {
            this.squares[i].firstChild.nodeValue = this.EMPTY;
        }
        this.gameNumber++;
        document.getElementById("game_name").innerHTML = "Game " + this.gameNumber;
        document.getElementById("score_player1").innerHTML = String(this.player1.score);
        document.getElementById("simbol_pleyer1").innerHTML = String(this.player1.symbol);
        document.getElementById("score_player2").innerHTML = String(this.player2.score);
        document.getElementById("simbol_pleyer2").innerHTML = String(this.player2.symbol);
    };
    Game.prototype.setSymbols = function () {
        var num = Math.floor((Math.random() * 2) + 1);
        if (num === 1) {
            this.player1.symbol = "X";
            this.player2.symbol = "O";
            this.activePlayer = this.player1;
        }
        else {
            this.player1.symbol = "O";
            this.player2.symbol = "X";
            this.activePlayer = this.player2;
        }
    };
    Game.prototype.win = function (score) {
        var source = score.split(",");
        for (var i = 0; i < this.wins.length; i++) {
            var arr = this.wins[i].split(" ");
            var count = 0;
            for (var k = 0; k < source.length; k++) {
                if (source[k] === arr[0] || source[k] === arr[1] || source[k] === arr[2]) {
                    count++;
                }
            }
            if (count === 3) {
                return true;
            }
        }
        return false;
    };
    Game.prototype.set = function (cell) {
        if (cell.firstChild.nodeValue !== this.EMPTY) {
            return;
        }
        var smbl = this.activePlayer.symbol;
        cell.firstChild.nodeValue = smbl;
        this.moves += 1;
        this.score[smbl] += String(cell.indicator) + ",";
        if (this.win(this.score[smbl])) {
            if (smbl === this.player1.symbol) {
                alert(this.player1.name + " wins!");
                this.player1.score++;
            }
            if (smbl === this.player2.symbol) {
                alert(this.player2.name + " wins!");
                this.player2.score++;
            }
            this.startNewGame();
        }
        else if (this.moves === 9) {
            alert("Equal score!");
            this.startNewGame();
        }
    };
    Game.prototype.up = function () {
        var id = this.activeCell.id;
        var newRowNumber = Number(id[0]) - 1;
        var newColNumber = id[1];
        var newNumberCurrentCell = String(newRowNumber) + newColNumber;
        if (newRowNumber >= 1 && newRowNumber <= 3) {
            this.activeCell.className = "";
            document.getElementById(newNumberCurrentCell).className = "activeCell";
            this.activeCell = document.getElementById(newNumberCurrentCell);
        }
    };
    Game.prototype.down = function () {
        var id = this.activeCell.id;
        var newRowNumber = Number(id[0]) + 1;
        var newColNumber = id[1];
        var newNumberCurrentCell = String(newRowNumber) + newColNumber;
        if (newRowNumber >= 1 && newRowNumber <= 3) {
            this.activeCell.className = "";
            document.getElementById(newNumberCurrentCell).className = "activeCell";
            this.activeCell = document.getElementById(newNumberCurrentCell);
        }
    };
    Game.prototype.left = function () {
        var id = this.activeCell.id;
        var newRowNumber = id[0];
        var newColNumber = Number(id[1]) - 1;
        var newNumberCurrentCell = String(newRowNumber) + newColNumber;
        if (newColNumber >= 1 && newColNumber <= 3) {
            this.activeCell.className = "";
            document.getElementById(newNumberCurrentCell).className = "activeCell";
            this.activeCell = document.getElementById(newNumberCurrentCell);
        }
    };
    Game.prototype.right = function () {
        var id = this.activeCell.id;
        var newRowNumber = id[0];
        var newColNumber = Number(id[1]) + 1;
        var newNumberCurrentCell = String(newRowNumber) + newColNumber;
        if (newColNumber >= 1 && newColNumber <= 3) {
            this.activeCell.className = "";
            document.getElementById(newNumberCurrentCell).className = "activeCell";
            this.activeCell = document.getElementById(newNumberCurrentCell);
        }
    };
    Game.prototype.action = function (code) {
        if (this.activePlayer === this.player1) {
            switch (code) {
                case 87:
                    this.up();
                    break;
                case 83:
                    this.down();
                    break;
                case 65:
                    this.left();
                    break;
                case 68:
                    this.right();
                    break;
                case 90:
                    this.set(this.activeCell);
                    this.activePlayer = this.player2;
                    break;
            }
        }
        else {
            switch (code) {
                case 38:
                    this.up();
                    break;
                case 40:
                    this.down();
                    break;
                case 37:
                    this.left();
                    break;
                case 39:
                    this.right();
                    break;
                case 57:
                    this.set(this.activeCell);
                    this.activePlayer = this.player1;
                    break;
            }
        }
    };
    Game.prototype.play = function () {
        var board = document.createElement("table"), indicator = 1, row, cell, parent;
        board.border = "1";
        for (var i = 0; i < 3; i++) {
            row = document.createElement("tr");
            board.appendChild(row);
            for (var j = 0; j < 3; j++) {
                cell = document.createElement("td");
                cell.id = String(i + 1) + String(j + 1);
                cell.width = cell.height = 50;
                cell.align = cell.valign = 'center';
                cell.indicator = indicator;
                cell.appendChild(document.createTextNode(""));
                row.appendChild(cell);
                this.squares.push(cell);
                indicator += indicator;
            }
        }
        parent = document.getElementById("table_game");
        parent.appendChild(board);
        document.getElementById("11").className = "activeCell";
        this.activeCell = document.getElementsByClassName("activeCell")[0];
        document.addEventListener('keydown', function (event) {
            this.action(event.keyCode);
        }.bind(this));
        this.startNewGame();
    };
    return Game;
}());

var game = new Game();
game.play();
