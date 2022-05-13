import type { NextPage } from 'next'



const Home: NextPage = () => {
  return (
    <section>
      <div>
        <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">SoO Dashboar</span>
          </h2>
        </div>
      </div>
      <div className="w-full pt-10 mt-10 overflow-x-auto">
        <ul>
          <li>node status checker</li>
        </ul>
      </div>
    </section>
  )
}

export default Home
