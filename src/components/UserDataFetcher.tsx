'use client'

import { useState, useEffect } from 'react'

import UserPosts from './UserPosts'
import UserList from './UserList'


export default function UserDataFetcher() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

  useEffect(() => {
    console.log('UserDataFetcher component mounted')
    return () => {
      console.log('UserDataFetcher component unmounted')
    }
  }, [])

  const handleSelectUser = (userId: number) => {
    console.log('User selected:', userId)
    setSelectedUserId(userId)
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
      <div className="w-full lg:w-1/3">
        <UserList onSelectUser={handleSelectUser} />
      </div>
      <div className="w-full lg:w-2/3">
        <UserPosts userId={selectedUserId} />
      </div>
    </div>
  )
}