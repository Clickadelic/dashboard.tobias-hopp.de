import { Skeleton } from "@/components/ui/skeleton"

const MainLoader = () => {
	return (
		<div className="flex h-screen items-center justify-center">
			<Skeleton className="h-16 w-16" />
		</div>
	)
}

export default MainLoader
