import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Skeleton } from "@/components/ui/skeleton"
  import Image from "next/image"
  
  export default function DashboardLoading() {
    const bookings = [1, 2, 3, 4, 5]
    return (
      <>
        <div className="flex-1 space-y-4 p-0 pt-2 md:p-8 md:pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2"></div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <Image
                  src="/rupee.svg"
                  alt="Rupee icon"
                  width={100}
                  height={100}
                  className="h-4 w-4 text-muted-foreground"
                />
              </CardHeader>
              <CardContent>
                <div className="mb-2 text-2xl font-bold">
                  <Skeleton className="h-7 w-[150px]" />
                </div>
                <p className="text-xs text-muted-foreground">
                  <Skeleton className="h-4 w-[150px]" />
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Subscriptions
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="mb-2 text-2xl font-bold">
                  <Skeleton className="h-7 w-[150px]" />
                </div>
                <p className="text-xs text-muted-foreground">
                  <Skeleton className="h-4 w-[150px]" />
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="mb-2 text-2xl font-bold">
                  <Skeleton className="h-7 w-[150px]" />
                </div>
                <p className="text-xs text-muted-foreground">
                  <Skeleton className="h-4 w-[150px]" />
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="mb-2 text-2xl font-bold">
                  <Skeleton className="h-7 w-[150px]" />
                </div>
                <p className="text-xs text-muted-foreground">
                  <Skeleton className="h-4 w-[150px]" />
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-row items-baseline gap-6">
                <Skeleton className="h-[320px] w-full" />
                <Skeleton className="h-[350px] w-full" />
                <Skeleton className="h-[100px] w-full" />
                <Skeleton className="h-[390px] w-full" />
                <Skeleton className="h-[190px] w-full" />
                <Skeleton className="h-[320px] w-full" />
                <Skeleton className="h-[320px] w-full" />
                <Skeleton className="h-[100px] w-full" />
                <Skeleton className="h-[50px] w-full" />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>
                  <Skeleton className="h-4 w-[180px]" />
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {bookings.map((item) => (
                    <div key={item} className="flex items-center">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          <Skeleton className="h-4 w-[120px]" />
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <Skeleton className="h-4 w-[180px]" />
                        </p>
                      </div>
                      <div className="ml-auto font-medium">
                        <Skeleton className="h-4 w-[100px]" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    )
  }