import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {SessionProvider} from "next-auth/react"
import Layout from '../components/Layout'
import {SWRConfig} from 'swr'


function MyApp({Component, pageProps: {session, ...pageProps}}: AppProps) {
    return (<SessionProvider session={session}>
                <SWRConfig value={{
                    refreshInterval: 500,
                    fetcher: (resource: string, init) => {
                        return fetch(resource, init).then((res) => res.json())
                    }
                }}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </SWRConfig>
            </SessionProvider>)
}

export default MyApp



