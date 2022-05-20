import useSWR from "swr";
import React from "react";

const SubscriptionTooltip = ({ value }: { value: any}) => {
    const valueKeys = Object.keys(value)
    return <>{valueKeys.map((v,i)=><div key={i} className="tooltip" data-tip={value[v]}>
        <a className="text-xs mr-2 bold">{v}</a>
    </div>)}</>

}

const SubscriptionsCell = ({ uid }: { uid: string }) => {
    const url = `http://${uid}/api/zenswarm-oracle-get-identity`
    const { data } = useSWR(url)
    const subscriptions = data?.subscriptions
    const subscriptionsKeys =Object.keys(subscriptions? subscriptions : {})

    return (<>{subscriptionsKeys && subscriptionsKeys.map((s,i)=>
            <><span key={i}>{s}</span><br/>
        <SubscriptionTooltip value={subscriptions[s]}/>
              </>  )}
            </>)
}

export default SubscriptionsCell;
