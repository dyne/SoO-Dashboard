import type { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    providers: [
  CredentialsProvider({
    name: 'Sign In',
    credentials: {
      username: { label: "Username", type: "text", placeholder: "jsmith" },
      password: {  label: "Password", type: "password" }
    },
    // @ts-ignore
    authorize(credentials, req) {
      if (credentials?.username === process.env.user && credentials?.password === process.env.password){
        return process.env.user
      }
      return null
    }
  })
]
  })
}