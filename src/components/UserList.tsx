'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface User {
  id: number
  username: string
}

interface UserListProps {
  onSelectUser: (userId: number) => void
}

export default function UserList({ onSelectUser }: UserListProps) {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await response.json()
        setUsers(data)
        console.log('Fetched users:', data)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUsers()
  }, [])

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">User List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 gap-2">
          {users.map((user, index) => (
            <Button
              key={user.id}
              variant="outline"
              className="w-full justify-start text-sm md:text-base"
              onClick={() => {
                onSelectUser(user.id)
                console.log('Selected user ID:', user.id)
              }}
            >
              {index + 1}. {user.username}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}