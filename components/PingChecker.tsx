import useSWR from "swr";

const PingChecker = (props: {data:any}) => {
    const url:string = `http://${props.data.cell.value}/api/zenswarm-oracle-get-identity`
    const { data } = useSWR(url)

    return <>{ data? "✅" : "🚫"}</>
}

export default PingChecker;
