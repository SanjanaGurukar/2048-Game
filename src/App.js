import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      board: null,
      score: 0,
      gameOver: false,
      message: null,
    };
  }

  createBoard() {
    //let board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    let board = [];
    const n = 4; //n can be changed to any size we want
    for (let i = 0; i < n; i++) {
      const row = [];
      for (let j = 0; j < n; j++) {
        row.push(0);
      }
      board.push(row);
    }
    board = this.setRandom(this.setRandom(board));
    this.setState({ board, score: 0, gameOver: false, message: null });
  }

  setRandom(board) {
    const emptyGrids = this.getEmptyGrids(board);
    const randomCoordinate = emptyGrids[Math.floor(Math.random() * emptyGrids.length)];
    const randomNumber = this.getStartingNum();
    board[randomCoordinate[0]][randomCoordinate[1]] = randomNumber;
    return board;
  }

  getEmptyGrids(board) {
    const emptyGrids = [];
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === 0) { emptyGrids.push([row, col]) }
      }
    }
    return emptyGrids;
  }

  getStartingNum() {
    const startingNumbers = [2, 4];
    const randomNumber = startingNumbers[Math.floor(Math.random() * startingNumbers.length)];
    return randomNumber;
  }

  isChangeinBoard(previous, updated) {
    return (JSON.stringify(updated) !== JSON.stringify(previous)) ? true : false;
  }

  checkForGameWon(board) {
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === 2048) {
          this.setState({ gameOver: true, message: 'You Won!' });
        }
      }
    }
  }

  strike(direction) {
    if (!this.state.gameOver) {
      if (direction === 'left') {
        const movedLeft = this.strikeLeft(this.state.board);
        if (this.isChangeinBoard(this.state.board, movedLeft.board)) {
          const leftWithRandom = this.setRandom(movedLeft.board);

          if (this.isGameOver(leftWithRandom)) {
            this.setState({ board: leftWithRandom, gameOver: true, message: 'Game over!' });
          }
          else if (this.checkForGameWon(leftWithRandom)) {
            this.setState({ gameOver: true, message: 'You Won!' });
          }
          else {
            this.setState({ board: leftWithRandom, score: this.state.score += movedLeft.score });
          }
        }
      }
      else if (direction === 'right') {
        const movedRight = this.strikeRight(this.state.board);
        if (this.isChangeinBoard(this.state.board, movedRight.board)) {
          const rightWithRandom = this.setRandom(movedRight.board);

          if (this.isGameOver(rightWithRandom)) {
            this.setState({ board: rightWithRandom, gameOver: true, message: 'Game over!' });
          } else if (this.checkForGameWon(rightWithRandom)) {
            this.setState({ gameOver: true, message: 'You Won!' });
          } else {
            this.setState({ board: rightWithRandom, score: this.state.score += movedRight.score });
          }
        }
      }
      else if (direction === 'up') {
        const movedUp = this.strikeUp(this.state.board);
        if (this.isChangeinBoard(this.state.board, movedUp.board)) {
          const upWithRandom = this.setRandom(movedUp.board);

          if (this.isGameOver(upWithRandom)) {
            this.setState({ board: upWithRandom, gameOver: true, message: 'Game over!' });
          } else if (this.checkForGameWon(upWithRandom)) {
            this.setState({ gameOver: true, message: 'You Won!' });
          } else {
            this.setState({ board: upWithRandom, score: this.state.score += movedUp.score });
          }
        }
      }
      else if (direction === 'down') {
        const movedDown = this.strikeDown(this.state.board);
        if (this.isChangeinBoard(this.state.board, movedDown.board)) {
          const downWithRandom = this.setRandom(movedDown.board);

          if (this.isGameOver(downWithRandom)) {
            this.setState({ board: downWithRandom, gameOver: true, message: 'Game over!' });
          } else if (this.checkForGameWon(downWithRandom)) {
            this.setState({ gameOver: true, message: 'You Won!' });
          } else {
            this.setState({ board: downWithRandom, score: this.state.score += movedDown.score });
          }
        }
      }
      else {
        this.setState({ message: 'Sorry :( Game Over.' });
      }
    }
  }

  strikeLeft(inputBoard) {
    let board = [];
    let score = 0;
    for (let r = 0; r < inputBoard.length; r++) {
      let row = [];
      for (let c = inputBoard[r].length - 1; c >= 0; c--) {
        let current = inputBoard[r][c];
        (current === 0) ? row.push(current) : row.unshift(current);
      }
      board.push(row);
    }
    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board.length; c++) {
        if (board[r][c] > 0 && board[r][c] === board[r][c + 1]) {
          board[r][c] = board[r][c] * 2;
          board[r][c + 1] = 0;
          //add score
          score += board[r][c];
        }
        else if (board[r][c] === 0 && board[r][c + 1] > 0) {
          board[r][c] = board[r][c + 1];
          board[r][c + 1] = 0;
        }
      }
    }
    return { board, score };
  }

  strikeRight(inputBoard) {
    let board = [];
    let score = 0;
    for (let r = 0; r < inputBoard.length; r++) {
      let row = [];
      for (let c = 0; c < inputBoard[r].length; c++) {
        let current = inputBoard[r][c];
        (current === 0) ? row.unshift(current) : row.push(current);
      }
      board.push(row);
    }
    for (let r = 0; r < board.length; r++) {
      for (let c = board[r].length - 1; c >= 0; c--) {
        if (board[r][c] > 0 && board[r][c] === board[r][c - 1]) {
          board[r][c] = board[r][c] * 2;
          board[r][c - 1] = 0;
          //add score
          score += board[r][c];
        }
        else if (board[r][c] === 0 && board[r][c - 1] > 0) {
          board[r][c] = board[r][c - 1];
          board[r][c - 1] = 0;
        }
      }
    }
    return { board, score };
  }

  strikeUp(inputBoard) {
    let rotatedRight = this.rotateToRight(inputBoard);
    let board = [];
    let score = 0;
    for (let r = 0; r < rotatedRight.length; r++) {
      let row = [];
      for (let c = 0; c < rotatedRight[r].length; c++) {
        let current = rotatedRight[r][c];
        (current === 0) ? row.unshift(current) : row.push(current);
      }
      board.push(row);
    }
    for (let r = 0; r < board.length; r++) {
      for (let c = board[r].length - 1; c >= 0; c--) {
        if (board[r][c] > 0 && board[r][c] === board[r][c - 1]) {
          board[r][c] = board[r][c] * 2;
          board[r][c - 1] = 0;
          //add score
          score += board[r][c];
        }
        else if (board[r][c] === 0 && board[r][c - 1] > 0) {
          board[r][c] = board[r][c - 1];
          board[r][c - 1] = 0;
        }
      }
    }
    board = this.rotateToLeft(board);
    return { board, score };
  }

  strikeDown(inputBoard) {
    let rotatedRight = this.rotateToRight(inputBoard);
    let board = [];
    let score = 0;

    for (let r = 0; r < rotatedRight.length; r++) {
      let row = [];
      for (let c = rotatedRight[r].length - 1; c >= 0; c--) {
        let current = rotatedRight[r][c];
        (current === 0) ? row.push(current) : row.unshift(current);
      }
      board.push(row);
    }

    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board.length; c++) {
        if (board[r][c] > 0 && board[r][c] === board[r][c + 1]) {
          board[r][c] = board[r][c] * 2;
          board[r][c + 1] = 0;
          //add score
          score += board[r][c];
        }
        else if (board[r][c] === 0 && board[r][c + 1] > 0) {
          board[r][c] = board[r][c + 1];
          board[r][c + 1] = 0;
        }
      }
    }
    board = this.rotateToLeft(board);
    return { board, score };
  }

  rotateToLeft(inputBoard) {
    let result = [];

    for (let c = inputBoard.length - 1; c >= 0; c--) {
      let row = [];
      for (let r = inputBoard.length - 1; r >= 0; r--) {
        row.unshift(inputBoard[r][c]);
      }
      result.push(row);
    }
    return result;
  }

  rotateToRight(inputBoard) {
    let result = [];
    for (let c = 0; c < inputBoard.length; c++) {
      let row = [];
      for (let r = inputBoard.length - 1; r >= 0; r--) {
        row.push(inputBoard[r][c]);
      }
      result.push(row);
    }
    return result;
  }

  isGameOver(board) {
    let moves = [
      this.isChangeinBoard(board, this.strikeUp(board).board),
      this.isChangeinBoard(board, this.strikeRight(board).board),
      this.isChangeinBoard(board, this.strikeDown(board).board),
      this.isChangeinBoard(board, this.strikeLeft(board).board)
    ];
    return (moves.includes(true)) ? false : true;
  }

  componentWillMount() {
    this.createBoard();
    const body = document.querySelector('body');
    body.addEventListener('keydown', this.controlArrowKeys.bind(this));
  }

  controlArrowKeys(e) {
    const left = 37;
    const right = 39;
    const up = 38;
    const down = 40;

    if (e.keyCode === left) {
      this.strike('left');
    }
    else if (e.keyCode === right) {
      this.strike('right');
    }
    else if (e.keyCode === up) {
      this.strike('up');
    }
    else if (e.keyCode === down) {
      this.strike('down');
    }
  }

  render() {
    return (
      <div>
        <div className="sticky">2048 Game Assignment</div>
        <p><b>Use the keyboard arrow keys or the buttons to play.</b></p>
        <div className="button" onClick={() => { this.createBoard() }}>New Game</div>

        <div className="buttons">
          <div className="button" onClick={() => { this.strike('left') }}>Left</div>
          <div className="button" onClick={() => { this.strike('right') }}>Right</div>
          <div className="button" onClick={() => { this.strike('up') }}>Up</div>
          <div className="button" onClick={() => { this.strike('down') }}>Down</div>

        </div>

        <div className="score">Score: {this.state.score}</div>

        <table>
          {this.state.board.map((row, i) => (<Row key={i} row={row} />))}
        </table>
          <h1 className="msg"> {this.state.message}</h1> 
      </div>
    );
  }
};

const Row = ({ row }) => {
  return (
    <tr>
      {row.map((cell, i) => (<Cell key={i} cellValue={cell} />))}
    </tr>
  );
};

const Cell = ({ cellValue }) => {
  let value = (cellValue === 0) ? '' : cellValue;
  return (
    <td>
      <div className='cell'>
        <div className="number">{value}</div>
      </div>
    </td>
  );
};

export default App;