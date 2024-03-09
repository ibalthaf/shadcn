import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export default function SidebarLoading() {
  return (
    <>
      <div className={cn("pb-12")}>
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Admin
            </h2>
            <div className="space-y-1">
              <Skeleton className="h-8 w-[200px]" />
              <Skeleton className="h-8 w-[200px]" />
              <Skeleton className="h-8 w-[200px]" />
              <Skeleton className="h-8 w-[200px]" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}