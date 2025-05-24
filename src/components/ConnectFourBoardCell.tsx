import {useCallback, useMemo} from 'react';
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

    const cellValue = useMemo(() => {
        return props.board[props.rowIndex][props.columnIndex];
    }, [props.board]);

    return (
        <div
            className="ConnectFourCell__container"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
        >
            {Boolean(cellValue) && (
                <ConnectFourPiece player={cellValue as TPlayer} />
            )}
        </div>
    );
}