"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()
  useEffect(() => {
    console.error(error.message)
  }, [error])

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div className="flex w-1/3 flex-row gap-3">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <Input disabled placeholder="Search Services" />
        </div>
      </div>
      <div className="flex h-[450px] w-full shrink-0 items-center justify-center rounded-md border-2 border-solid border-red-600 bg-red-400 bg-opacity-40">
        <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
          <Image alt="icon" src={"./error.svg"} height={40} width={40} />

          <h3 className="mt-4 text-lg font-semibold ">{"Error"}</h3>
          <p className="mb-4 mt-2 text-sm text-muted-foreground">
            {error?.message || "Uh oh! Something went wrong!"}
          </p>
          <Button onClick={() => reset()}>Try again</Button>
        </div>
      </div>
    </>
  )
}