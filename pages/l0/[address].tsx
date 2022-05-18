import { useRouter } from "next/router";
import useSwr from "swr";
import { useEffect, useRef, useState } from 'react'

interface Tx {
    hash: string;
    height: number;
    transaction_ids: string[]
}

const TxCard = ({ hash, height, transaction_ids }: Tx) => {
    // TODO: Ennio make it 💄
    return (<>
        hash: {hash} <br />
        height: {height} <br />
        transaction_ids: <br />{transaction_ids.map(t => (t && <br />))}
    </>)
};

const NodeL0DetailPage = () => {
    const address = useRouter().query.address;
    const { data: meta } = useSwr(`http://${address}/`);
    const [transactions, setTransactions] = useState([]);

    const [isPaused, setPause] = useState(false);
    const ws = useRef(null);

    useEffect(() => {
        if (meta) {
            ws.current = new WebSocket(meta?.api?.v1?.streamedblocks || '')
            ws.current.onopen = () => console.log("ws opened");
            ws.current.onclose = () => console.log("ws closed");

            const wsCurrent = ws.current;

            return () => {
                wsCurrent.close();
            };
        }
    }, [meta]);

    useEffect(() => {
        if (!ws.current) return;

        ws.current.onmessage = e => {
            if (isPaused) return;
            const message: Tx = JSON.parse(e.data);
            setTransactions(transactions => [...transactions, message]);
        };
    }, [isPaused]);


    return (<>
        <div>
            {transactions && transactions.map(t => <TxCard {...t} key={t.height} />)}
            <button onClick={() => setPause(!isPaused)}>
                {isPaused ? "Resume" : "Pause"}
            </button>
        </div>    </>)
};

export default NodeL0DetailPage