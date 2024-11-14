'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Utensils, ChevronLeft, MoreVertical, Plus } from 'lucide-react'

interface Task {
  id: string
  name: string
  hasParent: boolean
  assignee: string
  utensilCount: number
}

interface Column {
  id: string
  title: string
  tasks: Task[]
}

export default function Component() {
  const teamMembers = [
    { id: 1, name: "Team Member 1" },
    { id: 2, name: "Team Member 2" },
    { id: 3, name: "Team Member 3" },
    { id: 4, name: "Team Member 4" },
  ]

  const initialColumns: Column[] = [
    {
      id: "todo",
      title: "To Do",
      tasks: [
        {
          id: "1",
          name: "Bla bla bla bla bla bla bla",
          hasParent: true,
          assignee: "TM",
          utensilCount: 3,
        },
        {
          id: "2",
          name: "Bla bla bla bla bla bla bla",
          hasParent: true,
          assignee: "TM",
          utensilCount: 1,
        },
      ],
    },
    {
      id: "cooking",
      title: "Cooking",
      tasks: [
        {
          id: "3",
          name: "Bla bla bla bla bla bla bla",
          hasParent: true,
          assignee: "TM",
          utensilCount: 3,
        },
      ],
    },
    {
      id: "plating",
      title: "In Plating",
      tasks: [
        {
          id: "4",
          name: "Bla bla bla bla bla bla bla",
          hasParent: true,
          assignee: "TM",
          utensilCount: 2,
        },
        {
          id: "5",
          name: "Bla bla bla bla bla bla bla",
          hasParent: true,
          assignee: "TM",
          utensilCount: 1,
        },
        {
          id: "6",
          name: "Bla bla bla bla bla bla bla",
          hasParent: true,
          assignee: "TM",
          utensilCount: 3,
        },
      ],
    },
    {
      id: "done",
      title: "Done",
      tasks: [
        {
          id: "7",
          name: "Bla bla bla bla bla bla bla",
          hasParent: true,
          assignee: "TM",
          utensilCount: 3,
        },
      ],
    },
  ]

  const [columns, setColumns] = React.useState(initialColumns)

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-muted p-4 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback>TN</AvatarFallback>
          </Avatar>
          <span className="font-semibold">Team Name</span>
        </div>
        
        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            📋 Backlog
          </Button>
          <Button variant="secondary" className="w-full justify-start">
            📊 Board
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            📅 Availability
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-medium">Team Name/ Project Name/ Board</h1>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </header>

        {/* Team Members and Add Product */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Team Mates:</span>
            <div className="flex -space-x-2">
              {teamMembers.map((member) => (
                <Avatar key={member.id} className="border-2 border-background">
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
          <Button variant="outline" className="gap-2">
            <Plus className="h-4 w-4" /> Add Product
          </Button>
        </div>

        {/* Kanban Board */}
        <ScrollArea className="flex-1 p-4">
          <div className="flex gap-4 h-full">
            {columns.map((column) => (
              <div key={column.id} className="flex-1 min-w-[280px]">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-sm font-medium">
                    {column.title} : {column.tasks.length}
                  </h2>
                </div>
                <div className="space-y-3">
                  {column.tasks.map((task) => (
                    <Card key={task.id} className="p-3">
                      <div className="space-y-3">
                        <div className="text-sm">{task.name}</div>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                            Parent
                          </Badge>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              {Array(task.utensilCount).fill(0).map((_, i) => (
                                <Utensils key={i} className="h-4 w-4 text-muted-foreground" />
                              ))}
                            </div>
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">{task.assignee}</AvatarFallback>
                            </Avatar>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}