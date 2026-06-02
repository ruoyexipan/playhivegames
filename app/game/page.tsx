'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function GamePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const slug = searchParams.get('slug')

  useEffect(() => {
    if (slug) {
      // 重定向到新的 URL 格式
      router.replace(`/game/${slug}`)
    } else {
      // 没有 slug，跳转到首页
      router.replace('/')
    }
  }, [slug, router])

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <p className="text-white">Redirecting...</p>
    </div>
  )
}
