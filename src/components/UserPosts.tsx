'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface Post {
  id: number
  title: string
  body: string
}

interface UserPostsProps {
  userId: number | null
}

export default function UserPosts({ userId }: UserPostsProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log('UserPosts component - userId changed:', userId)
    if (userId) {
      setLoading(true)
      const fetchPosts = async () => {
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
          const data = await response.json()
          setPosts(data)
          console.log('Fetched posts for user ID:', userId, 'Posts:', data)
        } catch (error) {
          console.error('Error fetching user posts:', error)
        } finally {
          setLoading(false)
        }
      }

      fetchPosts()
    } else {
      setPosts([])
    }
  }, [userId])

  return (
    <Card className={`h-full transition-opacity duration-500 ${userId ? 'opacity-100' : 'opacity-0'}`}>
      <CardHeader className="sticky top-0 bg-white z-10">
        <CardTitle className="text-xl md:text-2xl">User Posts</CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-4rem)] overflow-y-auto">
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} className="h-24 w-full" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post, index) => (
              <div key={post.id} className="border-b pb-4 last:border-b-0">
                <h3 className="text-base md:text-lg font-semibold mb-2">{index + 1}. {post.title}</h3>
                <p className="text-sm md:text-base text-gray-600">{post.body}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}