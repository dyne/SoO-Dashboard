import useSWR from "swr";

const PingChecker = ({ uid, api = "" }: { uid: string, api: string }) => {
    const url: string = `http://${uid}${api.replace('.zen', '')}`
    const { data } = useSWR(url)

    return <>{data?.output.includes("I_am_alive!") ? "✅" : "🚫"}</>
}

export default PingChecker;
