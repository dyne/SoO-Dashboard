import useSWR from "swr";
import React from "react";

const SubscriptionTooltip = ({ value }: { value: any}) => {
    const valueKeys = Object.keys(value)
    return <>{valueKeys.map((v,i)=><div key={i} className="tooltip" data-tip={value[v]}>
        <a className="text-xs mr-2 bold">{v}</a>
    </div>)}</>

}

const SubscriptionsCell = ({ uid }: { uid: string }) => {
    const planetMint = ['172.104.233.185:26113',
    '151.236.222.33:26735',
    '151.236.222.33:28004',
    '172.104.233.185:25600',
    'zenswarm.zenroom.org:26729',
    '151.236.222.33:26735',
    'zenswarm.zenroom.org:26497'
    ]
    const url = `http://${uid}/api/zenswarm-oracle-get-identity`
    const { data } = useSWR(url)
    const subscriptions = data?.subscriptions
    const subscriptionsKeys =Object.keys(subscriptions? subscriptions : {})

    return (<>{subscriptionsKeys && subscriptionsKeys.map((s,i)=>
            <><span className="font-bold text-xs" key={i}>{s}</span><br/>
        <SubscriptionTooltip value={subscriptions[s]}/>
                {planetMint.includes(uid) && <><br/> <span className="font-bold text-xs">to Planetmint</span></>}
                {!planetMint.includes(uid) && <><br/> <span className="font-bold text-xs">to Ethereum</span></>}
              </>  )}

            </>)
}

export default SubscriptionsCell;
