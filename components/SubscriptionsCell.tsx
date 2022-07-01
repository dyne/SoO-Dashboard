import useSWR from "swr";
import React from "react";

const SubscriptionTooltip = ({ value }: { value: any}) => {
    const valueKeys = Object.keys(value)
    return <>{valueKeys.map((v,i)=><div key={i} className="tooltip" data-tip={value[v]}>
        <a className="text-xs mr-2 bold">{v}</a>
    </div>)}</>

}

const SubscriptionsCell = ({ data }: { data: any }) => {
    const subscriptions = data?.subscriptions
    const subscriptionsKeys =Object.keys(subscriptions? subscriptions : {})
    return (<>{subscriptionsKeys && subscriptionsKeys.map((s,i)=>
            <><span className="font-bold text-xs" key={i}>{s}</span><br/>
        <SubscriptionTooltip value={subscriptions[s]}/>
                <br/> <span className="font-bold text-xs">to {data.identity.L0}</span>
              </>  )}

            </>)
}

export default SubscriptionsCell;
