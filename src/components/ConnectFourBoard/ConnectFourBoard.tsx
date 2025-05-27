import { useCallback, useState } from 'react';
import { ConnectFourBoardCell } from '../ConnectFourBoardCell/ConnectFourBoardCell.tsx';
import { ConnectFourPiece, type TPlayer } from '../ConnectFourPiece/ConnectFourPiece.tsx';
import { cleanBoard } from '../../helpers/connectFour.ts';
import { ConnectFourHints } from '../ConnectFourHints/ConnectFourHints.tsx';

import './ConnectFourBoard.styles.css';

export function ConnectFourBoard() {
    const [board, updateBoard] = useState<(null | TPlayer)[][]>(cleanBoard);
    const [movesLog, updateMovesLog] = useState<string>('');
    const [currentPlayer, setCurrentPlayer] = useState<TPlayer>('black');
    const [winner, setWinner] = useState<TPlayer | null>(null);
    const [hoveredColumn, setHoveredColumn] = useState<null | number>(null);

    const resetGame = useCallback(() => {
        updateBoard(cleanBoard);
        updateMovesLog('');
        setWinner(null);
        setCurrentPlayer('black');
    }, []);

    const boardComponents = board.map((row, rowIndex) => {
        return row.map((_, columnIndex) => {
            return (
                <ConnectFourBoardCell
                    key={`${rowIndex}${columnIndex}`}
                    updateBoard={updateBoard}
                    columnIndex={columnIndex}
                    rowIndex={rowIndex}
                    currentPlayer={currentPlayer}
                    board={board}
                    setCurrentPlayer={setCurrentPlayer}
                    setWinner={setWinner}
                    winner={winner}
                    movesLog={movesLog}
                    updateMovesLog={updateMovesLog}
                    setHoveredColumn={setHoveredColumn}
                />
            );
        });
    });

    return (
        <div className="ConnectFourBoard">
            <div className="ConnectFourBoard__header">
                {!winner && (hoveredColumn !== null) && (
                    <div style={{
                        marginLeft: `${10 + hoveredColumn * 100}px`,
                        transition: 'margin-left 0.3s ease',
                    }}>
                        <ConnectFourPiece player={currentPlayer} />
                    </div>
                )}

                {Boolean(winner) && (
                    <div className="ConnectFourBoard__header__winner">
                        {winner?.toUpperCase()} WINS!
                    </div>
                )}
            </div>

            <div className="ConnectFourBoard__board">{boardComponents}</div>

            <ConnectFourHints movesLog={movesLog} />

            <div className="ConnectFourBoard__footer">
                <button className="ConnectFourBoard__footer__reset-button" onClick={resetGame}>
                    Reset game
                </button>
            </div>
        </div>
    );
}