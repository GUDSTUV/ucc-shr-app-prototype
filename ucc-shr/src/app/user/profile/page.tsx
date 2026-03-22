import UserProfile from "./userProfile"

export default async function UserProfilePage({
	searchParams,
}: {
	searchParams: Promise<Record<string, string | string[]>>
}) {
	const params = await searchParams
	const name = typeof params.name === 'string' ? decodeURIComponent(params.name) : undefined
	const email = typeof params.email === 'string' ? decodeURIComponent(params.email) : undefined

	return <UserProfile name={name} email={email} />
}
