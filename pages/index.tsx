import type { NextPage } from 'next';
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

type HomepageData = {title: string, text:string, href:string, disabled?:boolean}
const homepageData:Array<HomepageData>  = [
    {
        title: 'L0',
        href: '/l0',
        text: 'Layer 0 monitoring'
    },
    {
        title: 'SoftwarePassport Task',
        href: '/L0',
        text: ''
    },
    {
        title: 'Oracles',
        href: '/identities',
        text: 'Swarm of Oracles Nodes healt and details'
    },
    {
        title: 'Services',
        href: '/services',
        text: 'Monitor active services',
        disabled: true
    },

]

function Card({title,text, href, disabled=false}: HomepageData) {
    const buttonClass = disabled ? "btn btn-primary disabled" : "btn btn-primary"
    return (
        <Link href={href}>
            <div className="card w-full h-60 mx-4 my-1 drop-shadow-xl bg-base-100">
                <div className="card-body">
                    <h2 className="card-title font-bold text-l">{title}</h2>
                     <p className="text-gray-400">{text}</p>
                    <div className="card-actions justify-end">
                        <Link href={href}><button className="btn btn-primary">Go</button></Link>
                    </div>
                </div>
            </div>
        </Link>)
}


const Home: NextPage = () => {
    const { data: session } = useSession()
    const serviceLink = session ? "/services" : ""
    return (
        <section>
            <div>
                <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                    <div className="columns-1 md:columns-2">
                        {homepageData.map((h,i)=> <Card {...h} key={i}/>)}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home
