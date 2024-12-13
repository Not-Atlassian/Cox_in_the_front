'use client'

import { useState } from 'react'
import { ArrowUpDown, ChevronDown, ChevronUp } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Utensils, UtensilsCrossed } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { ChevronDownCircle } from "@mynaui/icons-react";
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

const tasks = [
  { task: 'Task 1', title: 'Title 1', priority: 1, status: 'Done' },
  { task: 'Task 2', title: 'Title 2', priority: 2, status: 'To Do' },
  { task: 'Task 3', title: 'Title 3', priority: 3, status: 'Cooking' },
  { task: 'Task 4', title: 'Title 4', priority: 1, status: 'Done' },
  { task: 'Task 5', title: 'Title 5', priority: 2, status: 'Bon appétit' },
  { task: 'Task 6', title: 'Title 6', priority: 3, status: 'In Plating' },
  { task: 'Task 7', title: 'Title 7', priority: 1, status: 'Done' },
]

const filterList = ['Epic', 'Done', 'In Plating', 'Cooking', 'To Do']

export default function FilterableTaskTable() {
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: boolean }>({})
  const [isOpen, setIsOpen] = useState(false)
  const [sortConfig, setSortConfig] = useState<{ key: keyof typeof tasks[0]; direction: 'asc' | 'desc' } | null>(null)
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set()) // Track selected tasks
  const [searchQuery, setSearchQuery] = useState('') // State for search query

  const handleFilterChange = (filter: string, isChecked: boolean) => {
    setSelectedFilters((prev) => ({ ...prev, [filter]: isChecked }))
  }

  const statusOrder: { [key: string]: number } = {
    "To Do": 1,
    "Cooking": 2,
    "In Plating": 3,
    "Done": 4,
    "Bon appétit": 5,
  }

  const handleSort = (key: keyof typeof tasks[0]) => {
    setSortConfig((prev) => ({
      key,
      direction: prev?.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Filter tasks based on selected filters
  const filteredTasks = tasks.filter((task) => {
    if (Object.values(selectedFilters).every((v) => !v)) return true
    return selectedFilters[task.status]
  })

  // Further filter tasks based on the search query
  const searchFilteredTasks = filteredTasks.filter((task) => {
    const normalizedQuery = searchQuery.replace(/\s+/g, '').toLowerCase();
    const normalizedTitle = task.title.replace(/\s+/g, '').toLowerCase();
    const normalizedTask = task.task.replace(/\s+/g, '').toLowerCase();
    return normalizedTitle.includes(normalizedQuery) || normalizedTask.includes(normalizedQuery);
  });

  // Sort tasks based on sortConfig
  const sortedTasks = [...searchFilteredTasks].sort((a, b) => {
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
      setSelectedTasks(new Set(sortedTasks.map((task) => task.task))) // Select all tasks
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

  // Function to get the appropriate class based on status
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Done':
        return 'status-bubble status-done';
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
        

      </div>
      

      <Table className="task-table">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <Checkbox
                checked={sortedTasks.length > 0 && sortedTasks.every((task) => selectedTasks.has(task.task))}
                onCheckedChange={handleSelectAll}
                className="custom-checkbox"
              />
              Task
            </TableHead>
            <TableHead onClick={() => handleSort('title')} className="cursor-pointer">
              Title <ArrowUpDown className="inline h-4 w-4" />
            </TableHead>
            <TableHead onClick={() => handleSort('priority')} className="cursor-pointer">
              Priority <ArrowUpDown className="inline h-4 w-4" />
            </TableHead>
            <TableHead onClick={() => handleSort('status')} className="cursor-pointer text-right">
              Status <ArrowUpDown className="inline h-4 w-4" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTasks.map((task) => (
            <TableRow key={task.task}>
              <TableCell className="font-medium">
                <Checkbox
                  checked={selectedTasks.has(task.task)}
                  onCheckedChange={(isChecked) => handleTaskSelect(task.task, isChecked as boolean)}
                  className="mr-2 custom-checkbox"
                />
                {task.task}
              </TableCell>
              <TableCell>{task.title}</TableCell>
              <TableCell>
                {task.priority == 1 ? <ForkIcon/> : task.priority == 2 ? <Utensils/> : <UtensilsCrossed/>}
              </TableCell>
              <TableCell className='status-cell'>

              <Badge variant="outline" className="bg-green-300 mr-4 w-200">
                Parent
              </Badge>
              <div className={`${getStatusClass(task.status)} status-div`}>
                  {task.status} 
                  <ChevronDownCircle />
                 
                </div>
                <UserCard hoverName="Thomas"></UserCard>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
