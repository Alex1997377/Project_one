import NextAuth from "next-auth/next";
import Yandex from "next-auth/providers/yandex"

import User from "@models/user";
import { connectToDB } from "@utils/database";
import Email from "next-auth/providers/email";

const handler = NextAuth({
    providers: [
        Yandex({
            clientId: process.env.YANDEX_ID,
            clientSecret: process.env.YANDEX_CLIENT_SECRET,
        })
    ],
    async session({ session }) {
        const sessionUser = await User.findOne({
            email: session.user.email
        })

        session.user.id = sessionUser._id.toString();

        return session;
    },
    async signIn({ profile }) {
        try {
            await connectToDB();
            // если пользователь уже зарегистрировался
            const userExists = await User.findOne({
                email: profile.email,
                username: profile.name.replace(" ", '').toLowerCase(),
                image: profile.picture
            });

            // если пользователя нет, создаем нового пользователя

            return true; 
        } catch (error) {
          console.log(error)
          return false;
        }
    }
})

export {handler as GET, handler as POST};