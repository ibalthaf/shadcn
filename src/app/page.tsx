'use client';
import { LoginForm } from '@/components/login-forrm';
import Image, { ImageLoaderProps } from 'next/image';
import img from '../../public/images/couple.jpg';
// import LoginBg from '../../public/couple.jpg';

const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
	return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
};

export default async function Home() {
	return (
		<>
			<div className='container relative h-[100vh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
				<div className='relative hidden h-full flex-col bg-muted p-10 text-slate-950 dark:border-r lg:flex'>
					<div className={`absolute inset-0 bg-cover`}>
						<Image alt='bg' src={img} priority className='w-full h-full object-cover' />
					</div>
					<div className='relative z-20 flex items-center text-2xl font-medium'>
						<Image alt='logo' src={'/images/logo-white.png'} width={150} height={150} priority />
						{/* <p className="text-white">Naiija</p> */}
					</div>
				</div>
				<div className='lg:p-8'>
					<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
						<div className='flex flex-col space-y-2 text-center'>
							<h1 className='text-2xl font-semibold tracking-tight'>Admin Login</h1>
							<p className='text-sm text-muted-foreground'>Login into your account</p>
						</div>
						<LoginForm />
					</div>
				</div>
			</div>
		</>
	);
}
