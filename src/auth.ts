import NextAuth, { type DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import authConfig from './auth.config';
import getMyProfile from './actions/user.action';
import * as storageService from '@/helper/storage';
import { storageKeys } from '@/helper/configs';

type ExtendedUser = DefaultSession['user'] & {
	role: 'Admin' | 'User';
	uid: string;
	id: string;
	active: boolean;
};

declare module 'next-auth/jwt' {
	interface JWT {
		role?: 'Admin' | 'User';
		uid: string;
		id: string;
		active: boolean;
	}
}

declare module 'next-auth' {
	interface Session {
		user: ExtendedUser;
	}

	interface User {
		uid: string;
		active: boolean;
	}
}

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	session: { strategy: 'jwt' },
	callbacks: {
		async signIn({ user }) {
			// this will be triggered before creating session and after signIn
			if (!user.active) return false;
			return true;
		},
		async session({ token, session }) {
			if (token.sub && session.user) session.user.id = token.sub;
			if (token.role && session.user) session.user.role = token.role;
			if (token.uid && session.user) session.user.uid = token.uid;
			if (token.active && session.user) session.user.active = token.active;

			return session;
		},
		async jwt({ token, user, account, profile }) {
			const apiToken = await storageService.loadString(storageKeys.ACCESS_TOKEN);
			if (!apiToken) return token;

			const myProfile = await getMyProfile();

			if (!myProfile) return token;

			token.role = myProfile.role;
			token.uid = myProfile.uid;
			token.id = myProfile.id;

			return token;
		},
	},
	...authConfig,
});
