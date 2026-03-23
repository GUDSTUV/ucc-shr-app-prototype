import Link from 'next/link'
import { AdminLayout } from '@/src/components/templates/admin-layout'
import { Button } from '@/src/components/atoms/button'
import { Input } from '@/src/components/atoms/input'
import { Select } from '@/src/components/atoms/select'
import { Textarea } from '@/src/components/atoms/textarea'

export default function NewArticlePage() {
	return (
		<AdminLayout title="Create New Article">
			<form className="mx-auto max-w-3xl space-y-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
				<section className="rounded-xl border border-gray-100 bg-gray-50 p-4">
					<h2 className="text-sm font-semibold text-gray-900">Posts &amp; Events Display Settings</h2>
					<p className="mt-1 text-xs text-gray-600">
						These fields control what appears on the Posts &amp; Events page card.
					</p>

					<div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div>
							<label className="mb-1 block text-sm font-semibold text-gray-700">Display Type</label>
							<Select className="border-gray-200">
								<option>Post</option>
								<option>Event</option>
							</Select>
						</div>

						<div>
							<label className="mb-1 block text-sm font-semibold text-gray-700">Card Label</label>
							<Input placeholder="e.g. 5 min read or Event" className="border-gray-200" />
						</div>

						<div>
							<label className="mb-1 block text-sm font-semibold text-gray-700">Event Date (optional)</label>
							<Input placeholder="e.g. APR 02" className="border-gray-200" />
						</div>

						<div>
							<label className="mb-1 block text-sm font-semibold text-gray-700">Event Time (optional)</label>
							<Input placeholder="e.g. 10:00 - 12:00" className="border-gray-200" />
						</div>
					</div>
				</section>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div className="sm:col-span-2">
						<label className="mb-1 block text-sm font-semibold text-gray-700">Display Title</label>
						<Input placeholder="Enter article title" className="border-gray-200" />
					</div>

					<div>
						<label className="mb-1 block text-sm font-semibold text-gray-700">Category</label>
						<Select className="border-gray-200">
							<option>Policy</option>
							<option>Awareness</option>
							<option>Support</option>
							<option>Training</option>
						</Select>
					</div>

					<div>
						<label className="mb-1 block text-sm font-semibold text-gray-700">Visibility</label>
						<Select className="border-gray-200">
							<option>Public</option>
							<option>Internal</option>
						</Select>
					</div>
				</div>

				<div>
					<label className="mb-1 block text-sm font-semibold text-gray-700">Card Summary</label>
					<Textarea placeholder="Short summary shown on the Posts & Events card" rows={3} className="border-gray-200" />
				</div>

				<div>
					<label className="mb-1 block text-sm font-semibold text-gray-700">Cover Image</label>
					<input
						type="file"
						accept="image/png,image/jpeg,image/webp"
						className="block w-full rounded-[10px] border-[1.5px] border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 file:mr-3 file:rounded-md file:border-0 file:bg-navy file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:file:bg-navy-dark"
					/>
					<p className="mt-1 text-xs text-gray-500">Recommended: 1200x675, JPG/PNG/WEBP, up to 5MB.</p>
				</div>

				<div>
					<label className="mb-1 block text-sm font-semibold text-gray-700">Article Content</label>
					<Textarea placeholder="Write the full article content..." rows={12} className="border-gray-200" />
				</div>

				<div className="flex flex-wrap items-center gap-3 pt-2">
					<Button type="button" variant="outline" size="sm">Save Draft</Button>
					<Button type="button" size="sm">Publish Article</Button>
					<Link href="/admin/articles" className="text-sm font-semibold text-navy hover:text-navy-dark">
						Back to Articles
					</Link>
				</div>
			</form>
		</AdminLayout>
	)
}
