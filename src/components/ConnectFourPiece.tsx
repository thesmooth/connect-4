export type TPlayer = 'black' | 'red';

export interface IConnectFourPieceProps {
    player: TPlayer;
}

export function ConnectFourPiece(props: IConnectFourPieceProps) {
    return (
        <div className={`ConnectFourPiece ConnectFourPiece--${props.player}`}></div>
    );
}