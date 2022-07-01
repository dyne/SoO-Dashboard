import useSWR from "swr";

const PingChecker = ({ uid, api = "/api/zenswarm-oracle-ping.zen" }: { uid: string, api?: string }) => {
    const url: string = `${uid}${api.replace('.zen', '')}`
    const { data } = useSWR(url)

    return <>{data?.output.includes("I_am_alive!") ? "✅" : "🚫"}</>
}

export default PingChecker;
