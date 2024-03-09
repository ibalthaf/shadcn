import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { UserNav } from "@/components/user-nav"
import "../globals.css"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <header className="sticky inset-x-0 top-0 z-[48] flex w-full flex-wrap bg-primary py-2.5 text-sm dark:border-gray-700 dark:bg-gray-800 sm:flex-nowrap sm:justify-start sm:py-4 lg:pl-64">
        <nav
          className="mx-auto flex w-full basis-full items-center px-4 sm:px-6 md:px-8"
          aria-label="Global"
        >
          <div className="mr-5 lg:mr-0 lg:hidden">
            <a
              className="flex-none text-xl font-semibold dark:text-white"
              href="#"
              aria-label="Brand"
            >
              Naiija
            </a>
          </div>

          <div className="ml-auto flex items-center justify-end sm:order-3 sm:gap-x-3">
            <div className="flex flex-row items-center justify-end gap-2">
              <UserNav />
            </div>
          </div>
        </nav>
      </header>
      <Sheet>
        <div className="sticky inset-x-0 top-0 z-20 border-y bg-white px-4 dark:border-gray-700 dark:bg-gray-800 sm:px-6 md:px-8 lg:hidden">
          <div className="flex items-center py-4">
            <SheetTrigger>
              <Button
                type="button"
                variant="ghost"
                className=""
                aria-controls="application-sidebar"
                aria-label="Toggle navigation"
              >
                <span className="sr-only">Toggle Navigation</span>
                <svg
                  className="h-5 w-5"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
              </Button>
            </SheetTrigger>
            <ol
              className="ml-3 flex min-w-0 items-center whitespace-nowrap"
              aria-label="Breadcrumb"
            >
              <li className="flex items-center text-sm text-gray-800 dark:text-gray-400">
                Application Layout
                <svg
                  className="mx-3 h-2.5 w-2.5 flex-shrink-0 overflow-visible text-gray-400 dark:text-gray-600"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </li>
              <li
                className="truncate text-sm font-semibold text-gray-800 dark:text-gray-400"
                aria-current="page"
              >
                Dashboard
              </li>
            </ol>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 top-0 z-[48] hidden w-64 -translate-x-full transform transition-all duration-300 lg:bottom-0 lg:right-auto lg:block lg:translate-x-0 bg-primary">
          <Sidebar />
        </div>
        <SheetContent side="left" className="w-64 p-0 lg:hidden bg-primary">
          <Sidebar />
        </SheetContent>

        <div className="w-full px-4 pt-0 sm:px-6 lg:pl-64 ">
          {children}
        </div>
      </Sheet>
    </>
  )
}