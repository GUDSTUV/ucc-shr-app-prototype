export interface DividerProps {
	className?: string
}

export function Divider({ className }: DividerProps) {
	return <hr className={`border-0 h-px bg-gray-100 w-full ${className ?? ''}`} />
}
