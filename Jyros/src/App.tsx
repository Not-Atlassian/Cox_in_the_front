import './css/App.css'
import TeamMates from './components/TeamMates/TeamMates'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BoardPageSkibidi from './components/boardPageSkibidi'
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar'
import Component from './components/taskboard'

const App = () => {

  return (
    <>
<<<<<<< HEAD
      <TeamMates teamId={1}></TeamMates>
    <SidebarProvider>
    
=======
      <TeamMates></TeamMates>
    <SidebarProvider>    
>>>>>>> 49ec6ed156047c8a0892002dc50746f5de01e902
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
