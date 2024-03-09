import Image from "next/image"

interface EmptyPlaceholderProps {
  icon?: string
  title: string
  description: string
}

export function EmptyPlaceholder(props: EmptyPlaceholderProps) {
  return (
    <div className="flex h-[450px] w-full shrink-0 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        {props.icon && (
          <Image alt="icon" src={"/empty-content.svg"} height={40} width={40} />
        )}

        <h3 className="mt-4 text-lg font-semibold">{props.title}</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          {props.description}
        </p>
      </div>
    </div>
  )
}