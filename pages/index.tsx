import type { NextPage } from 'next'
import Link from "next/link";
import { useSession } from "next-auth/react"

function card(text:string, href:string, disabled:boolean=false) {
    const baseClass = "card w-full mx-4 my-1 drop-shadow-xl"
    const cardClass = disabled?  `${baseClass} bg-slate-700` : `${baseClass} hover:bg-primary bg-base-100 hover:text-primary-content`
        return(
    <Link href={href}>
        <div className={cardClass}>
            <div className="card-body">
                <h2 className="card-title">{text}</h2>
            </div>
        </div>
    </Link>)}


const Home: NextPage = () => {
    const { data: session } = useSession()
    const serviceLink = session? "/services" : ""
  return (
    <section>
      <div>
        <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <div className="columns-1 md:columns-2">
                {card("Logs Managment","/")}
                {card("SoftwarePassport Task","/")}
                {card("Services",serviceLink , !session)}
                {card("Node State Checker","/identities")}
            </div>
        </div>
      </div>
    </section>
  )
}

export default Home
