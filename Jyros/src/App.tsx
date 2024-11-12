import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './css/App.css'
import TeamMates from './components/TeamMates/TeamMates'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Board from './components/board'
import CVBasicHomePageNuDaPushLaAsta from './components/cvBasicHomePage'
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar'

const App = () => {

  return (
    <>
      <TeamMates></TeamMates>
    <SidebarProvider>
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CVBasicHomePageNuDaPushLaAsta />} />
          <Route path="/board" element={<Board />} />
        </Routes>
      </BrowserRouter>
      </SidebarProvider>
    </>
  )
}

export default App
