let gameboard = (function () {
    let _board = ["", "", "", "", "", "", "", "", ""];
    let _playerOneTurn = true;
    let _turnCounter = 0;
    let _gameOver = false;

    function reset() {
        _board = ["", "", "", "", "", "", "", "", ""];
        _playerOneTurn = true;
        _turnCounter = 0;
        _gameOver = false;
    }

    function getBoard() {
        return _board;
    }

    function getTurnCounter() {
        return _turnCounter;
    }

    function makeMove(position, player) {
        if (_gameOver == false && _board[position] == '') {
            _board[position] = (player == true) ? "X" : "O";
            _playerOneTurn = !_playerOneTurn;
            _turnCounter += 1;
            displayController.updateGrid(gameboard);
        }
    }

    function whosTurn() {
        return _playerOneTurn;
    }

    function gameOver(){
        _gameOver = true;
    }

    return {
        reset,
        getBoard,
        makeMove,
        whosTurn,
        getTurnCounter,
        gameOver
    };
})();

let displayController = (function () {
    let updateGrid = function (board) {
        currentBoard = board.getBoard();
        currentBoard.forEach((element, index) => {
            let currentSquare = document.getElementById(index);
            currentSquare.innerText = element;
        })
        winningSolutionArray= game.getWinningSolutions();
        let hasXWinner = 0;
        let hasYWinner = 0;
        winningSolutionArray.forEach(element => {
            let hasWinner = element.every(element => currentBoard[element] == "X")            
            hasXWinner += (hasWinner) ? 1 : 0; 
        })

        winningSolutionArray.forEach(element => {
            let hasWinner = element.every(element => currentBoard[element] == "O")            
            hasYWinner += (hasWinner) ? 1 : 0; 
        })

        if(hasXWinner > 0){
            alert(playerOne.getName() + ' Wins');
            gameboard.gameOver();
        }
        else if( hasYWinner > 0){
            alert(playerTwo.getName() + ' Wins');
            gameboard.gameOver();
        }
        else if (gameboard.getTurnCounter() > 8){
            alert('Tie');
            gameboard.gameOver();
        }

    }

    let initializeGrid = function (board) {
        updateGrid(board);
        let resetButton = document.getElementById("resetButton");
        resetButton.addEventListener("click", () => {
            board.reset();
            updateGrid(board);
        })
        let square = 0;
        while (square < 9) {
            let currentSquare = document.getElementById(square);
            currentSquare.addEventListener("click", (e) => {
                gameboard.makeMove(e.target.id, gameboard.whosTurn())
            })
            square += 1
        }
    }

    return { initializeGrid, updateGrid }
})();

let Player = (name, playerOne = true) => {
    const sayName = () => console.log(`my name is ${name}`);
    const getName = () => {return name};
    const isPlayerOne = () => { return playerOne };
    return { sayName, isPlayerOne, getName };
}

let game = (function () {
    let _winningSolutions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    let getWinningSolutions = function () {
        return _winningSolutions;
    }
    return { getWinningSolutions };
})();

let playerOne = Player('Player One', true);
let playerTwo = Player('Player Two', false);

displayController.initializeGrid(gameboard);

