import { useCallback, useState } from 'react';
import { ConnectFourBoardCell } from './ConnectFourBoardCell.tsx';
import { ConnectFourPiece, type TPlayer } from './ConnectFourPiece.tsx';
import { cleanBoard } from '../helpers/connectFour.ts';

export function ConnectFourBoard() {
    const [board, updateBoard] = useState<Array<Array<null | TPlayer>>>(cleanBoard);
    const [currentPlayer, setCurrentPlayer] = useState<TPlayer>('black');
    const [winner, setWinner] = useState<TPlayer | null>(null);
    const [hoveredColumn, setHoveredColumn] = useState<null | number>(null);

    const resetGame = useCallback(() => {
        updateBoard(cleanBoard);
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
                    setHoveredColumn={setHoveredColumn}
                />
            );
        });
    });

    return (
        <div className="ConnectFourBoard__container">
            <div className="ConnectFourBoard__header">
                {!winner && (hoveredColumn !== null) && (
                    <div style={{ marginLeft: `${0.6 + hoveredColumn * 6}vw` }}>
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

            <div className="ConnectFourBoard__footer">
                <button className="ConnectFourBoard__footer__reset-button" onClick={resetGame}>
                    Reset game
                </button>
            </div>
        </div>
    );
}