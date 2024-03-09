// import type { Metadata } from "next";
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from 'react-hot-toast';

// export const metadata: Metadata = {
//   title: "Naiija | Admiin",
//   description: "Manage Naiija App",
//   appleWebApp: {
//     title: 'Naiija Admin App',
//     statusBarStyle: 'black-translucent',
//     startupImage: [
//       '/favicons/apple-touch-icon.png',
//       {
//         url: '/favicons/apple-touch-icon.png',
//         media: '(device-width: 768px) and (device-height: 1024px)',
//       },
//     ],
//   },
//   manifest:'/favicons/site.webmanifest',
//   icons: {
//     icon: '/favicons/favicon-32x32.png',
//     apple: [
//       { url: '/favicons/apple-touch-icon.png' },
//     ],
//     other: [
//       {
//         rel: 'mask-icon',
//         url: '/favicons/safari-pinned-tab.svg',
//       },
//     ],
//   },
// };

// export const fontSans = FontSans({
//   subsets: ["latin"],
//   variable: "--font-sans",
// })

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body
				className={cn(
					'min-h-screen bg-background font-sans antialiased'
					// fontSans.variable
				)}
			>
				<Toaster position='top-center' />
				{children}
			</body>
		</html>
	);
}
