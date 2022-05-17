import { useSession, signIn, signOut } from "next-auth/react"


export default function LoginBtn() {
  const { data: session } = useSession()
    return (
      <>
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    {session? <div className="w-10 rounded-full">
                        <img src="https://api.lorem.space/image/face?hash=33791"/>
                    </div> :
                        <div className="w-10 rounded-full">
                        <img src="https://via.placeholder.com/150"/>
                    </div>}
                </label>
                {session? <ul tabIndex={0}
                    className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                    <li>
                        <a className="justify-between">
                            Profile {session.user?.email}
                            <span className="badge">New</span>
                        </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li><a onClick={() => signOut()}>Logout</a></li>
                </ul> : <ul tabIndex={0}
                    className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                    <li>
                        not logged in
                    </li>
                    <li><a onClick={() => signIn()}>Login</a></li>
                </ul> }
            </div>
      </>
    )
}
