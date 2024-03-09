'use server';
import { LoginData } from '@/types/auth.type';
import * as API from '../services/API';
import * as storageService from '../helper/storage';
import { z } from 'zod';
import { LoginSchema } from '@/schemas';
import { signIn, signOut } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import { storageKeys } from '@/helper/configs';

export async function login(data: z.infer<typeof LoginSchema>, callbackUrl?: string) {
	const validatedFields = LoginSchema.safeParse(data);
	if (!validatedFields.success) return { error: 'Invalid Fields!' };
	const { email, password } = validatedFields.data;

	try {
		const resp = await signIn('credentials', {
			email,
			password,
			redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					throw 'Invalid credentials!';
				case 'AccessDenied':
					await storageService.clearAll();
					throw 'Access denied!';
				default:
					return 'Something went wrong!';
			}
		}
		throw error;
	}
}

export async function logOut() {
	const sessionId = await storageService.loadString(storageKeys.SESSION_ID);
	const { error } = await API.POST('/auth/logout', { session_id: sessionId });
	await storageService.clearAll();
	await signOut({ redirectTo: '/' });
}
