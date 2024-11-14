import { AppContext } from "@/App"
import { Input } from "@/components/ui/input"
import  TaskTable  from "@/components/TaskTable/TaskTable"
import SearchBar from "@/components/SearchBar/SearchBar"
import FilterDropDown from "@/components/FilterDropdown/FilterDropdown"
import { useContext, useState } from "react"
<<<<<<< Updated upstream
=======
import SideBar from "@/components/Shared/SideBar/SideBar"
import { SidebarProvider } from "@/components/ui/sidebar"
>>>>>>> Stashed changes

const BacklogPage = () => {
  // const [taskList, setTaskList] = useContext<any[]>(ppCotext)
  // const [taskList, setTaskList] = useState<any[]>([])
  // const [search, setSearch] = useState<string>("")
  // const [filter, setFilter] = useState<string>("")
  // const [filterList, setFilterList] = useState<any[]>([])

  return (
    <>
      {/* Search and Filter Components */}
      {/* <SearchBar searchQuery={search} setSearchQuery={setSearch} /> */}

      {/* Task Table, passing filtered and searched taskList */}
<<<<<<< Updated upstream
=======
      <SidebarProvider>
        <SideBar/>
      </SidebarProvider>
      
>>>>>>> Stashed changes
      <TaskTable/>
    </>
  )
}


export default BacklogPage