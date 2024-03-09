'use server';
import * as API from '../services/API';

export default async function getMyProfile(uid?: string) {
	try {
		const {
			data: { user },
		} = await API.GET('/user/me');
		return user;
	} catch (error: any) {
		throw new Error(error.message || 'Something went wrong');
	}
}
