'use client'


import { useContext, useEffect, useState } from 'react'
import { ArrowUpDown, BaggageClaim, ChevronDown, ChevronDownCircle, ChevronUp, Icon, PlusCircleIcon } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Utensils, UtensilsCrossed } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'

import TeamMates from '../TeamMates/TeamMates'
import TicketCreate from '@/ticketPopup/TicketCreate'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import SearchBar from '@/components/SearchBar/SearchBar'
import './TaskTable.css'
import { Badge } from '../ui/badge'
import UserCard from '../Shared/UserCard/UserCard'
import { AppContext } from '@/context/AppContext'
import { Password } from '@mynaui/icons-react'

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


// const tasksData = [
//   { task: 'Task 1', title: 'Title 1', priority: 1, status: 'Cooking', shift: 'Shift 1' },
//   { task: 'Task 2', title: 'Title 2', priority: 2, status: 'To Do', shift: 'Shift 2' },
//   { task: 'Task 3', title: 'Title 3', priority: 3, status: 'Cooking', shift: 'Shift 1' },
//   { task: 'Task 4', title: 'Title 4', priority: 1, status: 'Bon appétit', shift: 'Shift 2' },
//   { task: 'Task 5', title: 'Title 5', priority: 2, status: 'Bon appétit', shift: 'Shift 1' },
//   { task: 'Task 6', title: 'Title 6', priority: 3, status: 'In Plating', shift: 'Shift 2' },
//   { task: 'Task 7', title: 'Title 7', priority: 1, status: 'In Plating', shift: 'Shift 1' },
// ]

// const shiftsData = [
//   { task: 1, title: 'Title 1', startDate: '2022-10-01', endDate: '2022-10-03', description: 'Description 1' },
//   { task: 2, title: 'Title 2', startDate: '2022-10-04', endDate: '2022-10-06', description: 'Description 2' },
// ]


const filterList = ['Bon appétit', 'In Plating', 'Cooking', 'To Do']



