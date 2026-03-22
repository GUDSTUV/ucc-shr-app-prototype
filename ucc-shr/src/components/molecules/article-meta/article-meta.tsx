export interface ArticleMetaProps {
  author: string
  date: string
  category?: string
}

export function ArticleMeta({ author, date, category }: ArticleMetaProps) {
  return (
    <div className="flex items-center gap-2 text-[12px] text-gray-500">
      <span>{author}</span>
      <span>•</span>
      <span>{date}</span>
      {category && (
        <>
          <span>•</span>
          <span>{category}</span>
        </>
      )}
    </div>
  )
}
