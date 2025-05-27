import { useCallback, useEffect, useMemo, useState } from 'react';
import { ConnectFourPiece, type TPlayer } from '../ConnectFourPiece/ConnectFourPiece.tsx';
import { dropPiece, checkWinner } from '../../helpers/connectFour.ts';
import deepClone from '../../helpers/deepClone.ts';

import './ConnectFourBoardCell.styles.css';

export interface IConnectFourBoardCellProps {
    updateBoard: (board: (null | TPlayer)[][]) => void;
    columnIndex: number;
    rowIndex: number;
    currentPlayer: TPlayer;
    board: (null | TPlayer)[][];
    setCurrentPlayer: (player: TPlayer) => void;
    setWinner: (player: TPlayer) => void;
    winner: TPlayer | null;
    movesLog: string;
    updateMovesLog: (moves: string) => void;
    setHoveredColumn: (columnIndex: number | null) => void;
}

export function ConnectFourBoardCell(props: IConnectFourBoardCellProps) {
    const [dropAnimation, setDropAnimation] = useState<boolean>(false);

    const cellValue = useMemo(() => {
        return props.board[props.rowIndex][props.columnIndex];
    }, [props.board]);

    useEffect(() => {
        if (cellValue) {
            setDropAnimation(true);
        } else {
            setDropAnimation(false);
        }
    }, [cellValue]);

    const onCellMouseEnter = useCallback(() => {
        props.setHoveredColumn(props.columnIndex);
    }, [props.columnIndex]);

    const onCellMouseLeave = useCallback(() => {
        props.setHoveredColumn(null);
    }, []);

    const onCellClick = useCallback(() => {
        const {
            board,
            columnIndex,
            currentPlayer,
            winner,
            updateBoard,
            setCurrentPlayer,
            setWinner,
            movesLog,
            updateMovesLog,
        } = props;

        if (winner) return;

        const newBoard = deepClone(board);
        dropPiece(
            currentPlayer,
            columnIndex,
            newBoard,
            updateBoard,
            setCurrentPlayer,
            movesLog,
            updateMovesLog,
        );
        checkWinner(newBoard, setWinner);
    }, [
        props.board,
        props.columnIndex,
        props.currentPlayer,
        props.winner,
        props.movesLog,
    ]);

    return (
        <div
            className="ConnectFourBoardCell"
            onMouseEnter={onCellMouseEnter}
            onMouseLeave={onCellMouseLeave}
            onClick={onCellClick}
        >
            <div className="ConnectFourBoardCell__cell" />

            {Boolean(cellValue) && (
                <div style={{
                    transform: dropAnimation
                        ? `translateY(0)`
                        : `translateY(-${(props.rowIndex + 1) * 100 + 15}px)`,
                    transition: `transform ${(props.rowIndex + 1)/6}s ease`,
                }}>
                    <ConnectFourPiece player={cellValue as TPlayer} />
                </div>
            )}
        </div>
    );
}