const FilterableTaskTable = () => {
  const [tasksLocal, setTasks] = useState([]);
  const [shiftsLocal, setShifts] = useState([]);


  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: boolean }>({})
  // const [selectedFilters, setSelectedFilters] = useState({});
  const [selectedTasks, setSelectedTasks] = useState(new Set());
  // const [sortConfig, setSortConfig] = useState(null);
  const [isOpen, setIsOpen] = useState(false)
  const [sortConfig, setSortConfig] = useState<{ key: keyof typeof tickets[0]; direction: 'asc' | 'desc' } | null>(null)
  // const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set()) // Track selected tasks
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const [localUsers, setLocalUsers] = useState([]);

  
  const [viewOpen, setViewOpen] = useState<boolean>(false);


  const { tickets, fetchTickets, shifts, fetchShifts, addTicket, addShift, fetchUser, users, fetchUsers } = useContext(AppContext) as any;

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

      const newTasks = tickets.map((ticket: any) => ({
        taskId: ticket.storyId,
        title: ticket.title,
        priority: ticket.priority,
        status: ticket.status,
        shiftId: ticket.sprintId,
        createdBy: ticket.createdBy,
      }));

      setTasks(newTasks);
    }
    asyncFunc();
  }, [tickets])

  useEffect(() => {
    const asyncFunc = async () => {
      await fetchShifts();
    };
    asyncFunc();
  }, [fetchShifts]);

  useEffect(() => {
    const asyncFunc = async () => {
      if(!shifts || shifts.length === 0) {
        console.error('No shifts available');
        return;
      }

      const newShifts = shifts.map((shift: any) => ({
        shiftId: shift.sprintId,
        name: shift.name,
        startDate: shift.startDate,
        endDate: shift.endDate,
        goal: shift.goal,
      }));
      setShifts(newShifts);
    }
    asyncFunc();
  }, [shifts])

  useEffect(() => {
    const asyncFunc = async () => {
      await fetchUsers();
      console.log(users);
      console.log("users----------------------------------------------------------", users);
    };
    asyncFunc();
  }, [fetchUsers]);

  useEffect(() => {
    const asyncFunc = async () => {
      if (!users || users.length === 0) {
        console.error('No users available');
        return;
      }

      const newUsers = users.map((user: any) => ({
        id: user.userId,
        name: user.username,
        Password : user.password,
      }));
      setLocalUsers(newUsers);
    }
    asyncFunc();
  }, [users])


  const handleFilterChange = (filter: string, isChecked: boolean) => {
    setSelectedFilters((prev) => ({ ...prev, [filter]: isChecked }))
  }

  const handleCreateShift = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      name: { value: string };
      startDate: { value: string };
      endDate: { value: string };
      description: { value: string };
    };
    event.preventDefault();
    const newShift = {
      name: target.name.value,
      startDate: target.startDate.value,
      endDate: target.endDate.value,
      goal: target.description.value,
    };

    addShift(newShift);
    setIsModalOpen(false);
  };


  const statusOrder: { [key: string]: number } = {
    "To Do": 1,
    "Cooking": 2,
    "In Plating": 3,
    "Bon appétit": 4,
  }

  const handleSort = (key: keyof typeof tasksLocal[0]) => {
    setSortConfig((prev) => ({
      key,
      direction: prev?.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Filter tasks based on selected filters
  const filteredTasks = tasksLocal.filter((task) => {
    if (Object.values(selectedFilters).every((v) => !v)) return true
    return selectedFilters[task.status]
  })

  // Further filter tasks based on the search query
  const searchFilteredTasks = filteredTasks.filter((task) => {
    const normalizedQuery = searchQuery.replace(/\s+/g, '').toLowerCase();
    const normalizedTitle = task.title.replace(/\s+/g, '').toLowerCase();
    return normalizedTitle.includes(normalizedQuery);
  });

  // Sort tasks based on sortConfig
  const sortedTasks = [...searchFilteredTasks].sort((a, b) => {
    // console.log("searchFilteredTasks", searchFilteredTasks);
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;

    // Custom comparison for 'status'
    if (key === 'status') {
      const orderA = statusOrder[a.status] || 0;
      const orderB = statusOrder[b.status] || 0;
      return direction === 'asc' ? orderA - orderB : orderB - orderA;
    }

    // Default comparison for other fields
    if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  // Handle selecting or deselecting all tasks
  const handleSelectAll = (isChecked: boolean) => {
    if (isChecked) {
      setSelectedTasks(new Set(sortedTasks.map((task) => task.taskId))) // Select all tasks
    } else {
      setSelectedTasks(new Set()) // Deselect all tasks
    }
  }


  // Handle individual task selection
  const handleTaskSelect = (task: string, isChecked: boolean) => {
    setSelectedTasks((prev) => {
      const updated = new Set(prev)
      if (isChecked) {
        updated.add(task)
      } else {
        updated.delete(task)
      }
      return updated
    })
  }
  const groupedTasks = shiftsLocal.map((shift) => {
    
    console.log("sortedTasks", sortedTasks);
    const tasksForShift = sortedTasks.filter(
      (task) => 
        task.shiftId === shift.shiftId
      

    );


    console.log("tasksForShift", tasksForShift);

    // Count tasks based on their status
    const statusCounts = tasksForShift.reduce(
      (counts, task) => {
        if (task.status === 'To Do') counts.toDo++;
        if (task.status === 'Cooking') counts.cooking++;
        if (task.status === 'In Plating') counts.inPlating++;
        if (task.status === 'Bon appétit') counts.bonAppetit++;
        return counts;
      },
      { toDo: 0, cooking: 0, inPlating: 0, bonAppetit: 0 }
    );

    console.log("shift title", shift.title)
    return {
      shiftName: shift.name,
      velocity: 2,
      tasks: tasksForShift,
      statusCounts, // Add the status counts here
    };
  });



  // Function to get the appropriate class based on status
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'To Do':
        return 'status-bubble status-to-do';
      case 'Cooking':
        return 'status-bubble status-cooking';
      case 'In Plating':
        return 'status-bubble status-in-plating';
      case 'Bon appétit':
        return 'status-bubble status-bon-appetit';
      default:
        return 'status-bubble status-default';
    }
  }

  const handleCreateTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      title: { value: string };
      shift: { value: string };
      priority: { value: string };
      status: { value: string };
    };
    const newTask = {
      storyId: tasksLocal.length + 1,
      title: target.title.value,
      sprintId: parseInt(target.shift.value),
      priority: parseInt(target.priority.value),
      status: target.status.value,
    };
    addTicket(newTask);
    setIsTaskModalOpen(false);
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="search-dropdown-div">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        <div className='dropdown-div'>
          <DropdownMenu onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-[150px] justify-between">
                Filter by
                {isOpen ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {filterList.map((filter) => (
                <DropdownMenuCheckboxItem
                  key={filter}
                  checked={selectedFilters[filter] || false}
                  onCheckedChange={(isChecked) => handleFilterChange(filter, isChecked)}
                >
                  {filter}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
          
        <div className="bg-white-500 text-gray flex items-center justify-between">
          <TicketCreate />
        </div>
      </div>



      {groupedTasks.map((group) => (
        <div key={group.shiftName} className="task-group">
          <div className="flex items-center justify-between gap-4 p-2 border border-gray-300 rounded-md bg-white shadow-sm">
            <div className="flex items-center gap-4">
              <span className="text-s font-bold text-gray-400">{group.shiftName}</span>
              <span className="text-s font-bold text-gray-400">Velocity: {group.velocity}</span>
            </div>
            <div className="flex items-center gap-4 ml-auto">
              <span className="text-xs font-bold text-gray-400">To do:
                <Badge variant="outline" className="status-to-do mr-2">
                  {group.statusCounts.toDo}
                </Badge></span>
              <span className="text-xs font-bold text-gray-400">Cooking:
                <Badge variant="outline" className="status-cooking mr-2">
                  {group.statusCounts.cooking}
                </Badge></span>
              <span className="text-xs font-bold text-gray-400">In plating:
                <Badge variant="outline" className="status-in-plating mr-2">
                  {group.statusCounts.inPlating}
                </Badge></span>
              <span className="text-xs font-bold text-gray-400">Bon appétit:
                <Badge variant="outline" className="status-bon-appetit mr-2">
                  {group.statusCounts.bonAppetit}
                </Badge></span>
            </div>
          </div>
          <Table className="task-table">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="w-[100px] pl-2">
                  {/* <Checkbox
                    checked={sortedTasks.length > 0 && sortedTasks.every((task) => selectedTasks.has(task.taskId))}
                    onCheckedChange={handleSelectAll}
                    className="custom-checkbox"
                    color='grey'
                  /> */}
                Task
                </TableHead>
                <TableHead onClick={() => handleSort('title')} className="cursor-pointer w-[150px]">
                  Title <ArrowUpDown className='inline h-4 w-4' />
                </TableHead>
                <TableHead onClick={() => handleSort('priority')} className="cursor-pointer w-[100px]">
                  Priority <ArrowUpDown className='inline h-4 w-4' />
                </TableHead>
                <TableHead onClick={() => handleSort('status')} className="cursor-pointer w-[200px] text-center">
                  Status <ArrowUpDown className='inline h-4 w-4' />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {group.tasks.map((task) => (
                <TableRow key={task.taskId}>
                  <TableCell className="font-medium truncate max-w-[100px] text-gray-500" >
                    <Checkbox
                      checked={selectedTasks.has(task.taskId)}
                      onCheckedChange={(isChecked) => handleTaskSelect(task.taskId, isChecked as boolean)}
                      className="mr-2 custom-checkbox"
                    />
                    Task {task.taskId}
                  </TableCell>
                  <TableCell className='truncate max-w-[150px] font-bold'>{task.title} </TableCell>
                  <TableCell className='truncate max-w-[100px]'>
                    {task.priority === 1 ? <ForkIcon /> : task.priority === 2 ? <Utensils /> : <UtensilsCrossed />}
                  </TableCell>
                  <TableCell className='status-cell'>
                    <Badge variant="outline" className="bg-green-300 mr-4 w-[100px]">
                      Parent
                    </Badge>
                    <div className={`${getStatusClass(task.status)} status-div`}>
                      {task.status}
                      <ChevronDownCircle />
                    </div>
                    {/* <img className="user-logo" src="src/assets/user_logo.png"></img> */}
                    <UserCard hoverName={users.find((user) => user.userId == task.createdBy).username} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}

      <div>
        {/* Modal for Shift Creation */}
        <Button onClick={() => setIsModalOpen(true)} className="bg-white-500 hover:bg-gray-300 text-gray">
          <PlusCircleIcon size={18} /> Create Shift
        </Button>
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2 className="text-xl font-bold mb-4">Create New Shift</h2>
              <form onSubmit={handleCreateShift} className="space-y-4">
                <div className="form-group">
                  <label htmlFor="title" className="block font-medium mb-1">Shift Name</label>
                  <input
                    id="title"
                    name="title"
                    className="input-field w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter shift name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="startDate" className="block font-medium mb-1">Start Date</label>
                  <input
                    id="startDate"
                    name="startDate"
                    type="date"
                    className="input-field w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="endDate" className="block font-medium mb-1">End Date</label>
                  <input
                    id="endDate"
                    name="endDate"
                    type="date"
                    className="input-field w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description" className="block font-medium mb-1">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    className="input-field w-full p-2 border border-gray-300 rounded-md"
                    // rows="4" 
                    placeholder="Enter shift description"
                    required
                  ></textarea>
                </div>
                <div className="form-actions flex items-center justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
                    Create
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FilterableTaskTable
