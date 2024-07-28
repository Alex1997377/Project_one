import NextAuth from "next-auth/next";
import Yandex from "next-auth/providers/yandex"

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

export {handler as GET, handler as POST};