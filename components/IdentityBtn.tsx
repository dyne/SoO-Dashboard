import Link from "next/link";

const IdentityBtn = (props: {data:any}) => {
    const url:string = `/identities/${props.data.cell.row.cells[6].value}`

    return <Link href={url}><a className="btn btn-primary btn-xs">Details</a></Link>
}

export default IdentityBtn;
