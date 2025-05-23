import type { TPlayer } from '../components/ConnectFourPiece.tsx';

export const cleanBoard = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
];
const rows = cleanBoard.length;
const columns = cleanBoard[0].length;

export const dropPiece = (
    currentPlayer: TPlayer,
    column: number,
    board: Array<Array<null | TPlayer>>,
    updateBoard: (board: Array<Array<null | TPlayer>>) => void,
    setCurrentPlayer: (currentPlayer: TPlayer) => void,
): void => {
    for (let row = 5; row >= 0; --row) {
        if (board[row][column] === null) {
            board[row][column] = currentPlayer;
            updateBoard(board);

            setCurrentPlayer(currentPlayer === 'black' ? 'red' : 'black');

            break;
        }
    }
}

export const checkWinner = (
    board: Array<Array<null | TPlayer>>,
    setWinner: any,
) => {
    checkHorizontalMatch(board, setWinner);
    checkVerticalMatch(board, setWinner);
    checkDiagonalMatch(board, setWinner);
    checkAntiDiagonalMatch(board, setWinner);
}

const checkHorizontalMatch = (
    board: Array<Array<null | TPlayer>>,
    setWinner: (player: TPlayer) => void,
) => {
    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns - 3; column++){
            if (board[row][column] !== null) {
                if (
                    board[row][column] === board[row][column + 1] &&
                    board[row][column + 1] === board[row][column + 2] &&
                    board[row][column + 2] === board[row][column + 3]
                ) {
                    setWinner(board[row][column] as TPlayer);
                    break;
                }
            }
        }
    }
}

const checkVerticalMatch = (
    board: Array<Array<null | TPlayer>>,
    setWinner: (player: TPlayer) => void,
) => {
    for (let column = 0; column < columns; column++) {
        for (let row = 0; row < rows - 3; row++) {
            if (board[row][column] !== null) {
                if (
                    board[row][column] === board[row + 1][column] &&
                    board[row + 1][column] === board[row + 2][column] &&
                    board[row + 2][column] === board[row + 3][column]
                ) {
                    setWinner(board[row][column] as TPlayer);
                    break;
                }
            }
        }
    }
}

const checkDiagonalMatch = (
    board: Array<Array<null | TPlayer>>,
    setWinner: (player: TPlayer) => void,
) => {
    for (let row = 0; row < rows - 3; row++) {
        for (let column = 0; column < columns - 3; column++) {
            if (board[row][column] !== null) {
                if (
                    board[row][column] === board[row + 1][column + 1] &&
                    board[row + 1][column + 1] === board[row + 2][column + 2] &&
                    board[row + 2][column + 2] === board[row + 3][column + 3]
                ) {
                    setWinner(board[row][column] as TPlayer);
                    break;
                }
            }
        }
    }
}

const checkAntiDiagonalMatch = (
    board: Array<Array<null | TPlayer>>,
    setWinner: (player: TPlayer) => void,
) => {
    for (let row = 3; row < rows; row++) {
        for (let column = 0; column < columns - 3; column++) {
            if (board[row][column] !== null) {
                if (
                    board[row][column] === board[row - 1][column + 1] &&
                    board[row - 1][column + 1] === board[row - 2][column + 2] &&
                    board[row - 2][column + 2] === board[row - 3][column + 3]
                ) {
                    setWinner(board[row][column] as TPlayer);
                    break;
                }
            }
        }
    }
}
