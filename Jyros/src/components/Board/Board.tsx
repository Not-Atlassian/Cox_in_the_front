'use client'

import { useState, useEffect, useContext } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { MoreVertical, Utensils, UtensilsCrossed } from 'lucide-react'
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
import TicketView from '@/ticketPopup/TicketView'

import { AppContext } from '@/context/AppContext'

const ForkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
    <path d="M7 2v20" />
  </svg>
)


interface Task {
  id: string
  content: string
  state: string,
  priority?: number,
  intId: number
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
]

const initcolumns: ColumnState = {
  '1': { id: '1', title: 'To Do UwU', tasks: [] },
  '2': { id: '2', title: 'Cooking UwU', tasks: [] },
  '3': { id: '3', title: 'In Plating UwU', tasks: [] },
  '4': { id: '4', title: 'Bon appetit UwU', tasks: [] },
}

const status_to_state: { [key: string]: string } = {
  "To Do": "1",
  "Cooking": "2",
  "In Plating": "3",
  "Bon appétit": "4"
}

const getPriorityIcon = (priority: number) => {
  switch (priority) {
    case 3:
      return <UtensilsCrossed className="h-4 w-4" />;
    case 2:
      return <Utensils className="h-4 w-4" />;
    case 1:
      return <ForkIcon />;
    default:
      return null;
  }
};

export default function Board() {
  const [columns, setColumns] = useState<ColumnState>(initcolumns);
  const [taskId, setTaskId] = useState<number>(0);
  const [viewOpen, setViewOpen] = useState<boolean>(false);
  const [storyTickets, setStoryTickets] = useState<any>([]);
  const context = useContext(AppContext);
  const { tickets, fetchTickets, updateTicketStatus } = context as any;

  useEffect(() => {
    const asyncFunc = async () => {
      await fetchTickets();
    };
    asyncFunc();
  }, [fetchTickets]);


  useEffect(() => {
    const asyncFunc = async () => {
      if (!tickets || tickets.length === 0) {
        console.error('No tickets available');
        return;
      }

      const stories = JSON.parse(JSON.stringify(tickets));
      if (!stories) {
        console.error('Failed to parse stories');
        return;
      }

      setStoryTickets(stories);
      Tasks.splice(0, Tasks.length);
      stories.forEach((story: any) => {
        Tasks.push({
          id: `task-${story.storyId}`,
          content: story.title,
          state: status_to_state[story.status as string],
          priority: story.priority,
          intId: story.storyId,
        });
      });

      const columnsCopy = { ...initcolumns };
      Object.values(columnsCopy).forEach((column) => {
        column.tasks = [];
      });
      Tasks.forEach((task) => {
        columnsCopy[task.state].tasks.push(task);
      });
      setColumns(columnsCopy);
    };

    asyncFunc();
  }, [tickets]);

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
      const story = storyTickets.find((story: any) => story.storyId === movedItem.intId);
      story.status = Object.keys(status_to_state).find(key => status_to_state[key] === movedItem.state);
      updateTicketStatus(movedItem.intId, story.status);
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
              <h1 className="text-xl font-semibold">Team Name/ Project Name/ Board</h1>
            </div>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </header>
          <main className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <TeamMates teamId={1} />
              <TicketCreate />
              {
                viewOpen ? (<TicketView id={taskId} handleClose={() => setViewOpen(false)} />) : ""
              }
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.values(columns).map((column) => (
                  <Droppable key={column.id} droppableId={column.id}>
                    {(provided) => (
                      <Card {...provided.droppableProps} ref={provided.innerRef}>
                        <CardHeader>
                          <CardTitle>{column.title} ({column.tasks.length})</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {column.tasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                              {(provided) => (
                                <Card
                                  onClick={() => {
                                    setTaskId(task.intId);
                                    setViewOpen(true)
                                  }}
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
                                      {getPriorityIcon(task.priority as number)}
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
