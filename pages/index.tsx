import type {NextPage} from 'next';
import {useSession} from "next-auth/react";
import Link from "next/link";
import React from "react";

type HomepageData = { title: string, text: string, href: string, disabled?: boolean }


function Card({title, text, href, disabled = false}: HomepageData) {
    const link = disabled ? "/" : href
    return (
        <Link href={href}>
            <div className="card w-full h-60 drop-shadow-xl bg-base-100">
                <div className="card-body">
                    <h2 className="card-title font-bold text-l">{title}</h2>
                    <p className="text-gray-400">{text}</p>
                    <div className="card-actions w-full justify-end">
                        <Link href={link}>
                            <button className="btn btn-primary" disabled={disabled}>Go</button>
                        </Link>
                    </div>
                </div>
            </div>
        </Link>)
}


const Home: NextPage = () => {
    const {data: session} = useSession()
    const Oracles = {
        title: 'Oracles',
        href: '/identities',
        text: 'Swarm of Oracles Nodes healt and details',
        button: 'Online Swarm of Oracles Nodes'
    }

    const homepageData: Array<HomepageData> = [
        {
            title: 'Oracles Consensus Post',
            href: '/oracles_consesus_post',
            text: 'Send a post to consensus',
        },
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
            title: 'Verify Notarization on Ethereum',
            href: '/verify_notariztion_on_ethereum',
            text: 'send txid and receive notariztion',
        },
    ]

    return (
        <section>
            <div
                className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl"><span
                    className="block">{Oracles.title}</span><span className="block text-indigo-600">{Oracles.text}</span>
                </h2>
                <div className="flex mt-8 lg:mt-0 lg:flex-shrink-0">
                    <div className="inline-flex rounded-md">
                    </div>
                    <div className="inline-flex ml-3 rounded-md shadow">
                        <a href={Oracles.href}
                           className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700">
                            {Oracles.button}
                        </a></div>
                </div>
            </div>
            <div>
                <div
                    className="flex ml-8">
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4 lg:gap-36">
                        {homepageData.map((h, i) => <Card {...h} key={i}/>)}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home
