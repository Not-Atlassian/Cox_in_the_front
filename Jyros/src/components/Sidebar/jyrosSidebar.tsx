'use client'

import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { Archive, ChevronLeft, ClipboardList, MoreVertical, Plus, Users, Utensils } from 'lucide-react'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar"

interface Task {
  id: string
  content: string
  state: number
}

interface Column {
  id: number
  title: string
}

const columns: Column[] = [
  { id: 1, title: 'To Do' },
  { id: 2, title: 'Cooking' },
  { id: 3, title: 'In Plating' },
  { id: 4, title: 'Bonne appétit' },
]

const initialTasks: Task[] = [
  { id: 'task-1', content: 'Task 1: Bla bla bla bla bla bla', state: 1 },
  { id: 'task-2', content: 'Task 2: Bla bla bla bla bla bla', state: 1 },
  { id: 'task-3', content: 'Task 3: Bla bla bla bla bla bla', state: 1 },
  { id: 'task-4', content: 'Task 4: Bla bla bla bla bla bla', state: 2 },
  { id: 'task-5', content: 'Task 5: Bla bla bla bla bla bla', state: 2 },
  { id: 'task-6', content: 'Task 6: Bla bla bla bla bla bla', state: 2 },
  { id: 'task-7', content: 'Task 7: Bla bla bla bla bla bla', state: 3 },
  { id: 'task-8', content: 'Task 8: Bla bla bla bla bla bla', state: 3 },
  { id: 'task-9', content: 'Task 9: Bla bla bla bla bla bla', state: 3 },
  { id: 'task-10', content: 'Task 10: Bla bla bla bla bla bla', state: 4 },
  { id: 'task-11', content: 'Task 11: Bla bla bla bla bla bla', state: 4 },
  { id: 'task-12', content: 'Task 12: Bla bla bla bla bla bla', state: 4 },
]

export default function Component() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) return

    const updatedTasks = Array.from(tasks)
    const [reorderedItem] = updatedTasks.splice(source.index, 1)
    
    if (source.droppableId !== destination.droppableId) {
      reorderedItem.state = parseInt(destination.droppableId)
    }
    
    updatedTasks.splice(destination.index, 0, reorderedItem)
    setTasks(updatedTasks)
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar className="w-64 border-r">
          <SidebarHeader className="border-b p-4 pl-6">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary text-primary-foreground text-lg">TN</AvatarFallback>
              </Avatar>
              <span className="font-semibold text-xl">Team Name</span>
            </div>
          </SidebarHeader>
          <SidebarContent className="pl-6">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="justify-start text-base">
                  <ClipboardList className="h-5 w-5 mr-3" />
                  <span>Backlog</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="justify-start text-base" isActive>
                  <Archive className="h-5 w-5 mr-3" />
                  <span>Board</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="justify-start text-base">
                  <Users className="h-5 w-5 mr-3" />
                  <span>Availability</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="flex-1 overflow-auto">
          <header className="flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-xl font-semibold">Team Name/ Project Name/ Board</h1>
            </div>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </header>
          <main className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <Avatar key={i} className="border-2 border-background">
                    <AvatarFallback>U{i + 1}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Product
              </Button>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {columns.map((column) => (
                  <Droppable key={column.id} droppableId={column.id.toString()}>
                    {(provided) => (
                      <Card {...provided.droppableProps} ref={provided.innerRef}>
                        <CardHeader>
                          <CardTitle>{column.title} : {tasks.filter(task => task.state === column.id).length}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {tasks
                            .filter(task => task.state === column.id)
                            .map((task, index) => (
                              <Draggable key={task.id} draggableId={task.id} index={index}>
                                {(provided) => (
                                  <Card
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="p-4"
                                  >
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <h3 className="font-semibold mb-2">{task.content}</h3>
                                        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Parent</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Utensils className="h-4 w-4" />
                                        <Avatar className="h-6 w-6">
                                          <AvatarFallback>U</AvatarFallback>
                                        </Avatar>
                                      </div>
                                    </div>
                                  </Card>
                                )}
                              </Draggable>
                            ))}
                          {provided.placeholder}
                        </CardContent>
                      </Card>
                    )}
                  </Droppable>
                ))}
              </div>
            </DragDropContext>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}