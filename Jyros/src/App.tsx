import { createContext, useContext, useState, Dispatch, SetStateAction } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import BacklogPage from './pages/BacklogPage'

// Define the type for the context
interface AppContextType {
  taskList: any[]
  setTaskList: Dispatch<SetStateAction<any[]>>
}

// Create the context with the correct type
export const AppContext = createContext<AppContextType | undefined>(undefined)

import TicketView from './ticketPopup/TicketView'
import TicketCreate from './ticketPopup/TicketCreate'
import Board from './components/Board/Board'
function App() {
  const [taskList, setTaskList] = useState<any[]>([])

  return (
    <AppContext.Provider value={{ taskList, setTaskList }}>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Navigate to={"/board"} />} />
          <Route path={"/board"} element={<Board/>} />
          <Route path={"/backlog"} element={<BacklogPage/>} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App
