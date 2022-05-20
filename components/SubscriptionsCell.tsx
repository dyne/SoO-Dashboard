import useSWR from "swr";
import React from "react";

const SubscriptionsCell = ({ uid }: { uid: string }) => {
    const url = `http://${uid}/api/zenswarm-oracle-get-identity`
    const { data } = useSWR(url)
    const subscriptions = data?.subscriptions
    const subscriptionsKeys =Object.keys(subscriptions? subscriptions : {})

    return (<>{subscriptionsKeys && subscriptionsKeys.map((s,i)=>
                <div key={i} className="tooltip" data-tip={JSON.stringify(subscriptions[s])}>
                    <span>{s}</span>
                </div>)}
            </>)
}

export default SubscriptionsCell;
