import type {NextPage} from 'next';
import {useSession} from "next-auth/react";
import Link from "next/link";
import React from "react";

type HomepageData = {title: string, text: string, href: string, disabled?: boolean}


function Card({title, text, href, disabled = false}: HomepageData) {
    const link = disabled ? "/" : href
    return (
        <Link href={href}>
            <div className="card w-full h-60 mx-4 my-1 drop-shadow-xl bg-base-100">
                <div className="card-body">
                    <h2 className="card-title font-bold text-l">{title}</h2>
                    <p className="text-gray-400">{text}</p>
                    <div className="card-actions justify-end">
                        <Link href={link}><button className="btn btn-primary" disabled={disabled}>Go</button></Link>
                    </div>
                </div>
            </div>
        </Link>)
}


const Home: NextPage = () => {
    const {data: session} = useSession()

    const homepageData: Array<HomepageData> = [
        {
            title: 'L0',
            href: '/l0',
            text: 'Layer 0 monitoring'
        },
        {
            title: 'Software Passport',
            href: 'http://softwarepassport.dyne.org:3000',
            text: ''
        },
        {
            title: 'Oracles',
            href: '/identities',
            text: 'Swarm of Oracles Nodes healt and details'
        },
        {
            title: 'Services',
            href: session ? '/services' : '/',
            text: 'Monitor active services',
            disabled: !!!session
        },
        {
            title: 'Oracles Consensus Post',
            href: '/oracles_consesus_post',
            text: 'Send a post to consensus',
        },
        {
            title: 'Verify Notarization on Ethereum',
            href: '/verify_notariztion_on_ethereum',
            text: 'send txid and receive notariztion',
        },
    ]

    return (
        <section>
            <div>
                <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                    <div className="columns-1 md:columns-2">
                        {homepageData.map((h, i) => <Card {...h} key={i} />)}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home
