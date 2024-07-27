import NextAuth from "next-auth/next";
// import GoogleProvider from 'next-auth/providers/google';
import Yandex from "next-auth/providers/yandex"

console.log({
    clientId: process.env.YANDEX_ID,
    clientSecret: process.env.YANDEX_CLIENT_SECRET,
})

const handler = NextAuth({
    providers: [
        Yandex({
            clientId: process.env.YANDEX_ID,
            clientSecret: process.env.YANDEX_CLIENT_SECRET,
        })
    ],
    async session({ session }) {

    },
    async signIn({ profile }) {

    }
})