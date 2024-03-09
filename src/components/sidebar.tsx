'use client';
import { cn, sideBarPaths, appRoutes, AppRoutes } from '@/lib/utils';
import { Button } from './ui/button';
import { usePathname, useRouter } from 'next/navigation';
// import { getMyProfile, logout } from "@/actions"
import Image from 'next/image';
import { useEffect, useState } from 'react';
// import { User } from "@/types/objects"
// import { ProfileData } from "@/types/user/my-profile"
import toast from 'react-hot-toast';
import SidebarLoading from './sidebar-loading';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
	const urlPath = usePathname();
	const router = useRouter();
	const [routes, setAppRoutes] = useState<AppRoutes[]>(appRoutes.filter((item) => item.active));

	//   const [user, setUser] = useState<User>()

	const myProfile = async () => {
		try {
			//   const profile: ProfileData = await getMyProfile()
			//   setUser(profile.user)
		} catch (error) {
			toast.error('Uh oh! Something went wrong.');
		}
	};

	useEffect(() => {
		myProfile();
	}, []);

	return (
		<div className='scrollbar-y dark:scrollbar-y overflow-y-auto bg-primary pb-10 pt-7 dark:border-gray-700 dark:bg-gray-800'>
			<div className='px-6'>
				<a
					className='flex-none text-xl font-semibold dark:text-white'
					href='/dashboard'
					aria-label='Brand'
				>
					<Image alt='logo' src={'/images/logo-white.png'} width={100} height={100} />
				</a>
			</div>
			{/* {!user && <SidebarLoading />} */}
			{/* {user && ( */}
			<div className={cn('pb-12', className)}>
				<div className='space-y-4 py-4'>
					<div className='px-3 py-2'>
						<div className='space-y-1'>
							{routes.map((route) => (
								<Button
									key={route.key}
									variant={urlPath === route.url ? 'secondary' : 'ghost'}
									onClick={() => router.push(route.url)}
									className='w-full justify-start hover:text-white text-white'
								>
									<Image
										className='mr-2 h-4 w-4'
										src={route.icon}
										alt='Dashboard'
										height={24}
										width={24}
									/>
									{route.name}
								</Button>
							))}
						</div>
					</div>
					{/* <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Customers
              </h2>
              <div className="space-y-1">
                <Button
                  variant={
                    urlPath.includes(sideBarPaths.USERS) ? "secondary" : "ghost"
                  }
                  onClick={() => router.push(sideBarPaths.USERS)}
                  className="w-full justify-start"
                >
                  <Image
                    className="mr-2 h-4 w-4"
                    src={"/users.svg"}
                    alt="Dashboard"
                    height={24}
                    width={24}
                  />
                  Users
                </Button>
                <Button
                  variant={
                    urlPath.includes(sideBarPaths.BOOKINGS)
                      ? "secondary"
                      : "ghost"
                  }
                  onClick={() => router.push(sideBarPaths.BOOKINGS)}
                  className="w-full justify-start"
                >
                  <Image
                    className="mr-2 h-4 w-4"
                    src={"/bookings.svg"}
                    alt="Dashboard"
                    height={24}
                    width={24}
                  />
                  Bookings
                </Button>
              </div>
            </div> */}
				</div>
			</div>
			{/*  )} */}
		</div>
	);
}
