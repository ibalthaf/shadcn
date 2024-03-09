'use client';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { login } from '@/actions/auth.action';
import { LoginSchema } from '@/schemas';

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: LoginFormProps) {
	const router = useRouter();
	// const searchParams = useSearchParams();
	// const callbackUrl = searchParams.get('callbackUrl') || '';

	const loginForm = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
	});

	async function onSubmit(values: z.infer<typeof LoginSchema>) {
		await toast.promise(login({ email: values.email, password: values.password }), {
			loading: 'Loging in...',
			success: (obj: any) => {
				return <b>Logged in!</b>;
			},
			error: (error: any) => {
				// router.refresh();
				return <b>{error.message || 'Uh oh! Wrong credentials.'}</b>;
			},
		});
		router.replace('/dashboard');
	}

	return (
		<div className={cn('grid gap-6', className)} {...props}>
			<Form {...loginForm}>
				<form onSubmit={loginForm.handleSubmit(onSubmit)}>
					<div className='grid gap-2'>
						<div className='grid gap-1'>
							<FormField
								control={loginForm.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												type='email'
												autoCapitalize='none'
												autoComplete='email'
												autoCorrect='off'
												disabled={loginForm.formState.isSubmitting}
												placeholder='Email'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='grid gap-1'>
							<FormField
								control={loginForm.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												type='password'
												autoCapitalize='none'
												autoComplete='password'
												autoCorrect='off'
												disabled={loginForm.formState.isSubmitting}
												placeholder='Password'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Button
							type='submit'
							disabled={loginForm.formState.isSubmitting}
							className='text-black'
						>
							{loginForm.formState.isSubmitting && (
								<Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
							)}
							Login
						</Button>
						{/* <Button
							type='button'
							disabled={loginForm.formState.isSubmitting}
							className='text-black'
							onClick={() => {
								signIn('google', {
									callbackUrl: DEFAULT_LOGIN_REDIRECT,
								});
							}}
						>
							{loginForm.formState.isSubmitting && (
								<Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
							)}
							GLogin
						</Button> */}
					</div>
				</form>
			</Form>
		</div>
	);
}
