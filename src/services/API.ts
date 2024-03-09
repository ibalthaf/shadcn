'use server';

import { AppConfig, storageKeys } from '@/helper/configs';
import * as storageService from '../helper/storage';
import { APISuccessResponse } from './types';

const BASE_URL = 'http://117.254.185.155:5655';

export async function GET(endPoint: string, options: RequestInit = {}) {
	try {
		await checkTokenExpiry();
		Object.assign(options, await _getCommonOptions());
		options.method = 'GET';
		options.next = { revalidate: 30 };

		const res = await fetch(`${BASE_URL}${endPoint}`, options);

		if (res.ok) {
			const data: APISuccessResponse<any> = await res.json();
			return data;
		} else {
			throw new Error(res.statusText || 'Uh Oh! Something went wrong!');
		}
	} catch (error) {
		throw error;
	}
}

export async function POST(endPoint: string, data: any = {}, options: RequestInit = {}) {
	if (endPoint === 'auth/token') await checkTokenExpiry();

	const commonOptions: RequestInit = await _getCommonOptions();
	options = {
		...commonOptions,
		...options,
		headers: {
			...commonOptions.headers,
			...options.headers,
		},
		body: JSON.stringify(data),
		method: 'POST',
	};

	const res = await fetch(`${BASE_URL}${endPoint}`, options);

	if (res.ok) {
		const data = await res.json();
		const respData: APISuccessResponse<any> = (await handleTokensInResponse(
			data
		)) as APISuccessResponse<any>;
		return { data: respData?.data, error: false };
	} else {
		return { error: res.statusText };
	}
}

async function handleTokensInResponse(data: APISuccessResponse<any>) {
	const { data: all, ...rest } = data;
	if (all) {
		const { token, refresh_token, session_id, token_expiry, user, ...content } = all;
		if (token && refresh_token) {
			await storageService.saveString(storageKeys.ACCESS_TOKEN, token);
			await storageService.saveString(storageKeys.REFRESH_TOKEN, refresh_token);
		}
		if (token_expiry) await storageService.saveString(storageKeys.TOKEN_EXPIRY, token_expiry);
		if (session_id) await storageService.saveString(storageKeys.SESSION_ID, session_id);
		return { ...rest, data: { ...content, user } };
	}
}

async function handleHttpError(res: Response) {
	if (res.status !== 401 || res.url.endsWith('/auth/local') || res.url.endsWith('/auth/token')) {
		throw new Error(res.statusText || 'Uh Oh! Something went wrong!');
	} else {
		return await handle401(res);
	}
}

async function handle401(res: Response) {
	// console.log(res.url, res.status, await storageService.loadString(storageKeys.ACCESS_TOKEN), await storageService.loadString(storageKeys.REFRESH_TOKEN));
	const token = await storageService.loadString(storageKeys.ACCESS_TOKEN);
	const refreshToken = await storageService.loadString(storageKeys.REFRESH_TOKEN);

	if (!token || !refreshToken) throw new Error(res.statusText || 'Uh Oh! Something went wrong!');

	return POST('/auth/token', {
		token,
		refresh_token: refreshToken,
	}).catch(() => {
		storageService.clearAll();
		throw new Error('Session expired!');
	});
}

async function _getCommonOptions() {
	const options: { [x: string]: any } = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const token = await storageService.loadString(storageKeys.ACCESS_TOKEN);

	if (token) {
		options.headers = { ...options.headers, Authorization: `Bearer ${token}` };
	}

	return options;
}

async function checkTokenExpiry() {
	try {
		let isExpired = false;
		const token = await storageService.loadString(storageKeys.ACCESS_TOKEN);
		const refreshToken = await storageService.loadString(storageKeys.REFRESH_TOKEN);

		if (!token) return { isExpired };

		const options: RequestInit = {};
		Object.assign(options, await _getCommonOptions());
		options.method = 'GET';
		const res = await fetch(`${BASE_URL}/user/me`, options);

		if (res.ok) {
			isExpired;
		}

		if (res.status === 401) {
			await POST('/auth/token', {
				token,
				refresh_token: refreshToken,
			});
			// .catch(() => {
			//   console.log('pppppppppppppppppppppppppppppppppppppppppp');
			// })
		}
		return { isExpired };
	} catch (error) {
		storageService.clearAll();
		throw new Error('Session expired', { cause: 'EXPIRED' });
	}
}
