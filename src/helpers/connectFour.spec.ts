import { assert, test } from 'vitest'
import { checkWinner, cleanBoard, dropPiece } from './connectFour.ts';
import deepClone from './deepClone.ts';
import type { TPlayer } from '../components/ConnectFourPiece.tsx';

test('"dropPiece" function should update chosen column and swap current player', () => {
    let board: Array<Array<null | TPlayer>> = deepClone(cleanBoard);
    let currentPlayer: TPlayer = 'black';

    dropPiece(
        currentPlayer,
        0,
        board,
        (newBoard: Array<Array<null | TPlayer>>) => { board = newBoard; },
        (newPlayer: TPlayer) => { currentPlayer = newPlayer; }
    );
    assert.deepEqual(board, [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        ['black', null, null, null, null, null, null],
    ]);

    dropPiece(
        currentPlayer,
        3,
        board,
        (newBoard: Array<Array<null | TPlayer>>) => { board = newBoard; },
        (newPlayer: TPlayer) => { currentPlayer = newPlayer; }
    );
    assert.deepEqual(board, [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        ['black', null, null, 'red', null, null, null],
    ]);

    dropPiece(
        currentPlayer,
        3,
        board,
        (newBoard: Array<Array<null | TPlayer>>) => { board = newBoard; },
        (newPlayer: TPlayer) => { currentPlayer = newPlayer; }
    );
    assert.deepEqual(board, [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, 'black', null, null, null],
        ['black', null, null, 'red', null, null, null],
    ]);
});

test('"checkWinner" function should detect when player wins the game', () => {
    let winner: TPlayer | null = null;
    let board: Array<Array<null | TPlayer>> = deepClone(cleanBoard);

    checkWinner(
        board,
        (player: TPlayer) => { winner = player; },
    );
    assert.equal(winner, null);

    board = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        ['black', null, null, null, null, null, null],
        ['black', null, null, 'black', null, null, null],
        ['black', 'red', 'red', 'red', 'red', null, null],
    ];

    checkWinner(
        board,
        (player: TPlayer) => { winner = player; },
    );
    assert.equal(winner, 'red');

    winner = null;
    board = [
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [ 'black', null, null, null, null, null, null ],
        ['black', 'red', 'black', 'red', null, null, null ],
        ['black', 'black', 'black', 'red', null, null, null ],
        ['black', 'red', 'red', 'red', null, null, null ]
    ];

    checkWinner(
        board,
        (player: TPlayer) => { winner = player; },
    );
    assert.equal(winner, 'black');

    winner = null;
    board = [
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [ 'red', null, null, 'black', null, null, null ],
        ['black', null, 'black', 'red', null, null, null ],
        ['black', 'black', 'black', 'red', null, null, null ],
        ['black', 'red', 'red', 'red', null, null, null ]
    ];

    checkWinner(
        board,
        (player: TPlayer) => { winner = player; },
    );
    assert.equal(winner, 'black');

    winner = null;
    board = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        ['red', null, null, null, null, null, null],
        ['black', 'red', null, null, null, null, null],
        ['red', 'black', 'red', 'black', null, null, null],
        ['black', 'red', 'black', 'red', 'black', null, null],
    ];

    checkWinner(
        board,
        (player: TPlayer) => { winner = player; },
    );
    assert.equal(winner, 'red');
});
