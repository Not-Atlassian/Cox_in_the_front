'use client'

import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { Archive, ChevronLeft, ClipboardList, MoreVertical, Plus, Users, Utensils } from 'lucide-react'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar"
import TicketCreate from '../../ticketPopup/TicketCreate'
import TeamMates from '@/components/TeamMates/TeamMates'
import SideBar from '@/components/Shared/SideBar/SideBar'

interface Task {
  id: string
  content: string
  state: string
}

interface Column {
  id: string
  title: string
  tasks: Task[]
}

interface ColumnState {
  [key: string]: Column
}

const Tasks = [
  { id: 'task-1', content: 'Task 1: Bla bla bla bla bla bla', state: '1' },
  { id: 'task-2', content: 'Task 2: Bla bla bla bla bla bla', state: '1' },
  { id: 'task-3', content: 'Task 3: Bla bla bla bla bla bla', state: '1' },
  { id: 'task-4', content: 'Task 4: Bla bla bla bla bla bla', state: '2' },
  { id: 'task-5', content: 'Task 5: Bla bla bla bla bla bla', state: '2' },
  { id: 'task-6', content: 'Task 6: Bla bla bla bla bla bla', state: '2' },
  { id: 'task-7', content: 'Task 7: Bla bla bla bla bla bla', state: '3' },
  { id: 'task-8', content: 'Task 8: Bla bla bla bla bla bla', state: '3' },
  { id: 'task-9', content: 'Task 9: Bla bla bla bla bla bla', state: '3' },
  { id: 'task-10', content: 'Task 10: Bla bla bla bla bla bla', state: '4' },
  { id: 'task-11', content: 'Task 11: Bla bla bla bla bla bla', state: '4' },
  { id: 'task-12', content: 'Task 12: Bla bla bla bla bla bla', state: '4' },
]

const initcolumns: ColumnState = {
  '1': { id: '1', title: 'To Do :3', tasks: [] },
  '2': { id: '2', title: 'Cooking :3', tasks: [] },
  '3': { id: '3', title: 'In Plating :3', tasks: [] },
  '4': { id: '4', title: 'Bonne appetit :3', tasks: [] },
}

export default function Board() {
  const [columns, setColumns] = useState<ColumnState>(initcolumns);

  useEffect(() => {
    const columnsCopy = { ...initcolumns };
    Tasks.forEach((task) => {
      columnsCopy[task.state].tasks.push(task);
    });
    setColumns(columnsCopy);
  }, []);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceTasks = [...sourceColumn.tasks];
    const destTasks = [...destColumn.tasks];

    if (source.droppableId === destination.droppableId) {
      const [reorderedItem] = sourceTasks.splice(source.index, 1);
      sourceTasks.splice(destination.index, 0, reorderedItem);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          tasks: sourceTasks,
        },
      });
    } else {
      const [movedItem] = sourceTasks.splice(source.index, 1);
      movedItem.state = destination.droppableId; // Update the state of the moved task
  
      destTasks.splice(destination.index, 0, movedItem);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          tasks: sourceTasks,
        },
        [destination.droppableId]: {
          ...destColumn,
          tasks: destTasks,
        },
      });
    }
    
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <SideBar />
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
              <TeamMates teamId={1}/>
              <TicketCreate />
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.values(columns).map((column) => (
                  <Droppable key={column.id} droppableId={column.id}>
                    {(provided) => (
                      <Card {...provided.droppableProps} ref={provided.innerRef}>
                        <CardHeader>
                          <CardTitle>{column.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {column.tasks.map((task, index) => (
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
  );
}