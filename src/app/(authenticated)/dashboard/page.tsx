import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { getDashboard } from "@/actions"
// import { DashboardData } from "@/types/dashboard"
import Link from 'next/link';
import { EmptyPlaceholder } from '@/components/empty-content';
import { OverviewChart } from './(components)/overviewchart';
import { auth } from '@/auth';

export default async function DashboardPage() {
	//   const { dashboard }: DashboardData = await getDashboard()
	const session = await auth();
	console.log({ session });

	return (
		<>
			<div className='flex-1 space-y-4 p-0 pt-2 md:p-8 md:pt-6'>
				<div className='flex items-center justify-between space-y-2'>
					<h2 className='text-3xl font-bold tracking-tight'>Dashboard</h2>
					<div className='flex items-center space-x-2'>
						{/* <CalendarDateRangePicker />
              <Button>Download</Button> */}
					</div>
				</div>
				<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
					<Card>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
							<Image
								src='/images/rupee.svg'
								alt='Rupee icon'
								width={100}
								height={100}
								className='h-4 w-4 text-muted-foreground'
							/>
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold'>₹ {2356}</div>
							<p className={'rounded-sm pl-1 text-xs text-muted-foreground'}>
								<span className={+233 < 0 ? 'font-bold text-red-600' : 'font-bold text-green-700'}>
									{56}%
								</span>{' '}
								from last month
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>Users</CardTitle>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								className='h-4 w-4 text-muted-foreground'
							>
								<path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
								<circle cx='9' cy='7' r='4' />
								<path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
							</svg>
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold'>{'562'}</div>
							<p className='text-xs text-muted-foreground'>
								<span className={+23 < 0 ? 'font-bold text-red-600' : 'font-bold text-green-700'}>
									{562}%
								</span>{' '}
								from last month
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>Bookings</CardTitle>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								className='h-4 w-4 text-muted-foreground'
							>
								<rect width='20' height='14' x='2' y='5' rx='2' />
								<path d='M2 10h20' />
							</svg>
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold'>{5623}</div>
							<p className='text-xs text-muted-foreground'>
								<span className={+569 < 0 ? 'font-bold text-red-600' : 'font-bold text-green-700'}>
									{56}%
								</span>{' '}
								from last month
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>Active Users</CardTitle>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								className='h-4 w-4 text-muted-foreground'
							>
								<path d='M22 12h-4l-3 9L9 3l-3 9H2' />
							</svg>
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold'>{562}</div>
							<p className='text-xs text-muted-foreground'>
								<span className={+56 < 0 ? 'font-bold text-red-600' : 'font-bold text-green-700'}>
									{23}%
								</span>{' '}
								since last month
							</p>
						</CardContent>
					</Card>
				</div>
				<div className='grid grid-cols-2 gap-4 lg:grid-cols-7'>
					<Card className='col-span-4'>
						<CardHeader>
							<CardTitle>Overview</CardTitle>
						</CardHeader>
						<CardContent className='pl-2'>
							{/* {dashboard.overviewChart.length > 0 && ( */}
							{/* <OverviewChart data={[]} /> */}
							{/* )} */}
							{/* {dashboard.overviewChart.length === 0 && ( */}
							<EmptyPlaceholder
								description='There are no transactions have been located!'
								title='No Transactions'
							/>
							{/* )} */}
						</CardContent>
					</Card>
					<Card className='col-span-4 lg:col-span-3'>
						<CardHeader>
							<div className='flex items-center justify-between space-y-2'>
								<div className='flex w-1/3 flex-row gap-3'>
									<CardTitle>Recent Sales</CardTitle>
								</div>
								<div className='flex items-center space-x-2'>
									<Link href={'/dashboard'} className='text-sm text-blue-500'>
										View All
									</Link>
								</div>
							</div>
							<CardDescription>{56} bookings this month.</CardDescription>
						</CardHeader>
						<CardContent>
							{/* {dashboard.recentBookings.length > 0 && (
                <RecentBookings bookings={dashboard.recentBookings} />
              )} */}
							{/* {dashboard.recentBookings.length === 0 && ( */}
							<EmptyPlaceholder
								description='There are no bookings have been located!'
								title='No Booking'
							/>
							{/* )} */}
						</CardContent>
					</Card>
				</div>
			</div>
		</>
	);
}
