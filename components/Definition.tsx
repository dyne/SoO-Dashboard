import React, {ReactNode} from "react";
import {ArrowSmDownIcon, ArrowSmUpIcon} from "@heroicons/react/solid";

const Definition = ({ label, value }: { label: string, value: string | ReactNode }) => {
    const [isOpen, setIsOpen] = React.useState(true);
    const arrowIcon = isOpen ? <ArrowSmDownIcon className="w-5 h-5 float-left mt-1"/> : <ArrowSmUpIcon className="w-5 h-5 float-left mt-1"/>
    const ddHidden = !isOpen ? "hidden" : "";
    return (
        <>
            <dt className="font-medium text-gray-500 justify-start" >
                <button onClick={() => setIsOpen(!isOpen)}>
                    {arrowIcon}{label}
                </button>
            </dt>
            <br />
            <dd className={`mt-1 break-all border-b text-accent ${ddHidden}`}>{value}</dd>
        </>

    )
}

export default Definition;