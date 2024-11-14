import { AppContext } from "@/App"
import { Input } from "@/components/ui/input"
import  TaskTable  from "@/components/TaskTable/TaskTable"
import SearchBar from "@/components/SearchBar/SearchBar"
import FilterDropDown from "@/components/FilterDropdown/FilterDropdown"
import { useContext, useState } from "react"

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
      <TaskTable/>
    </>
  )
}


export default BacklogPage