import { useRouter } from "next/router";
import useSwr from "swr";
import React, { ReactNode, useEffect, useRef, useState } from 'react'

interface Tx {
    hash: string;
    height: number;
    transaction_ids: string[]
}
const Definition = ({ label, value }: { label: string, value: string | ReactNode }) => {
    return (
        <>
            <dt className="font-medium text-gray-500">{label}</dt>
            <dd className="mt-1 break-all border-b text-accent">{value}</dd>
            <br />
        </>
    )
}

const TxCard = ({ hash, height, transaction_ids }: Tx) => {
    return (<>
        <div className="shadow-xl card w-fill bg-base-100">
            <div className="card-body">
                <h2 className="break-all card-title">{hash}</h2>
                <dl>
                    <Definition label="height" value={height} />
                    <Definition label="transaction_ids" value={transaction_ids.map((t, i) => (<ul key={i}><li className="">id:  {t}</li></ul>))} />
                </dl>
            </div>
        </div>
    </>)
};

const NodeL0DetailPage = () => {
    const address = useRouter().query.address;
    const { data: meta } = useSwr(`http://${address}/`);
    const [transactions, setTransactions] = useState([] as Array<any>);

    const [isPaused, setPause] = useState(false);
    const ws: any | null = useRef(null);

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

        ws.current.onmessage = (e: any) => {
            if (isPaused) return;
            const message: Tx = JSON.parse(e.data);
            setTransactions(transactions => [...transactions, message]);
        };
    }, [isPaused]);


    return (<>
        <div>
            <h1 className="text-3xl font-bold">Listening to blocks generated on {address}</h1>
            <button className="my-8 btn btn-primary btn-sm" onClick={() => setPause(!isPaused)}>
                {isPaused ? "Resume" : "Pause"}
            </button>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                {transactions && transactions.map(t => <TxCard {...t} key={t.height} />)}
            </div>
        </div>    </>)
};

export default NodeL0DetailPage


