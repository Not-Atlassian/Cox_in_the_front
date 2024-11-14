import './css/App.css'
import TeamMates from './components/TeamMates/TeamMates'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BoardPageSkibidi from './components/boardPageSkibidi'
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar'
import Component from './components/taskboard'

const App = () => {

  return (
    <>
    <SidebarProvider>    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Component />} />
        </Routes>
      </BrowserRouter>
      </SidebarProvider>
    </>
  )
}

export default App
