

export default async function Users() {
    return (
        <div className="flex-1 space-y-4 p-0 pt-2 md:p-8 md:pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Users</h2>
                <div className="flex items-center space-x-2">
                    {/* <CalendarDateRangePicker />
                    <Button>Download</Button> */}
                </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <>List of users comes here</>
            </div>
        </div>
    )
}