import CredentialProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import type { NextAuthConfig } from 'next-auth';
import { LoginSchema } from '@/schemas';
import * as API from '@/services/API';

export default {
	trustHost: true,
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		CredentialProvider({
			async authorize(credentials) {
				const validatedFields = LoginSchema.safeParse(credentials);
				if (validatedFields.success) {
					const { email, password } = validatedFields.data;
					const {
						data: { user },
						error,
					} = await API.POST('/auth/local', {
						username: email,
						password,
						info: { type: 'admin' },
					});
					if (error) return null;
					return user;
				}
				return null;
			},
		}),
	],
} satisfies NextAuthConfig;
