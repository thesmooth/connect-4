import { useCallback, useEffect, useMemo, useState } from 'react';
import { ConnectFourPiece, type TPlayer } from './ConnectFourPiece.tsx';
import { dropPiece, checkWinner } from '../helpers/connectFour.ts';
import deepClone from '../helpers/deepClone.ts';

export interface IConnectFourBoardCellProps {
    updateBoard: (board: Array<Array<null | TPlayer>>) => void;
    columnIndex: number;
    rowIndex: number;
    currentPlayer: TPlayer;
    board: Array<Array<null | TPlayer>>;
    setCurrentPlayer: (player: TPlayer) => void;
    setWinner: (player: TPlayer) => void;
    winner: TPlayer | null;
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

    const onMouseEnter = useCallback(() => {
        props.setHoveredColumn(props.columnIndex);
    }, [props.columnIndex]);

    const onMouseLeave = useCallback(() => {
        props.setHoveredColumn(null);
    }, []);

    const onClick = useCallback(() => {
        const {
            board,
            columnIndex,
            currentPlayer,
            winner,
            updateBoard,
            setCurrentPlayer,
            setWinner,
        } = props;

        if (winner) return;

        const newBoard = deepClone(board);
        dropPiece(currentPlayer, columnIndex, newBoard, updateBoard, setCurrentPlayer);
        checkWinner(newBoard, setWinner);
    }, [
        props.board,
        props.columnIndex,
        props.currentPlayer,
        props.winner,
    ]);

    return (
        <div
            className="ConnectFourCell__container"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
        >
            {Boolean(cellValue) && (
                <div style={{
                    transform: dropAnimation
                        ? `translateY(0)`
                        : `translateY(-${(props.rowIndex + 1) * 6}vw)`,
                    transition: 'transform 0.5s ease',
                }}>
                    <ConnectFourPiece player={cellValue as TPlayer} />
                </div>
            )}
        </div>
    );
}
