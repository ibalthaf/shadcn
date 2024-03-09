export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="flex-1 space-y-4 p-0 pb-4 pt-2 md:p-8 md:pt-6">
        {children}
      </div>
    </>
  )
}