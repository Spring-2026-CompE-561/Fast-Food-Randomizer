import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

<<<<<<< HEAD
export { Skeleton }
=======
export { Skeleton }
>>>>>>> 086a7dabcb9b23a259bc9af2fc6079f49dbb8c04
