import { AppContext } from "@/App"
import { Input } from "@/components/ui/input"
import  TaskTable  from "@/components/TaskTable/TaskTable"
import SearchBar from "@/components/SearchBar/SearchBar"
import FilterDropDown from "@/components/FilterDropdown/FilterDropdown"
import { useContext, useState } from "react"
import SideBar from "@/components/Shared/SideBar/SideBar"
import { SidebarProvider } from "@/components/ui/sidebar"
import TeamMates from "@/components/TeamMates/TeamMates"
import TicketCreate from "@/ticketPopup/TicketCreate"


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
      <div>
        <SidebarProvider>
          <div>
            <SideBar/>
          </div>
          <div style={{"marginLeft":"5rem"}}>
            <TaskTable/>
          </div>

  

        </SidebarProvider>
        
  
        

      </div>
      
      
      
    </>
  )
}


export default BacklogPage