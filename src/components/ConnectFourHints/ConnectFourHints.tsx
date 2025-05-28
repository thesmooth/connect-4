import { useQuery } from '@tanstack/react-query';

import './ConnectFourHints.styles.css';
import {Spinner} from "../Spinner/Spinner.tsx";

export function ConnectFourHints({ movesLog }: { movesLog: string }) {
    const { isPending, error, data } = useQuery({
        queryKey: ['hints', movesLog],
        queryFn: async () => {
            const res = await fetch(`https://connect4.gamesolver.org/solve?pos=${movesLog}`);

            if (!res.ok) {
                throw new Error('Network request failed');
            }

            return res.json();
        },
    });

    if (error) return null;

    const hints = (!data?.score ? [0, 0, 0, 0, 0, 0, 0] : data.score)
        .map((columnScore: number, index: number) => {
            if (columnScore === 100) {
                return (
                    <div
                        key={index}
                        className="ConnectFourHints__score ConnectFourHints__score--not-applicable"
                    />
                );
            }

            if (columnScore > 0) {
                return (
                    <div
                        key={index}
                        className="ConnectFourHints__score ConnectFourHints__score--good"
                    >
                        {columnScore}
                    </div>
                );
            }

            if (columnScore < 0) {
                return (
                    <div
                        key={index}
                        className="ConnectFourHints__score ConnectFourHints__score--bad"
                    >
                        {columnScore}
                    </div>
                );
            }

            return (
                <div
                    key={index}
                    className="ConnectFourHints__score"
                >
                    {isPending ? <Spinner /> : columnScore}
                </div>
            );
        });

    return (
        <div className="ConnectFourHints">
            {hints}
        </div>
    );
}